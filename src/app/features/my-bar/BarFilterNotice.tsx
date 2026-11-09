import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Bottles from '../../components/svg/Bottles';
import { hrefWithParam } from '../../lib/qs';
import { UNFILTERED_PARAM } from './myBarUtils';

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
    <div className="bar-filter-notice">
      {active ? (
        <>
          <Link
            className="bar-filter-chip"
            to="/my-bar"
            title="Showing drinks you can make with your bar"
            aria-label="Filtered by My Bar. Open My Bar to adjust."
          >
            <Bottles />
            My Bar
          </Link>
          <Link
            className="bar-filter-notice__toggle"
            to={hrefWithParam(UNFILTERED_PARAM, '1')}
          >
            Ignore My Bar
          </Link>
        </>
      ) : (
        <>
          <Link
            className="bar-filter-chip"
            to="/my-bar"
            title="My Bar filter is off for this view only"
            aria-label="My Bar filter off for this view. Open My Bar to adjust."
          >
            <Bottles />
            My Bar
          </Link>
          <Link
            className="bar-filter-notice__toggle"
            to={hrefWithParam(UNFILTERED_PARAM, null)}
          >
            Limit to My Bar
          </Link>
        </>
      )}
    </div>
  );
}
