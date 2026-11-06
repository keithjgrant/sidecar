import React from 'react';
import styled from 'styled-components';
import PwaHeader from '../header/PwaHeader';
import FavoriteButton from '../../features/favorites/FavoriteButton';
import Nav from '../header/MobileNav';
import Footer from '../Footer';

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
  return (
    <div className="page-wrapper">
      <div className="page-wrapper__main">
        <PwaHeader controls={<FavoriteButton drinkName={drinkName} />} />
        <ContentWrapper>{children}</ContentWrapper>
        <Footer content={footerContent} />
      </div>
      <Nav />
    </div>
  );
}
