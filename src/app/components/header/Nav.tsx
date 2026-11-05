import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import NavDrink from '../svg/NavDrink';
import NavTag from '../svg/NavTag';
import NavBottles from '../svg/NavBottles';
import NavStar from '../svg/NavStar';
import NavHamburger from '../svg/NavHamburger';

const Navbar = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  gap: 0.25rem;
  margin: 0;
  padding: 0.35rem 0.5rem calc(0.35rem + env(safe-area-inset-bottom, 0px));

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: var(--bg-card--secondary);
  border-top: 1px solid var(--border-color);
`;

const itemStyles = `
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  min-width: 0;
  padding: 0.35rem 0.25rem;
  color: var(--text-subtle);
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

const NavLink = styled(Link)`
  ${itemStyles}

  &:hover,
  &.active {
    color: var(--accent-brand);
  }
`;

const NavItem = styled.span`
  ${itemStyles}
`;

const links = [
  { to: '/drinks', label: 'Drinks', Icon: NavDrink },
  { to: '/tags', label: 'Tags', Icon: NavTag },
  { to: '/my-bar', label: 'My Bar', Icon: NavBottles },
  { to: '/favorites', label: 'Favorites', Icon: NavStar },
] as const;

export default function Nav() {
  return (
    <Navbar aria-label="Primary">
      {links.map(({ to, label, Icon }) => (
        <NavLink key={to} to={to} activeClassName="active" partiallyActive>
          <Icon />
          <span>{label}</span>
        </NavLink>
      ))}
    </Navbar>
  );
}
