import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import useIsPwa from '../lib/useIsPwa';

const DISMISS_KEY = 'sidecar.installBannerDismissed';

const Banner = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin: 0 0 1rem;
  padding: 0.35em 0.5em;
  border: 1px solid var(--brand-primary);
  background: var(--gray-dark);
  color: var(--white);
  font-size: 0.8rem;

  @media (display-mode: standalone) {
    display: none;
  }

  @media (hover: hover) and (pointer: fine) {
    display: none;
  }

  a {
    color: var(--brand-primary);
  }
`;

const Message = styled.p`
  flex: 1;
  margin: 0;
`;

const Dismiss = styled.button`
  flex-shrink: 0;
  margin: 0;
  padding: 0.15em 0.4em;
  border: 0;
  background: transparent;
  color: var(--gray-7);
  font-size: 1.1em;
  line-height: 1;
  cursor: pointer;

  &:hover {
    color: var(--white);
  }
`;

export default function InstallBanner() {
  const isInstalled = useIsPwa();
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      setDismissed(localStorage.getItem(DISMISS_KEY) === '1');
    } catch {
      setDismissed(false);
    }
  }, []);

  if (isInstalled || dismissed) {
    return null;
  }

  return (
    <Banner>
      <Message>
        Browser may clear settings.{' '}
        <Link to="/installation">Install Sidecar</Link>
      </Message>
      <Dismiss
        type="button"
        aria-label="Dismiss install reminder"
        onClick={() => {
          try {
            localStorage.setItem(DISMISS_KEY, '1');
          } catch {
            // Ignore quota / private-mode failures; still hide for this session.
          }
          setDismissed(true);
        }}
      >
        ×
      </Dismiss>
    </Banner>
  );
}
