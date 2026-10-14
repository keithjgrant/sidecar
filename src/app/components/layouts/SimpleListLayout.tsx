import React from 'react';
import styled from 'styled-components';
import PageAnimationWrapper from '../PageAnimationWrapper';
import Header from '../header/Header';
import PwaHeader from '../header/PwaHeader';
import PageHeading from '../PageHeading';
import Footer from '../Footer';

const Main = styled.main`
  width: calc(100vw - 2em);
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 2rem;
`;

const Heading = styled(PageHeading)`
  @media (display-mode: standalone) {
    display: none;
  }
`;

interface SimpleListLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function SimpleListLayout({ title, children }: SimpleListLayoutProps) {
  return (
    <PageAnimationWrapper>
      <PwaHeader title={title} />
      <Header />
      <Main>
        <Heading>All Tags</Heading>
        {children}
      </Main>
      <Footer />
    </PageAnimationWrapper>
  );
}
