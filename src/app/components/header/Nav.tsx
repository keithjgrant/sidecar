import React from 'react';
import { Link } from 'gatsby';
import styled, { css } from 'styled-components';
import NavDrink from '../svg/NavDrink';
import NavCompass from '../svg/NavCompass';
import NavTag from '../svg/NavTag';
import NavBottles from '../svg/NavBottles';
import NavStar from '../svg/NavStar';
import NavHamburger from '../svg/NavHamburger';
import useCollapsibleNav, { FLIP_MS } from './useCollapsibleNav';

const Navbar = styled.nav<{ $collapsed: boolean }>`
  display: flex;
  justify-content: space-evenly;
  align-items: stretch;
  gap: 0.25rem;
  margin: 0;
  padding: 0.5rem 0.5rem calc(0.5rem + env(safe-area-inset-bottom, 0px));

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: var(--bg-card--secondary);
  border-top: 1px solid var(--border-color);
  transition:
    background-color 0.25s var(--ease-out),
    border-color 0.25s var(--ease-out);

  ${(props) =>
    props.$collapsed &&
    css`
      background-color: transparent;
      border-color: transparent;
      pointer-events: none;
    `}
`;

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
  transition: opacity 0.2s var(--ease-in);

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

const fabStyles = css`
  position: fixed;
  left: max(0.75rem, env(safe-area-inset-left, 0px));
  bottom: max(0.75rem, env(safe-area-inset-bottom, 0px));
  z-index: 11;
  flex: none;
  width: 3rem;
  height: 3rem;
  padding: 0;
  gap: 0;
  border-radius: 50%;
  background-color: var(--bg-card--secondary);
  border: 1px solid var(--border-color);
  box-shadow: var(--box-shadow);
  pointer-events: auto;
  color: var(--text-primary);
  opacity: 0.7;

  svg {
    width: 1.35rem;
    height: 1.35rem;
  }
`;

const NavLink = styled(Link)<{ $collapsed: boolean }>`
  ${itemStyles}
  transition:
    opacity 0.2s var(--ease-out),
    border-radius ${FLIP_MS}ms var(--ease-out),
    background-color 0.2s var(--ease-out);

  &:hover,
  &.active {
    background-color: var(--GRAY-15);
    border-radius: 25px;
  }

  ${(props) =>
    props.$collapsed &&
    css`
      &:not(.active) {
        opacity: 0;
        pointer-events: none;
      }

      &.active {
        ${fabStyles}
        background-color: var(--GRAY-15);
      }
    `}
`;

/* FAB - Floating action button */
const FallbackFab = styled.button<{ $visible: boolean }>`
  ${fabStyles}
  display: grid;
  place-content: center center;
  appearance: none;
  cursor: pointer;
  opacity: ${(props) => (props.$visible ? 0.7 : 0)};
  transform: ${(props) => (props.$visible ? 'scale(1)' : 'scale(0.85)')};
  transition:
    opacity 0.25s var(--ease-out),
    transform 0.25s var(--ease-out);
  pointer-events: ${(props) => (props.$visible ? 'auto' : 'none')};
`;

const links = [
  { to: '/drinks', label: 'Drinks', Icon: NavDrink },
  { to: '/find-a-drink', label: 'Find a Drink', Icon: NavCompass },
  { to: '/tags', label: 'Tags', Icon: NavTag },
  { to: '/my-bar', label: 'My Bar', Icon: NavBottles },
  { to: '/favorites', label: 'Favorites', Icon: NavStar },
] as const;

export default function Nav() {
  const { navRef, collapsed, expand, showFallbackFab } = useCollapsibleNav();

  return (
    <Navbar
      ref={navRef}
      aria-label="Primary"
      className="page-wrapper__nav"
      $collapsed={collapsed}
    >
      {links.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          aria-label={label}
          activeClassName="active"
          partiallyActive
          $collapsed={collapsed}
          onClick={(event) => {
            if (collapsed && event.currentTarget.classList.contains('active')) {
              event.preventDefault();
              expand();
            }
          }}
        >
          <Icon />
        </NavLink>
      ))}
      <FallbackFab
        type="button"
        aria-label="Show navigation"
        aria-hidden={!showFallbackFab}
        tabIndex={showFallbackFab ? 0 : -1}
        $visible={showFallbackFab}
        onClick={expand}
      >
        <NavHamburger />
      </FallbackFab>
    </Navbar>
  );
}
