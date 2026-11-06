import React from 'react';
import styled from 'styled-components';
import DesktopHeader from '../header/DesktopHeader';
import Nav from '../header/Nav';
import PwaHeader from '../header/PwaHeader';
import PageHeading from '../PageHeading';
import Footer from '../Footer';

const Main = styled.main`
  flex: 1;
  width: calc(100vw - 2em);
  margin: 0 auto;
  padding-bottom: 2rem;

  @media (min-width: 30em) {
    max-width: var(--content-max-width);
  }
`;

const Heading = styled(PageHeading)`
  @media (display-mode: standalone) {
    display: none;
  }
`;

interface DrinkListLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function DrinkListLayout({
  title,
  children,
}: DrinkListLayoutProps) {
  return (
    <div className="grow-wrapper">
      <DesktopHeader />
      <PwaHeader title={title} />
      <Main className="stack">{children}</Main>
      <Footer />
      <Nav />
    </div>
  );
}
