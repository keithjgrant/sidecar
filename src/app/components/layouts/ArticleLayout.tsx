import React from 'react';
import styled from 'styled-components';
import DesktopHeader from '../header/DesktopHeader';
import PageTitle from '../header/PageTitle';
import MobileNav from '../header/MobileNav';
import Footer from '../Footer';
import useIsMobile from '../../lib/useIsMobile';

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
