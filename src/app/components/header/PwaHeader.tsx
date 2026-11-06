import React from 'react';
import styled from 'styled-components';
import BackButton from './BackButton';

const HeaderBar = styled.header`
  display: grid;
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
  align-items: baseline;
  background-color: transparent;
  color: var(--brand-primary);
`;

const Title = styled.h1`
  font-size: 1.6rem;
  font-size: var(--font-size-xl);
  font-weight: inherit;
  color: var(--text-primary);
  font-family: var(--font-body);

  @media (width >= 560px) {
    margin-block: var(--space-xxl) var(--space-xl);
    text-align: center;
    /* font-size: 3rem; TODO needs a token */
    font-weight: var(--font-weight);
    font-family: var(--font-display);
  }
`;

const Left = styled.div`
  justify-self: start;

  @media (width >= 560px) {
    opacity: 0;
    pointer-events: none;
  }
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
    </HeaderBar>
  );
}
