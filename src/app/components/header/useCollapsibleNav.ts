import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { globalHistory } from '@gatsbyjs/reach-router';

/* the amount of scroll needed to trigger a collapse */
const COLLAPSE_SCROLL_DELTA = 10;
/* distance from top of page before collapse is triggered */
const COLLAPSE_MIN_Y = 10;
/* expand again once scroll is at or above this offset from the top */
const EXPAND_TOP_Y = 0;
/* after expanding, EXPAND_SUPPRESS_MS delay prevents the header from collapsing immediately */
const EXPAND_SUPPRESS_MS = 200;
const FLIP_MS = 320;
const FLIP_EASING = 'cubic-bezier(0.33, 1, 0.68, 1)';

function getScrollTop(target: Document | HTMLElement) {
  if (target instanceof Document) {
    return window.scrollY;
  }
  return target.scrollTop;
}

/** Window/document scroll or the page-wrapper main pane — ignore nested overflow. */
function isPageScrollRoot(
  target: EventTarget | null
): target is Document | HTMLElement {
  if (target instanceof Document) {
    return true;
  }
  if (!(target instanceof HTMLElement)) {
    return false;
  }
  return (
    target === document.documentElement ||
    target === document.body ||
    target.classList.contains('page-wrapper__main')
  );
}

function getActiveNavLink(nav: HTMLElement | null) {
  return nav?.querySelector<HTMLAnchorElement>('a.active') ?? null;
}

function centerDelta(from: DOMRect, to: DOMRect) {
  return {
    dx: from.left + from.width / 2 - (to.left + to.width / 2),
    dy: from.top + from.height / 2 - (to.top + to.height / 2),
    sx: from.width / Math.max(to.width, 1),
    sy: from.height / Math.max(to.height, 1),
  };
}

export { FLIP_MS };

export default function useCollapsibleNav() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const fabRef = useRef<HTMLButtonElement | null>(null);
  const pendingFlipFrom = useRef<DOMRect | null>(null);
  const lastScrollYByTarget = useRef(new WeakMap<EventTarget, number>());
  const suppressCollapseUntil = useRef(0);

  const collapse = useCallback(() => {
    const active = getActiveNavLink(navRef.current);
    pendingFlipFrom.current = active?.getBoundingClientRect() ?? null;
    setActiveHref(active?.getAttribute('href') ?? null);
    setCollapsed(true);
  }, []);

  const expand = useCallback(async () => {
    suppressCollapseUntil.current = Date.now() + EXPAND_SUPPRESS_MS;

    const fab = fabRef.current;
    const active = getActiveNavLink(navRef.current);
    let animation: Animation | null = null;

    if (fab && active) {
      const first = fab.getBoundingClientRect();
      const last = active.getBoundingClientRect();
      const { dx, dy, sx, sy } = centerDelta(last, first);

      animation = fab.animate(
        [
          { transform: 'none' },
          { transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})` },
        ],
        { duration: FLIP_MS, easing: FLIP_EASING, fill: 'forwards' }
      );

      try {
        await animation.finished;
      } catch {
        // Animation was cancelled (e.g. remount / rapid toggle).
      }
    }

    setCollapsed(false);

    // Drop the filled transform only after the FAB has faded out, so it
    // doesn't snap back to the corner while still visible.
    if (animation) {
      window.setTimeout(() => animation.cancel(), 200);
    }
  }, []);

  useLayoutEffect(() => {
    if (!collapsed) {
      return;
    }

    const fab = fabRef.current;
    const first = pendingFlipFrom.current;
    pendingFlipFrom.current = null;

    if (!fab || !first) {
      return;
    }

    const last = fab.getBoundingClientRect();
    const { dx, dy, sx, sy } = centerDelta(first, last);

    fab.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})` },
        { transform: 'none' },
      ],
      { duration: FLIP_MS, easing: FLIP_EASING }
    );
  }, [collapsed]);

  useEffect(() => {
    return globalHistory.listen(() => {
      setCollapsed(false);
      setActiveHref(null);
      suppressCollapseUntil.current = 0;
      lastScrollYByTarget.current = new WeakMap();
    });
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) {
      return;
    }
    nav.querySelectorAll<HTMLAnchorElement>('a').forEach((anchor) => {
      if (collapsed) {
        anchor.setAttribute('aria-hidden', 'true');
        anchor.setAttribute('tabindex', '-1');
      } else {
        anchor.removeAttribute('aria-hidden');
        anchor.removeAttribute('tabindex');
      }
    });
  }, [collapsed]);

  useEffect(() => {
    const onScroll = (event: Event) => {
      if (!isPageScrollRoot(event.target)) {
        return;
      }

      const y = getScrollTop(event.target);
      const prev = lastScrollYByTarget.current.get(event.target) ?? y;
      lastScrollYByTarget.current.set(event.target, y);

      if (collapsed) {
        if (y <= EXPAND_TOP_Y) {
          void expand();
        }
        return;
      }

      const goingDown = y > prev + COLLAPSE_SCROLL_DELTA;
      if (!goingDown || y < COLLAPSE_MIN_Y) {
        return;
      }
      if (Date.now() < suppressCollapseUntil.current) {
        return;
      }
      collapse();
    };

    document.addEventListener('scroll', onScroll, {
      capture: true,
      passive: true,
    });
    return () => {
      document.removeEventListener('scroll', onScroll, { capture: true });
    };
  }, [collapsed, collapse, expand]);

  return {
    navRef,
    fabRef,
    collapsed,
    expand,
    activeHref,
  };
}
