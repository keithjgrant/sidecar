import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import LogoSvg from './LogoSvg';

const LogoLink = styled(Link)`
  padding: 0.8rem 0.3rem 0.3rem;
  color: var(--gray-3);
  font-size: 1.6rem;
  font-family: var(--font-heading);
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    color: var(--white);
  }

  & > svg {
    height: 3rem;
    padding: 0.2em;
    vertical-align: -0.25em;
  }

  @media (max-width: 30em) {
    flex-basis: 100vh;
    margin: 0 auto;
    padding-left: 0;
    text-align: center;

    & > svg {
      padding-left: 0;
    }
  }
`;

const Heading = styled.h1`
  margin: 0;
  @media (max-width: 480px) {
    text-align: center;
  }
`;

const Wrapper = styled.div`
  @media (max-width: 480px) {
    text-align: center;
  }
`;

interface LogoProps {
  isHome?: boolean;
}

export default function Logo({ isHome }: LogoProps) {
  const content = (
    <LogoLink to="/">
      <LogoSvg />
      Sidecar
    </LogoLink>
  );
  if (isHome) {
    return <Heading>{content}</Heading>;
  }
  return <Wrapper>{content}</Wrapper>;
}
