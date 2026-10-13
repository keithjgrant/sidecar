import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const Drawer = styled.div<{ $transition: boolean }>`
  margin-top: 0.4em;
  overflow: hidden;
  transition: ${(props) =>
    props.$transition ? 'height 0.3s var(--ease-out-cubic)' : 'none'};
`;

interface ToggleArgs {
  toggle: (e: React.MouseEvent) => void;
  isExpanded: boolean;
}

interface CollapsibleSectionProps {
  startExpanded?: boolean;
  renderToggle?: (args: ToggleArgs) => React.ReactNode;
  children: React.ReactNode;
}

export default function CollapsibleSection({
  startExpanded,
  renderToggle = () => {},
  children,
}: CollapsibleSectionProps) {
  const [isExpanded, setIsExpanded] = useState(!!startExpanded);
  const [height, setHeight] = useState<number | 'auto'>(
    startExpanded ? 'auto' : 0
  );
  const [transition, setTransition] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  // After expand, animate 0 → measured px. transitionend then switches to auto.
  useEffect(() => {
    if (!isExpanded || height === 'auto') {
      return;
    }
    const node = ref.current;
    if (!node) {
      return;
    }
    const frame = window.requestAnimationFrame(() => {
      setHeight(node.scrollHeight);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [isExpanded]);

  const toggle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const node = ref.current;
      if (!node) {
        return;
      }

      if (isExpanded) {
        // Freeze current rendered height (works mid-animation too), then collapse.
        setTransition(false);
        setHeight(node.getBoundingClientRect().height);
        setIsExpanded(false);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTransition(true);
            setHeight(0);
          });
        });
        return;
      }

      setTransition(true);
      setIsExpanded(true);
    },
    [isExpanded]
  );

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName !== 'height' || e.target !== ref.current) {
      return;
    }
    if (isExpanded) {
      setHeight('auto');
    }
  };

  return (
    <div>
      {renderToggle({ toggle, isExpanded })}
      <Drawer
        ref={ref}
        $transition={transition}
        style={{ height: height === 'auto' ? 'auto' : `${height}px` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {children}
      </Drawer>
    </div>
  );
}
