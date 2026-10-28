import React from 'react';
import InlineMarkdown from '../InlineMarkdown';
import styled from 'styled-components';

const Ingredients = styled.ul`
  margin-top: 0.3em;
  padding: 0.5em 0.5em 0.5em 1.5em;
  border-bottom: 1px solid var(--gray-4);
  list-style-type: none;
`;

const Ingredient = styled.li`
  position: relative;

  &::before {
    position: absolute;
    top: 0.15em;
    left: -0.9em;
    content: '• ';
    color: var(--brand-primary);
    line-height: 1;
  }
`;

const Garnish = styled(Ingredient)`
  margin-top: 0.5em;

  &::before {
    display: none;
  }
`;

const Label = styled.span`
  margin-right: 0.4em;
  color: var(--brand-primary);
  font-size: 0.64em;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.02em;
`;

interface IngredientListProps {
  items?: string[];
  garnish?: string;
  isBeneathIntro?: boolean;
  className?: string;
  suppressLinks?: boolean;
}

export default function IngredientList({
  items = [],
  garnish,
  isBeneathIntro,
  className,
  suppressLinks = false,
}: IngredientListProps) {
  if (!items) {
    return null;
  }
  return (
    <Ingredients className={className}>
      {items.map((ingredient, i) => (
        <Ingredient key={i} className="p-ingredient">
          <InlineMarkdown suppressLinks={suppressLinks}>
            {ingredient}
          </InlineMarkdown>
        </Ingredient>
      ))}
      {garnish && (
        <Garnish className="p-ingredient">
          <Label>garnish:</Label>{' '}
          <InlineMarkdown suppressLinks={suppressLinks}>
            {garnish}
          </InlineMarkdown>
        </Garnish>
      )}
    </Ingredients>
  );
}
