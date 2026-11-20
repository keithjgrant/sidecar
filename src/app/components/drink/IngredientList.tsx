import React from 'react';
import InlineMarkdown from '../InlineMarkdown';

interface IngredientListProps {
  items?: string[];
  garnish?: string;
  suppressLinks?: boolean;
}

export default function IngredientList({
  items = [],
  garnish,
  suppressLinks = false,
}: IngredientListProps) {
  if (!items) {
    return null;
  }
  return (
    <ul className="ingredient-list">
      {items.map((ingredient, i) => (
        <li key={i} className="p-ingredient">
          <InlineMarkdown suppressLinks={suppressLinks}>
            {ingredient}
          </InlineMarkdown>
        </li>
      ))}
      {garnish && (
        <li className="ingredient-list__garnish p-ingredient">
          <strong>garnish:</strong>{' '}
          <InlineMarkdown suppressLinks={suppressLinks}>
            {garnish}
          </InlineMarkdown>
        </li>
      )}
    </ul>
  );
}
