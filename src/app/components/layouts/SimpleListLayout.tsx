import React from 'react';
import styled from 'styled-components';
import DesktopHeader from '../header/DesktopHeader';
import MobileNav from '../header/MobileNav';
import PageTitle from '../header/PageTitle';
import PageHeading from '../PageHeading';
import Footer from '../Footer';
import useIsMobile from '../../lib/useIsMobile';

interface SimpleListLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function SimpleListLayout({
  title,
  children,
}: SimpleListLayoutProps) {
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
