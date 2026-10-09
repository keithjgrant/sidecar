import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Drawer = styled.div`
  margin-top: 0.4em;
  transition: height 0.3s var(--ease-out-cubic);
  overflow: hidden;
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
  const [height, setHeight] = useState<number | 'auto'>(isExpanded ? 'auto' : 0);
  const ref = useRef<HTMLDivElement>(null);
  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (!isExpanded) {
      setHeight(0);
      return;
    }
    const node = ref.current;
    if (!node) {
      return;
    }
    // Measure after layout so multi-column / nested content gets a real height.
    const frame = window.requestAnimationFrame(() => {
      setHeight(node.scrollHeight);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [isExpanded]);

  return (
    <div>
      {renderToggle({ toggle, isExpanded })}
      <Drawer
        ref={ref}
        style={{ height: height === 'auto' ? 'auto' : `${height}px` }}
      >
        {children}
      </Drawer>
    </div>
  );
}

