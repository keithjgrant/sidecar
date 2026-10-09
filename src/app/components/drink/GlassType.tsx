import React from 'react';
import { Indicator, Caption } from './Indicator';
import glasses from '../svg/glasses';

import type { Drink } from '../../types';

interface GlassTypeProps {
  drink: Drink;
}

export default function GlassType({ drink }: GlassTypeProps) {
  const GlassSvg = glasses[drink.glass as keyof typeof glasses];
  if (!GlassSvg) {
    return null;
  }
  return (
    <Indicator>
      <GlassSvg />
      <Caption>{drink.glass}</Caption>
    </Indicator>
  );
}
