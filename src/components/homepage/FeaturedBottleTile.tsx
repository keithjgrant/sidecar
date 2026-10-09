import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, type IGatsbyImageData } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { getFeaturedBottle } from '../../data/featuredBottles';

const Tile = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 800px;
  margin: 0 1rem;
  padding: 0.75rem 1rem;
  border: 1px solid var(--brand-primary);
  border-radius: var(--border-radius);
  text-decoration: none;
  color: var(--gray-8);

  &:hover {
    color: var(--white);
  }

  @media (min-width: 810px) {
    margin: 0 auto;
  }
`;

const Text = styled.div`
  flex: 1;
  min-width: 0;
`;

const Eyebrow = styled.div`
  font-size: 0.85rem;
  color: var(--gray-6);
  margin-bottom: 0.25em;
`;

const Label = styled.div`
  font-family: var(--font-heading);
  font-size: 1.15rem;
  line-height: 1.3;
  overflow-wrap: anywhere;
`;

const ImageWrap = styled.div`
  flex: 0 0 4.5rem;
  width: 4.5rem;

  .gatsby-image-wrapper {
    border-radius: var(--border-radius);
  }
`;

interface FeaturedBottleTileProps {
  imageMap: Record<string, { gatsbyImageData: IGatsbyImageData } | undefined>;
}

export default function FeaturedBottleTile({
  imageMap,
}: FeaturedBottleTileProps) {
  const featured = getFeaturedBottle();
  if (!featured) {
    return null;
  }

  const { monthName, bottle } = featured;
  const image = bottle.image ? imageMap[bottle.image] : undefined;

  return (
    <Tile to={`/tags/${bottle.tag}`}>
      <Text>
        <Eyebrow>Featured bottle for {monthName}</Eyebrow>
        <Label>{bottle.label}</Label>
      </Text>
      {image?.gatsbyImageData ? (
        <ImageWrap>
          <GatsbyImage
            image={image.gatsbyImageData}
            alt={bottle.label}
            objectFit="contain"
          />
        </ImageWrap>
      ) : null}
    </Tile>
  );
}
