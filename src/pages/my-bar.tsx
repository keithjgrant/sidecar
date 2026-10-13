import React from 'react';
import DrinkListLayout from '../app/components/layouts/DrinkListLayout';
import Meta from '../app/components/Meta';
import MyBar from '../app/features/my-bar/MyBar';

export default function MyBarPage() {
  return (
    <DrinkListLayout title="In My Bar">
      <MyBar />
    </DrinkListLayout>
  );
}

export const Head = () => <Meta title="Sidecar: In My Bar" />;
