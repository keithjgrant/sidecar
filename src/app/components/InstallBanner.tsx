import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import useIsPwa from '../lib/useIsPwa';

const Banner = styled.p`
  margin: 0 0 1rem;
  padding: 0.3em 0.5em;
  border: 1px solid var(--brand-primary);
  background: var(--gray-dark);
  color: var(--white);
  font-size: 0.8rem;
  text-align: center;

  @media (display-mode: standalone) {
    display: none;
  }

  a {
    color: var(--brand-primary);
  }
`;

export default function InstallBanner() {
  const isInstalled = useIsPwa();

  if (isInstalled) {
    return null;
  }

  return (
    <Banner>
      <Link to="/installation">Install</Link> Sidecar for more durable storage.
    </Banner>
  );
}
