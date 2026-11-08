import React from 'react';
import styled from 'styled-components';
import DesktopHeader from '../header/DesktopHeader';
import PageTitle from '../header/PageTitle';
import MobileNav from '../header/MobileNav';
import Footer from '../Footer';
import useIsMobile from '../../lib/useIsMobile';

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
  const isMobile = useIsMobile();

  return (
    <div className="grow-wrapper grow-wrapper--article">
      {isMobile ? null : <DesktopHeader />}
      <PageTitle title={title} />
      <main>{children}</main>
      <Footer />
      {isMobile ? <MobileNav /> : null}
    </div>
  );
}
