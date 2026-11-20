import { Link } from 'gatsby';
import React from 'react';
import LogoSvg from './LogoSvg';

export default function DesktopHeader() {
  const links = [
    { to: '/drinks', label: 'Drinks' },
    { to: '/find-a-drink', label: 'Find a Drink' },
    { to: '/tags', label: 'Tags' },
    { to: '/favorites', label: 'Favorites' },
    { to: '/my-bar', label: 'My Bar' },
  ] as const;

  return (
    <nav className="desktop-header">
      <div className="desktop-header__grid">
        <div className="header-logo">
          <Link to="/">
            <LogoSvg />
            Sidecar
          </Link>
        </div>
        <ul className="desktop-nav">
          {links.map((item) => (
            <li key={item.to}>
              <Link to={item.to}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
