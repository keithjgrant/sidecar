import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import DrinkTile, { type DrinkTileProps } from './DrinkTile';
import type { Drink } from '../../types';

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const HeadingRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75em;
`;

const Heading = styled.div`
  font-family: var(--font-heading);
  color: var(--gray-8);
`;

const MoreLink = styled(Link)`
  font-size: 0.85rem;
  color: var(--gray-6);
  text-decoration: underline;
  text-underline-offset: 0.15em;
  white-space: nowrap;

  &:hover {
    color: var(--white);
  }
`;

const Row = styled.div`
  display: grid;
  ${'' /* margin: 0 1rem; */}
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: calc(33vw - 2rem);
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

interface TileRowProps {
  drinks: Drink[];
  heading: string;
  imageMap: Record<string, unknown>;
  className?: string;
  moreTo?: string;
  moreLabel?: string;
}

export default function TileRow({
  drinks,
  heading,
  imageMap,
  className,
  moreTo,
  moreLabel = 'See all',
}: TileRowProps) {
  return (
    <Section className={className}>
      <HeadingRow>
        <Heading>{heading}</Heading>
        {moreTo ? <MoreLink to={moreTo}>{moreLabel}</MoreLink> : null}
      </HeadingRow>
      <Row>
        {drinks.map((drink) => {
          const slug = drink.path.replace(/^\/drinks\//, '');
          return (
            <DrinkTile
              key={drink.path}
              drink={drink}
              image={imageMap[slug] as DrinkTileProps['image']}
            />
          );
        })}
      </Row>
    </Section>
  );
}
