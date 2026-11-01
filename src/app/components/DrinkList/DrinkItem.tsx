import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import type { Drink } from '../../types';
import type { IGatsbyImageData } from 'gatsby-plugin-image';
import { getTagKind } from '../../config/tagTaxonomy';
import { SPIRIT_PARENTS, LIQUEUR_PARENTS } from '../../config/barConfig';
import glasses from '../svg/glasses';

const PreviewLink = styled(Link)`
  --thumbnail-size: 3em;
  --heading-size: 1rem;
  display: flex;
  align-items: start;
  gap: var(--padding-md);
  height: 100%;
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  color: inherit;
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

const DrinkName = styled.div`
  font-size: var(--font-size-lg);
  font-family: var(--font-display);
  text-box: trim-both cap alphabetic;
`;

const TagPreview = styled.ul`
  list-style: none;
  padding-inline-start: unset;
  display: flex;
  flex-wrap: wrap;
  gap: var(--padding-sm);
  color: var(--text-accent);
  font-size: var(--font-size-sm);

  & > li {
    border-radius: var(--border-radius-sm);
    padding: 0 var(--space-xxs);
    text-box: trim-both cap alphabetic;
  }
`;
export interface DrinkItemProps {
  drink: Drink;
  image?: { gatsbyImageData: IGatsbyImageData };
}

const LIST_TAG_KINDS = ['spirit', 'liqueur', 'amaro', 'vermouth', 'citrus'];
export default function DrinkItem({ drink, image }: DrinkItemProps) {
  // console.log(drink);
  const tags = (drink.tags ?? []).filter((tag) => {
    if (!LIST_TAG_KINDS.includes(getTagKind(tag))) {
      return false;
    }

    if (Object.keys(SPIRIT_PARENTS).includes(tag)) {
      return false;
    }
    if (Object.keys(LIQUEUR_PARENTS).includes(tag)) {
      return false;
    }

    return true;
  });
  const GlassSvg =
    glasses[drink.glass as keyof typeof glasses] || glasses.rocks;

  return (
    <li>
      <PreviewLink key={drink.basename} to={drink.path} className="container">
        <GlassSvg />
        <div className="stack">
          <DrinkName>{drink.title}</DrinkName>
          <TagPreview>
            {tags.map((tag) => (
              <li key={tag}>{tag.replaceAll('-', ' ')}</li>
            ))}
          </TagPreview>
        </div>
      </PreviewLink>
    </li>
  );
}
