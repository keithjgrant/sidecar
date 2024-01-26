import React from 'react';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';
import glasses from '../svg/glasses';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  max-width: var(--tile-size);
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  border: 1px solid var(--gray-3);
  background-color: var(--card-bg);
  overflow: hidden;

  &:hover {
    border-color: var(--gray-4);
    & svg {
      color: var(--white);
    }
  }

  img,
  svg {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
  }
  img {
    color: var(--gray-6);
  }
  svg {
    height: 4.5em;
    padding: 1.25em 0.5em;
    color: var(--orange-8);
    filter: drop-shadow(2px 4px 6px black);
  }
`;

export default function TileImage({ drink, image }) {
  const GlassSvg = glasses[drink.glass] || glasses.rocks;

  return (
    <Wrapper>
      {drink.image && image ? (
        <GatsbyImage
          image={image.gatsbyImageData}
          alt={drink.image.alt}
          style={{ width: '100%' }}
          imgStyle={{ objectPosition: drink.image.align }}
        />
      ) : (
        <div className="svg-wrapper">
          <GlassSvg />
        </div>
      )}
    </Wrapper>
  );
}
