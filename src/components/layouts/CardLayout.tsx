import React from 'react';
import styled from 'styled-components';
import PageAnimationWrapper from '../PageAnimationWrapper';
import GrowWrapper from './GrowWrapper';
import PwaHeader from '../header/PwaHeader';
import FavoriteButton from '../FavoriteButton';
import Header from '../header/Header';
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
  footerContent?: string;
  children: React.ReactNode;
}

export default function CardLayout({ drinkName, footerContent, children }: CardLayoutProps) {
  return (
    <PageAnimationWrapper>
      <GrowWrapper>
        <PwaHeader controls={<FavoriteButton drinkName={drinkName} />} />
        <Header />
        <ContentWrapper>{children}</ContentWrapper>
        <Footer content={footerContent} />
      </GrowWrapper>
    </PageAnimationWrapper>
  );
}
