import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import CocktailThumbnail from './CocktailThumbnail';

const PreviewLink = styled(Link)`
  --thumbnail-size: 3em;
  --heading-size: 1rem;
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  border: 1px solid var(--card-border);
  background: var(--card-bg);
  text-decoration: none;

  &:hover {
    color: var(--white);
  }

  &:focus {
    z-index: 1;
  }

  img,
  .svg-wrapper {
    display: block;
    width: var(--thumbnail-size);
    height: var(--thumbnail-size);
    object-fit: cover;

    svg {
      height: 100%;
      padding: 1em;
    }
  }

  @media (min-width: 30em) {
    --thumbnail-size: 6em;
    --heading-size: 1.2rem;
  }
`;

const PreviewContent = styled.div`
  padding: 1em;
  font-size: var(--heading-size);
  font-family: var(--font-heading);
`;

const PublishDate = styled.time`
  position: absolute;
  right: 0.2em;
  bottom: 0.2em;
  font-size: 0.8rem;
  color: var(--gray-5);
`;

import type { Drink } from '../../types';
import type { IGatsbyImageData } from 'gatsby-plugin-image';

export interface DrinkItemProps {
  drink: Drink;
  image?: { gatsbyImageData: IGatsbyImageData };
}

export default function DrinkItem({ drink, image }: DrinkItemProps) {
  return (
    <li>
      <PreviewLink key={drink.basename} to={drink.path}>
        <CocktailThumbnail drink={drink} image={image} />
        <PreviewContent>{drink.title}</PreviewContent>
        <PublishDate>{drink.date}</PublishDate>
      </PreviewLink>
    </li>
  );
}
