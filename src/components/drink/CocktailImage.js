import React from 'react';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';
import glasses from '../svg/glasses';

const Wrapper = styled.div`
  grid-column: 1;
`;

const Image = styled(GatsbyImage)`
  width: 100%;
  max-height: 25vh;
  border-top-right-radius: var(--border-radius);
  border-top-left-radius: var(--border-radius);
  object-fit: cover;
  box-shadow: 0.1em 0.1em 0.3em rgba(0, 0, 0, 0.1);

  @media (min-width: 480px) {
    max-height: initial;
    width: calc(100% + 5rem);
    margin-top: -3rem;
    margin-left: -5rem;
    border-radius: var(--border-radius);
  }

  @media (min-width: 640px) {
    min-height: 15em;
  }
`;

const SvgWrapper = styled.div`
  padding-top: 1em;

  & svg {
    height: auto;
    max-height: initial;
    max-height: 30vh;
    color: var(--orange-8);
    opacity: 0.3;

    @media (max-width: 480px) {
        display: none;
      }
    }
  }
`;

export default function CocktailImage({ drink, imageData }) {
  let { image, glass } = drink;
  // TODO: share lookup function with ../CocktailThumbnail and ResultImage?
  const GlassSvg = glasses[glass] || glasses.rocks;

  return (
    <Wrapper>
      {image && imageData ? (
        <Image
          image={imageData.childImageSharp.gatsbyImageData}
          alt={image.alt}
          style={{ minWidth: '100%' }}
          imgStyle={{ objectPosition: image.align }}
        />
      ) : (
        <SvgWrapper>
          <GlassSvg />
        </SvgWrapper>
      )}
    </Wrapper>
  );
}
