import React from 'react';
import styled from 'styled-components';
import GrowWrapper from './GrowWrapper';
import Header from '../header/Header';
import PwaHeader from '../header/PwaHeader';
import PageHeading from '../../components/PageHeading';
import Footer from '../Footer';

const Main = styled.main`
  flex: 1;
  width: calc(100vw - 2em);
  margin: 0 auto;
  padding-bottom: 2rem;

  @media (min-width: 30em) {
    max-width: 70em;
  }
`;

const Heading = styled(PageHeading)`
  @media (display-mode: standalone) {
    display: none;
  }
`;

export default function DrinkListLayout({ title, children }) {
  return (
    <GrowWrapper>
      <PwaHeader title={title} />
      <Header />
      <Main>
        <Heading>{title}</Heading>
        {children}
      </Main>
      <Footer />
    </GrowWrapper>
  );
}
