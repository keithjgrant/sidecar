import React from 'react';
import DesktopHeader from '../header/DesktopHeader';
import PageTitle from '../header/PageTitle';
import MobileNav from '../header/MobileNav';
import Footer from '../Footer';
import useIsMobile from '../../lib/useIsMobile';

interface DrinkListLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function DrinkListLayout({
  title,
  children,
}: DrinkListLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="grow-wrapper">
      {isMobile ? null : <DesktopHeader />}
      <PageTitle title={title} />
      <main className="stack">{children}</main>
      <Footer />
      {isMobile ? <MobileNav /> : null}
    </div>
  );
}
