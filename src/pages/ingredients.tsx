import React from 'react';
import IndexLayout from '../app/components/layouts/IndexLayout';
import Meta from '../app/components/Meta';
import IngredientsList from '../app/components/IngredientsList';

export default function IngredientsPage() {
  return (
    <IndexLayout title="Ingredients: Spirits, Syrups, & Mixers">
      <IngredientsList />
    </IndexLayout>
  );
}

export const Head = () => (
  <Meta title="Ingredients: Spirits, Syrups, & Mixers" />
);
