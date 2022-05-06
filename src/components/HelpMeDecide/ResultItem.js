import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import ResultImage from './ResultImage';
import { default as IngredientList_ } from '../drink/IngredientList';

const IngredientList = styled(IngredientList_)`
  border-bottom: 0;
`;

const CardLink = styled(Link)`
  --thumbnail-size: 2em;
  --heading-size: 2rem;
  height: 100%;
  display: flex;
  border: 1px solid var(--card-border);
  border-radius: var(--border-radius);
  background-color: var(--card-bg);
  background-image: linear-gradient(
    to right,
    hsl(315, 3.2%, 23%),
    var(--gray-2)
  );
  line-height: 1.2;
  text-decoration: none;
  font-weight: var(--font-weight-normal);
  color: inherit;

  &:hover {
    color: inherit;
    border-color: var(--gray-4);
    background-image: linear-gradient(
      to right,
      hsl(315, 3.2%, 25%),
      var(--gray-2)
    );
  }
`;

const Title = styled.p`
  position: relative;
  margin-top: 0;
  color: var(--white);
  font-size: 1.2rem;
  line-height; 1.1;
  font-family: var(--font-heading);

  &:after {
    position: absolute;
    bottom: -0.3em;
    left: 0;
    content: '';
    width: 100%;
    height: 1px;
    background-color: var(--gray-4);
  }

  @media (min-width: 640px) {
    font-size: 1.6rem;
  }
`;

const ImageWrapper = styled.div`
  flex: 0 0 150px;
  text-align: center;
  align-self: flex-start;
`;

const Body = styled.div`
  flex: 2 0 0;
  padding: 1rem 1rem 1rem 0;

  @media (min-width: 640px) {
    padding: 1.6rem 1rem 1rem 0;
  }
`;

export default function ResultItem({ drink, image }) {
  return (
    <li>
      <CardLink to={drink.path}>
        <ImageWrapper>
          <ResultImage drink={drink} imageData={image} />
        </ImageWrapper>
        <Body>
          <Title>{drink.title}</Title>
          <IngredientList items={drink.ingredients} garnish={drink.garnish} />
        </Body>
      </CardLink>
    </li>
  );
}
