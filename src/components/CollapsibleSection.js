import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';

const Drawer = styled.div`
  margin-top: 0.4em;
  transition: height 0.3s var(--ease-out-cubic);
  overflow: hidden;
`;

export default function CollapsibleSection({
  startExpanded,
  renderToggle,
  children,
}) {
  const [isExpanded, setIsExpanded] = useState(startExpanded);
  const [height, setHeight] = useState(isExpanded ? 'auto' : 0);
  const ref = useRef(null);
  const toggle = (e) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (isExpanded) {
      setHeight(ref.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  return (
    <div>
      {renderToggle({ toggle, isExpanded })}
      <Drawer
        ref={ref}
        css={css`
          height: ${height === 'auto' ? 'auto' : `${height}px`};
        `}
      >
        {children}
      </Drawer>
    </div>
  );
}

CollapsibleSection.defaultProps = {
  renderToggle: () => {},
};
