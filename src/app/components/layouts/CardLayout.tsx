import React from 'react';
import styled from 'styled-components';
import PageTitle from '../header/PageTitle';
import MobileNav from '../header/MobileNav';
import Footer from '../Footer';
import useIsMobile from '../../lib/useIsMobile';
import DesktopHeader from '../header/DesktopHeader';

interface CardLayoutProps {
  drinkName: string;
  footerContent?: React.ReactNode;
  children: React.ReactNode;
}

export default function CardLayout({
  drinkName,
  footerContent,
  children,
}: CardLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="grow-wrapper grow-wrapper--drink-card">
      {isMobile ? null : <DesktopHeader />}
      <PageTitle />
      <main>{children}</main>
      <Footer content={footerContent} />
      {isMobile ? <MobileNav /> : null}
    </div>
  );
}
