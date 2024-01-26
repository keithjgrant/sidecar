import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import glasses from '../svg/glasses';

const Image = styled(GatsbyImage)`
  object-fit: cover;

  @media (min-width: 480px) {
    margin-top: 0.5rem;
    margin-left: 0.5rem;
  }

  @media (min-width: 640px) {
    min-height: 15em;
  }
`;

const SvgWrapper = styled.div`
  margin: 0 auto;
  padding-top: 1.3em;

  & svg {
    height: auto;
    max-height: initial;
    max-height: 80px;
    color: var(--orange-8);
    opacity: 0.3;
  }

  @media (min-width: 480px) {
    padding-top: 2.1em;

    & svg {
      max-height: 80px;
    }
  }
`;

export default function ResultImage({ drink, imageData }) {
  let { image, glass } = drink;
  // TODO: share lookup function with ../CocktailThumbnail and CocktailImage?
  const GlassSvg = glasses[glass] || glasses.rocks;

  return (
    <div>
      {image && imageData ? (
        <Image
          image={imageData.childImageSharp.gatsbyImageData}
          alt={image.alt}
          style={{ height: '80px', width: '80px', overflow: 'hidden' }}
          imgStyle={{
            objectPosition: image.align,
            maxHeight: '100px',
            borderRadius: 'var(--border-radius)',
          }}
        />
      ) : (
        <SvgWrapper>
          <GlassSvg />
        </SvgWrapper>
      )}
    </div>
  );
}
