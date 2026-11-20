import React, { useRef } from 'react';
import { Link } from 'gatsby';
import { useLocation } from '@gatsbyjs/reach-router';
import styled, { css } from 'styled-components';
import NavDrink from '../svg/NavDrink';
import NavCompass from '../svg/NavCompass';
import NavTag from '../svg/NavTag';
import NavBottles from '../svg/NavBottles';
import NavStar from '../svg/NavStar';
import NavHamburger from '../svg/NavHamburger';
import useCollapsibleNav from './useCollapsibleNav';

/* FAB - Floating action button */
const FabButton = styled.button<{ $visible: boolean }>``;

const links = [
  { to: '/drinks', label: 'Drinks', Icon: NavDrink },
  { to: '/find-a-drink', label: 'Find a Drink', Icon: NavCompass },
  { to: '/tags', label: 'Tags', Icon: NavTag },
  { to: '/favorites', label: 'Favorites', Icon: NavStar },
  { to: '/my-bar', label: 'My Bar', Icon: NavBottles },
] as const;

function isActivePath(pathname: string, to: string) {
  return pathname === to || pathname.startsWith(`${to}/`);
}

export default function MobileNav() {
  const { pathname } = useLocation();
  const activeLinkRef = useRef<HTMLElement | null>(null);
  const { fabRef, collapsed, expand } = useCollapsibleNav(activeLinkRef);

  const activeLink = links.find(({ to }) => isActivePath(pathname, to));
  const FabIcon = activeLink?.Icon ?? NavHamburger;

  return (
    <nav
      aria-label="Primary"
      className="mobile-navbar"
      data-collapsed={collapsed ? 'true' : null}
    >
      {links.map(({ to, label, Icon }) => {
        const isActive = to === activeLink?.to;
        return (
          <Link
            key={to}
            // Gatsby Link forwards to <a>; types still treat Link as a class instance.
            ref={
              isActive
                ? (((node: HTMLAnchorElement | null) => {
                    activeLinkRef.current = node;
                  }) as never)
                : undefined
            }
            to={to}
            aria-label={label}
            aria-hidden={collapsed || undefined}
            tabIndex={collapsed ? -1 : undefined}
            activeClassName="active"
            partiallyActive
          >
            <Icon />
          </Link>
        );
      })}
      <button
        className={`fab-button ${collapsed ? 'is-visible' : ''}`}
        ref={fabRef}
        type="button"
        aria-label="Show navigation"
        aria-hidden={!collapsed}
        tabIndex={collapsed ? 0 : -1}
        onClick={() => {
          void expand();
        }}
      >
        <FabIcon />
      </button>
    </nav>
  );
}
