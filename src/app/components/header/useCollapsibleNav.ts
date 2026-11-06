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
const FLIP_MS = 500; //320;
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

export { FLIP_MS };

export default function useCollapsibleNav() {
  const [collapsed, setCollapsed] = useState(false);
  const [hasActiveLink, setHasActiveLink] = useState(true);
  const navRef = useRef<HTMLElement | null>(null);
  const pendingFlip = useRef<DOMRect | null>(null);
  const lastScrollYByTarget = useRef(new WeakMap<EventTarget, number>());
  const suppressCollapseUntil = useRef(0);

  const runFlip = useCallback((nextCollapsed: boolean) => {
    const active = getActiveNavLink(navRef.current);
    if (active) {
      pendingFlip.current = active.getBoundingClientRect();
    }
    setHasActiveLink(Boolean(active));
    setCollapsed(nextCollapsed);
  }, []);

  const expand = useCallback(() => {
    suppressCollapseUntil.current = Date.now() + EXPAND_SUPPRESS_MS;
    runFlip(false);
  }, [runFlip]);

  useLayoutEffect(() => {
    const active = getActiveNavLink(navRef.current);
    const first = pendingFlip.current;
    if (!active || !first) {
      return;
    }
    pendingFlip.current = null;

    const last = active.getBoundingClientRect();
    const dx = first.left - last.left;
    const dy = first.top - last.top;
    const sx = first.width / Math.max(last.width, 1);
    const sy = first.height / Math.max(last.height, 1);

    active.animate(
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
      setHasActiveLink(true);
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
      const isActive = anchor.classList.contains('active');
      if (collapsed && !isActive) {
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
          expand();
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
      runFlip(true);
    };

    document.addEventListener('scroll', onScroll, {
      capture: true,
      passive: true,
    });
    return () => {
      document.removeEventListener('scroll', onScroll, { capture: true });
    };
  }, [collapsed, expand, runFlip]);

  return {
    navRef,
    collapsed,
    expand,
    showFallbackFab: collapsed && !hasActiveLink,
  };
}
