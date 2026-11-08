import React from 'react';
import styled from 'styled-components';
import Nav from '../header/MobileNav';
import PageTitle from '../header/PageTitle';
import Footer from '../Footer';

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

interface IndexLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function IndexLayout({ title, children }: IndexLayoutProps) {
  return (
    <div className="grow-wrapper">
      <PageTitle title={title} />
      <main>
        <IndexGrid>{children}</IndexGrid>
      </main>
      <Footer />
      <Nav />
    </div>
  );
}
