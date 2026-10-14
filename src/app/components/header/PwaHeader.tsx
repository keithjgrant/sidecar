import React from 'react';
import styled from 'styled-components';
import BackButton from './BackButton';

const HeaderBar = styled.header`
  display: none;
  position: sticky;
  top: 0;
  background-image: linear-gradient(
    to bottom,
    var(--gray-dark) 65%,
    hsla(315, 3.2%, 24.7%, 0) 100%
  );
  z-index: 1;
  padding-bottom: 1rem;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  background-color: transparent;
  color: var(--brand-primary);

  @media (display-mode: standalone) {
    display: grid;
  }
`;

const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: inherit;
  color: var(--gray-8);
  font-family: var(--font-body);
`;

const Left = styled.div`
  justify-self: start;
`;

const Right = styled.div`
  justify-self: end;
  grid-column: 3;
`;

interface PwaHeaderProps {
  title?: string;
  controls?: React.ReactNode;
}

export default function PwaHeader({ title, controls }: PwaHeaderProps) {
  return (
    <HeaderBar>
      <Left>
        <BackButton />
      </Left>
      {title ? <Title>{title}</Title> : null}
      <Right>{controls}</Right>
    </HeaderBar>
  );
}
