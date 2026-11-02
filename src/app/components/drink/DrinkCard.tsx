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
        <div className="drink-card__header">
          <h1 className="p-name">{drink.title}</h1>
          <div className="drink-card__icon">
            <FavoriteButton drinkName={drinkName} />
          </div>
        </div>
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
