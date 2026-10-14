import React from 'react';
import styled from 'styled-components';
import PageAnimationWrapper from '../PageAnimationWrapper';
import GrowWrapper from './GrowWrapper';
import Header from '../header/Header';
import PwaHeader from '../header/PwaHeader';
import Footer from '../Footer';

const Main = styled.main`
  flex: 1;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1em 2rem;

  @media (min-width: 500px) {
    width: max-content;
    min-width: 500px;
  }
`;

const Article = styled.article`
  max-width: 40em;
  margin: 1em auto;
  padding: 2em 1em;
  border: 1px solid var(--gray-4);
  border-radius: var(--border-radius);
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.1);
  background-color: var(--gray-dark);

  h1,
  h2,
  h3 {
    color: inherit;
    scroll-margin-top: 2.5em;
  }

  h1 {
    margin: 1.72rem 0;
  }

  h2 {
    margin: 2.32rem 0 0.85rem;
  }

  > h1:first-child {
    margin-top: 0;
  }

  p,
  ul {
    margin: 1.5em 0;
  }
`;

const Heading = styled.h1`
  @media (display-mode: standalone) {
    display: none;
  }
`;

export interface ArticleLayoutProps {
  title?: string;
  children: React.ReactNode;
}

export default function ArticleLayout({ title, children }: ArticleLayoutProps) {
  return (
    <PageAnimationWrapper>
      <GrowWrapper>
        <PwaHeader title={title} />
        <Header />
        <Main>
          <Article>
            <Heading>{title}</Heading>
            {children}
          </Article>
        </Main>
        <Footer />
      </GrowWrapper>
    </PageAnimationWrapper>
  );
}
