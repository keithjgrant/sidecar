import React from 'react';
import Markdown from 'react-markdown';
import CocktailImage from './CocktailImage';
import DrinkTags from './DrinkTags';
import ScaleIndicator from './ScaleIndicator';
import PrepMethod from './PrepMethod';
import GlassType from './GlassType';
import IngredientList from './IngredientList';
import DrinkSubstitutions from './DrinkSubstitutions';
import FavoriteButton from '../../features/favorites/FavoriteButton';
import styled from 'styled-components';
import type { Drink } from '../../types';

const TitleRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem;
`;

const Title = styled.h1`
  position: relative;
  flex: 1;
  min-width: 0;
  margin-block-end: 0.8em;
  font-weight: normal;
  font-size: 1.8rem;
  line-height: 1.2;

  &::after {
    position: absolute;
    bottom: -0.3em;
    left: 0;
    content: '';
    width: calc(100% - 2em);
    height: 1.5px;
    background-color: var(--accent-orange);
  }

  @media (min-width: 35em) {
    font-size: 2.6rem;
  }
`;

const BrowserFavorite = styled.div`
  flex-shrink: 0;
  margin: -0.35rem -0.5rem 0 0;

  @media (display-mode: standalone) {
    /* hides because installed PWA shows favorite button in PwaHeader */
    display: none;
  }

  button {
    padding: 0.35rem 0.5rem;
  }
`;

const Intro = styled.div`
  border-bottom: 1px solid var(--gray-4);
  color: var(--text-secondary);
  font-style: italic;
`;

const PublishDate = styled.div`
  margin-top: 1em;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  text-align: right;
`;

interface DrinkCardProps {
  drink: Drink;
  imageData?: {
    childImageSharp: {
      gatsbyImageData: import('gatsby-plugin-image').IGatsbyImageData;
    };
  };
}

export default function DrinkCard({ drink, imageData }: DrinkCardProps) {
  const drinkName = drink.path.replace('/drinks/', '');

  return (
    <div className="drink-card h-recipe">
      <div className="drink-card__body stack">
        {/* <CocktailImage drink={drink} imageData={imageData} /> */}
        <TitleRow>
          <Title className="p-name">{drink.title}</Title>
          <BrowserFavorite>
            <FavoriteButton drinkName={drinkName} />
          </BrowserFavorite>
        </TitleRow>
        <DrinkTags tags={drink.tags} />
        {drink.intro ? (
          <Intro className="p-summary prose">
            <Markdown>{drink.intro}</Markdown>
          </Intro>
        ) : null}
        <hr />
        <IngredientList
          items={drink.ingredients}
          garnish={drink.garnish}
          isBeneathIntro={!!drink.intro}
        />
        <hr />
        <DrinkSubstitutions drink={drink} />
        <div
          className="prose e-instructions"
          dangerouslySetInnerHTML={{ __html: drink.content ?? '' }}
        ></div>
        {drink.date ? (
          <PublishDate>
            <time className="dt-published">Published {drink.date}</time>
          </PublishDate>
        ) : null}
      </div>
      <div className="card-tabs">
        <div>
          <ScaleIndicator value={drink.sweetness} label="Sweetness" />
        </div>
        <div>
          <ScaleIndicator value={drink.booziness} label="Booziness" />
        </div>
        <div>
          <GlassType drink={drink} />
        </div>
        <div>
          <PrepMethod tags={drink.tags} />
        </div>
      </div>
    </div>
  );
}
