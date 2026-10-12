import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const Notice = styled.p`
  margin: 0 0 0.75rem;
  font-size: 0.85rem;
  color: var(--gray-6, #8a8588);

  a {
    color: inherit;
    text-decoration: underline;
  }
`;

interface BarFilterNoticeProps {
  active: boolean;
}

export default function BarFilterNotice({ active }: BarFilterNoticeProps) {
  if (!active) {
    return null;
  }

  return (
    <Notice>
      Showing drinks you can make with <Link to="/my-bar">your bar</Link>.
    </Notice>
  );
}
