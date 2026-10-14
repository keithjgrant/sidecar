import React from 'react';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';
import glasses from '../svg/glasses';

const ThumbnailWrapper = styled.div`
  height: var(--thumbnail-size);
  width: var(--thumbnail-size);
  overflow: hidden;

  svg {
    height: 7em;
    padding: 3em 0.5em 1em;
    filter: drop-shadow(2px 4px 6px black);
  }
`;

import type { Drink } from '../../types';
import type { IGatsbyImageData } from 'gatsby-plugin-image';

interface CocktailThumbnailProps {
  drink: Drink;
  image?: { gatsbyImageData: IGatsbyImageData };
}

export default function CocktailThumbnail({ drink, image }: CocktailThumbnailProps) {
  const GlassSvg = glasses[drink.glass as keyof typeof glasses] || glasses.rocks;

  return (
    <ThumbnailWrapper>
      {drink.image && image ? (
        <GatsbyImage
          image={image.gatsbyImageData}
          alt={drink.image.alt ?? ''}
          style={{ height: '100%', maxWidth: 'var(--thumbnail-size)' }}
          imgStyle={{ objectPosition: drink.image.align }}
        />
      ) : (
        <div className="svg-wrapper">
          <GlassSvg />
        </div>
      )}
    </ThumbnailWrapper>
  );
}
