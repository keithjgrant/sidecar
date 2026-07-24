import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import TileImage from './TileImage';

const TileLink = styled(Link)`
  grid-row: 1;
  display: grid;
  position: relative;
  overflow: hidden;

  &:hover {
    color: var(--white);
    border-color: var(--white);
  }

  &:nth-child(1):nth-last-child(1) {
    .drink-tile__image {
      padding-bottom: 31.4%;
    }
  }

  &:nth-child(1):nth-last-child(2),
  &:nth-child(2):nth-last-child(1) {
    .drink-tile__image {
      padding-bottom: 64.7%;
    }
  }
`;

const Title = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  grid-column: 1;
  grid-row: 1;
  align-self: end;
  margin-top: -1.5em;
  padding: 0 0.5em;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 1em;
  font-size: 0.8rem;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: var(--gray-7);
`;

import type { Drink } from '../../types';
import type { IGatsbyImageData } from 'gatsby-plugin-image';

export interface DrinkTileProps {
  drink: Drink;
  image?: { gatsbyImageData: IGatsbyImageData };
}

export default function DrinkTile({ drink, image }: DrinkTileProps) {
  return (
    <TileLink to={drink.path}>
      <TileImage drink={drink} image={image} />
      <Title>{drink.title}</Title>
    </TileLink>
  );
}
