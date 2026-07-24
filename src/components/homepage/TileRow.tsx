import React from 'react';
import styled from 'styled-components';
import DrinkTile, { type DrinkTileProps } from './DrinkTile';

const Row = styled.div`
  display: grid;
  ${'' /* margin: 0 1rem; */}
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: calc(25vw - 1.5rem);
  grid-gap: var(--gap-size);

  @media (min-width: 700px) {
    --tile-size: 10em;
    grid-template-rows: var(--tile-size);
  }
  ${'' /*
  @media (min-width: 810px) {
    margin: 0 auto;
  } */}
`;

const Heading = styled.div`
  grid-row: 1;
  align-self: end;
  font-family: var(--font-heading);
  color: var(--gray-8);
  text-align: right;
`;

import type { Drink } from '../../types';

interface TileRowProps {
  drinks: Drink[];
  heading: string;
  imageMap: Record<string, unknown>;
  className?: string;
}

export default function TileRow({ drinks, heading, imageMap, className }: TileRowProps) {
  return (
    <Row className={className}>
      <Heading>{heading}</Heading>
      {drinks.map((drink) => {
        const slug = drink.path.replace(/^\/drinks\//, '');
        return (
          <DrinkTile key={drink.path} drink={drink} image={imageMap[slug] as DrinkTileProps['image']} />
        );
      })}
    </Row>
  );
}
