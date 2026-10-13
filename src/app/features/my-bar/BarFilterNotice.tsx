import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Filter from '../../components/svg/Filter';

const Chip = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.35em;
  margin: 0 0 0.75rem;
  padding: 0.2em 0.55em 0.2em 0.4em;
  border: 1px solid var(--gray-4);
  border-radius: var(--border-radius);
  background: var(--gray-dark);
  color: var(--gray-7);
  font-size: 0.8rem;
  line-height: 1.2;
  text-decoration: none;

  &:hover {
    color: var(--white);
    border-color: var(--gray-6);
  }

  svg {
    width: 0.95em;
    height: 0.95em;
    flex-shrink: 0;
  }
`;

interface BarFilterNoticeProps {
  /** When false, nothing is rendered. */
  active: boolean;
}

/**
 * Compact status chip shown when a list is narrowed by the user’s bar.
 * Presence means filtering is on; tap opens My Bar.
 */
export default function BarFilterNotice({ active }: BarFilterNoticeProps) {
  if (!active) {
    return null;
  }

  return (
    <Chip
      to="/my-bar"
      title="Showing drinks you can make with your bar"
      aria-label="Filtered by My Bar. Open My Bar to adjust."
    >
      <Filter />
      My Bar
    </Chip>
  );
}
