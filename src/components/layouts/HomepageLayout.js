import React from 'react';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';
import LogoSvg from '../header/LogoSvg';

const nbsp = '\u00A0';

const Banner = styled(GatsbyImage)`
  width: 100%;
  height: 50vh;
  object-fit: cover;
`;

const Header = styled.header`
  position: absolute;
  top: 10vh;
  width: 50%;
  text-align: center;
  color: var(--white);
  z-index: 1;

  & > h1 {
    min-width: max-content;
    margin-bottom: 0.8rem;
    color: var(--brand-primary);
  }

  & > div {
    margin-left: 1rem;
  }
`;

const Parallax = styled.div`
  perspective: 1px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
`;

const Back = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateZ(-1px) scale(2);
  overflow: hidden;
`;

const Front = styled.main`
  margin-top: 50vh;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateZ(0);
  z-index: 1;
`;

export default function HomepageLayout({ heroImage, children }) {
  let iOS = false;
  if (typeof navigator !== 'undefined') {
    iOS =
      /iPad|iPhone|iPod/.test(navigator.platform) ||
      (['iPhone', 'iPad', 'MacIntel'].includes(navigator.platform) &&
        navigator.maxTouchPoints > 1);
  }

  return (
    <Parallax style={iOS ? { perspective: 'initial' } : null}>
      <Back style={iOS ? { transform: 'initial' } : null}>
        <Header>
          <h1>
            <LogoSvg /> Sidecar
          </h1>
          <div css="">
            A curated collection of{nbsp}cocktails
            <br />
            for the home bartender
          </div>
        </Header>
        <Banner image={heroImage.childImageSharp.gatsbyImageData} />
      </Back>
      <Front>{children}</Front>
    </Parallax>
  );
}
