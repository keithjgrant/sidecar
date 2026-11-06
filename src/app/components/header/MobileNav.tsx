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

const itemStyles = `
  display: flex;
  flex: 0 1 50px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  min-width: 0;
  padding: 0.8rem 0.5rem;
  color: var(--text-primary);
  font-size: 0.65rem;
  font-weight: bold;
  line-height: 1.1;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;

  svg {
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;
  }

  @media (min-width: 40em) {
    flex-direction: row;
    gap: 0.4rem;
    font-size: 0.8rem;

    svg {
      width: 1.15rem;
      height: 1.15rem;
    }
  }
`;

const NavLink = styled(Link)<{ $collapsed: boolean }>`
  ${itemStyles}
  transition: opacity 0.2s var(--ease-out);

  &:hover,
  &.active {
    background-color: var(--GRAY-15);
    border-radius: 25px;
  }

  ${(props) =>
    props.$collapsed &&
    css`
      opacity: 0;
      pointer-events: none;
    `}
`;

/* FAB - Floating action button */
const FabButton = styled.button<{ $visible: boolean }>`
  position: fixed;
  left: max(0.75rem, env(safe-area-inset-left, 0px));
  bottom: max(0.75rem, env(safe-area-inset-bottom, 0px));
  z-index: 11;
  display: grid;
  place-content: center;
  width: 3rem;
  height: 3rem;
  padding: 0;
  border-radius: 50%;
  background-color: var(--GRAY-15);
  border: 1px solid var(--border-color);
  box-shadow: var(--box-shadow);
  color: var(--text-primary);
  appearance: none;
  cursor: pointer;
  opacity: ${(props) => (props.$visible ? 0.7 : 0)};
  pointer-events: ${(props) => (props.$visible ? 'auto' : 'none')};
  transition: opacity 0.2s var(--ease-out);

  svg {
    width: 1.35rem;
    height: 1.35rem;
  }
`;

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

// TODO rename MobileNav
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
          <NavLink
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
            $collapsed={collapsed}
          >
            <Icon />
          </NavLink>
        );
      })}
      <FabButton
        ref={fabRef}
        type="button"
        aria-label="Show navigation"
        aria-hidden={!collapsed}
        tabIndex={collapsed ? 0 : -1}
        $visible={collapsed}
        onClick={() => {
          void expand();
        }}
      >
        <FabIcon />
      </FabButton>
    </nav>
  );
}
