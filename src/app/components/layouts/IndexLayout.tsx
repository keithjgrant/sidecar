import React from 'react';
import styled from 'styled-components';
import DesktopHeader from '../header/DesktopHeader';
import MobileNav from '../header/MobileNav';
import PageTitle from '../header/PageTitle';
import Footer from '../Footer';
import useIsMobile from '../../lib/useIsMobile';

interface IndexLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function IndexLayout({ title, children }: IndexLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="grow-wrapper">
      {isMobile ? null : <DesktopHeader />}
      <PageTitle title={title} />
      <main>{children}</main>
      <Footer />
      {isMobile ? <MobileNav /> : null}
    </div>
  );
}
