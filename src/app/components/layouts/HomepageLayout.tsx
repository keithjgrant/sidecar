import React from 'react';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';
import LogoSvg from '../header/LogoSvg';

const nbsp = '\u00A0';

interface HomepageLayoutProps {
  heroImage: {
    childImageSharp: {
      gatsbyImageData: import('gatsby-plugin-image').IGatsbyImageData;
    };
  };
  children: React.ReactNode;
}

export default function HomepageLayout({
  heroImage,
  children,
}: HomepageLayoutProps) {
  return (
    <div className="hero-parallax">
      <div className="hero-parallax__back">
        <header className="hero-header">
          <h1>
            <LogoSvg /> Sidecar
          </h1>
          <div>
            A curated collection of{nbsp}cocktails
            <br />
            for the home bartender
          </div>
        </header>
        <GatsbyImage
          className="hero-image"
          image={heroImage.childImageSharp.gatsbyImageData}
          alt=""
          loading="eager"
          objectFit="cover"
        />
      </div>
      <main className="hero-parallax__front">{children}</main>
    </div>
  );
}
