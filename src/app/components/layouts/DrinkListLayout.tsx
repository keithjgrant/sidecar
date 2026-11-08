import React from 'react';
import styled from 'styled-components';
import DesktopHeader from '../header/DesktopHeader';
import PageTitle from '../header/PageTitle';
import MobileNav from '../header/MobileNav';
import Footer from '../Footer';
import useIsMobile from '../../lib/useIsMobile';

const Main = styled.main`
  flex: 1;
  width: calc(100vw - 2em);
  margin: 0 auto;
  padding-bottom: 2rem;

  @media (min-width: 30em) {
    max-width: var(--content-max-width);
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
  const isMobile = useIsMobile();

  return (
    <div className="grow-wrapper">
      {isMobile ? null : <DesktopHeader />}
      <PageTitle title={title} />
      <Main className="stack">{children}</Main>
      <Footer />
      {isMobile ? <MobileNav /> : null}
    </div>
  );
}
