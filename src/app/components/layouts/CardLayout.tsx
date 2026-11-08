import React from 'react';
import styled from 'styled-components';
import PageTitle from '../header/PageTitle';
import FavoriteButton from '../../features/favorites/FavoriteButton';
import Nav from '../header/MobileNav';
import Footer from '../Footer';
import useIsMobile from '../../lib/useIsMobile';
import DesktopHeader from '../header/DesktopHeader';

const ContentWrapper = styled.div`
  flex: 1;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  padding-bottom: 0.5em;
  align-items: center;
  justify-content: center;
`;

interface CardLayoutProps {
  drinkName: string;
  footerContent?: React.ReactNode;
  children: React.ReactNode;
}

export default function CardLayout({
  drinkName,
  footerContent,
  children,
}: CardLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="grow-wrapper">
      {isMobile ? null : <DesktopHeader />}
      <PageTitle />
      <main>
        <ContentWrapper>{children}</ContentWrapper>
      </main>
      <Footer content={footerContent} />
      <Nav />
    </div>
  );
}
