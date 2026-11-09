import React from 'react';
import styled from 'styled-components';
import BackButton from './BackButton';

interface PageTitleProps {
  title?: string;
}

export default function PageTitle({ title }: PageTitleProps) {
  return (
    <header className="page-title">
      <div className="page-title__back">
        <BackButton />
      </div>
      {title ? <h1>{title}</h1> : null}
    </header>
  );
}
