import React from 'react';
import Markdown from 'react-markdown';
import CocktailImage from './CocktailImage';
import DrinkTags from './DrinkTags';
import ScaleIndicator from './ScaleIndicator';
import PrepMethod from './PrepMethod';
import GlassType from './GlassType';
import IngredientList from './IngredientList';
import styled from 'styled-components';

const Main = styled.main`
  padding-top: 2rem;
  margin: 0;
  line-height: 1.2;

  @media (min-width: 25em) {
    margin: 0 1em 1em;
  }

  @media (min-width: 30em) {
    margin: 3rem 1rem;
  }

  @media (min-width: 40em) {
    display: flex;
  }

  @media (display-mode: standalone) {
    padding-top: 0;
  }
`;

const Body = styled.div`
  max-width: 40em;
  border: 1px solid var(--card-border);
  border-radius: var(--border-radius);
  color: var(--white);
  background-color: var(--card-bg);
  background-image: linear-gradient(
    to right,
    hsl(315, 3.2%, 23%),
    var(--gray-2)
  );

  @media (min-width: 30em) {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 1fr 1.62fr;
    padding: 1em 1em 1em 2em;
  }

  @media (min-width: 40em) {
    grid-gap: 2rem;
    padding: 1em 2em;
  }
`;

const Tabs = styled.div`
  display: flex;

  > * {
    margin-left: 0.2em;
    border: 1px solid var(--gray-4);
    border-top-width: 0;
    border-radius: 0 0 var(--border-radius) var(--border-radius);
    padding: 0.5em;
    background-color: var(--gray-2);
  }

  > :empty {
    display: none;
  }

  @media (min-width: 40em) {
    flex-direction: column;
    margin: 1em 0;

    > * {
      margin-left: 0;
      margin-top: 0.2em;
      border-top-width: 1px;
      border-left: 0;
      border-radius: 0 var(--border-radius) var(--border-radius) 0;
    }
  }
`;

const Content = styled.div`
  display: flex;
  grid-column: 2;
  flex-direction: column;
  margin-top: 1.2rem;
  padding: 0 1em 1em;

  .e-instructions {
    flex-grow: 1;
  }

  @media (min-width: 30em) {
    margin-top: 0;
    padding: 0;
  }
`;

const Title = styled.h1`
  position: relative;
  margin-top: 0;
  color: var(--white);
  font-weight: normal;
  font-size: 1.8rem;
  line-height: 1.1;

  &::after {
    position: absolute;
    bottom: -0.5em;
    left: 0;
    content: '';
    width: 3em;
    height: 4px;
    background-color: var(--brand-primary);
  }

  @media (min-width: 35em) {
    font-size: 2.6rem;
  }
`;

const Intro = styled.div`
  padding-bottom: 1em;
  border-bottom: 1px solid var(--gray-4);
  color: var(--gray-7);
`;

const PublishDate = styled.div`
  margin-top: 2rem;
  color: var(--gray-6);
  font-size: 0.8rem;
  text-align: right;
`;

export default function DrinkCard({ drink, imageData }) {
  return (
    <Main className="h-recipe">
      <Body>
        <CocktailImage drink={drink} imageData={imageData} />
        <Content>
          <Title className="p-name">{drink.title}</Title>
          <DrinkTags tags={drink.tags} />
          {drink.intro ? (
            <Intro className="p-summary">
              <Markdown>{drink.intro}</Markdown>
            </Intro>
          ) : null}
          <IngredientList
            items={drink.ingredients}
            garnish={drink.garnish}
            isBeneathIntro={!!drink.intro}
          />
          <div className="e-instructions">
            <div dangerouslySetInnerHTML={{ __html: drink.content }} />
          </div>
          {drink.date ? (
            <PublishDate>
              <time className="dt-published">Published {drink.date}</time>
            </PublishDate>
          ) : null}
        </Content>
      </Body>
      <Tabs>
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
      </Tabs>
    </Main>
  );
}
