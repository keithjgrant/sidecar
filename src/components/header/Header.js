import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import Nav from './Nav';

const HeaderBar = styled.header`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: baseline;
  background-color: var(--brand-primary);

  @media (max-width: 30em) {
    grid-template-columns: auto;
    flex-wrap: wrap;
    overflow: auto;
  }

  @media (min-width: 35em) {
    grid-template-columns: 1fr auto 1fr;
  }

  @media (display-mode: standalone) {
    display: none;
  }
`;

export default function Header({ isHome }) {
  return (
    <HeaderBar>
      <Logo isHome={isHome} />
      <Nav />
    </HeaderBar>
  );
}
