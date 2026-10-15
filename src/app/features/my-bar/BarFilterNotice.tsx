import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Bottles from '../../components/svg/Bottles';
import { hrefWithParam } from '../../lib/qs';
import { UNFILTERED_PARAM } from './myBarUtils';

const Row = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.65em 0.85em;
  margin: 0 0 0.75rem;
`;

export const Chip = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.35em;
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

const SeeLink = styled(Link)`
  color: var(--gray-6, #8a8588);
  font-size: 0.8rem;
  text-decoration: underline;
  text-underline-offset: 0.15em;

  &:hover {
    color: var(--white);
  }
`;

interface BarFilterNoticeProps {
  /** When true, the list is narrowed by My Bar. */
  active: boolean;
  /**
   * When true, My Bar filtering is suppressed for this view only via
   * `?unfiltered=1` (settings unchanged).
   */
  isUnfilteredView?: boolean;
}

/**
 * Compact status chip shown when a list is narrowed by the user’s bar.
 * Presence means filtering is on; tap opens My Bar. A text link toggles a
 * one-off unfiltered view via query param without changing settings.
 */
export default function BarFilterNotice({
  active,
  isUnfilteredView = false,
}: BarFilterNoticeProps) {
  if (!active && !isUnfilteredView) {
    return null;
  }

  return (
    <Row>
      {active ? (
        <>
          <Chip
            to="/my-bar"
            title="Showing drinks you can make with your bar"
            aria-label="Filtered by My Bar. Open My Bar to adjust."
          >
            <Bottles />
            My Bar
          </Chip>
          <SeeLink to={hrefWithParam(UNFILTERED_PARAM, '1')}>
            Ignore My Bar
          </SeeLink>
        </>
      ) : (
        <>
          <Chip
            to="/my-bar"
            title="My Bar filter is off for this view only"
            aria-label="My Bar filter off for this view. Open My Bar to adjust."
          >
            <Bottles />
            My Bar
          </Chip>
          <SeeLink to={hrefWithParam(UNFILTERED_PARAM, null)}>
            Limit to My Bar
          </SeeLink>
        </>
      )}
    </Row>
  );
}
