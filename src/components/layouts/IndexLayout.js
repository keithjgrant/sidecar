import React from 'react';
import styled from 'styled-components';
import GrowWrapper from './GrowWrapper';
import Header from '../header/Header';
import Footer from '../Footer';

const Main = styled.main`
  flex: 1;
`;

const IndexGrid = styled.div`
  display: grid;
  grid-template-columns: 1rem auto 1rem;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1em 2rem;

  & > * {
    grid-column: 2;
  }

  & > ul {
    grid-column: 1 / -1;
  }

  @media (min-width: 800px) {
    max-width: 800px;
  }
`;

export default function IndexLayout({ children }) {
  return (
    <GrowWrapper>
      <Header />
      <Main>
        <IndexGrid>{children}</IndexGrid>
      </Main>
      <Footer />
    </GrowWrapper>
  );
}
