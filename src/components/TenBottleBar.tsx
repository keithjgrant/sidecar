import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from './Card';
import {
  GridForm,
  GridFormLabel,
  Checkbox,
  SplitLabel,
  ButtonGroup,
  Select,
} from './forms';
import DrinkList from './DrinkList';
import { getParams, setParam } from '../util/qs';
import type { Drink } from '../types';

const CheckboxRow = styled(Checkbox)`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;

  @media (min-width: 500px) {
    grid-column: 2;
  }
`;

const SelectStart = styled(Select)`
  justify-self: start;
`;

const excludeTags = [
  'absinthe',
  'aged-rum',
  'apple-brandy',
  'benedictine',
  'campari',
  'drambuie',
  'elderflower-liqueur',
  'genever-gin',
  'green-chartreuse',
  'maraschino-liqueur',
  'mezcal',
  'vodka',
];

interface TenBottleBarProps {
  allDrinks: Drink[];
  imageMap: Record<string, unknown>;
}

export default function TenBottleBar({ allDrinks, imageMap }: TenBottleBarProps) {
  const params = getParams();

  const [vermouth, setVermouth] = useState('sweet');
  const [tenthBottle, setTenthBottle] = useState('none');
  const [addSyrups, setAddSyrups] = useState(false);

  useEffect(() => {
    if (params.vermouth && params.vermouth !== 'sweet') {
      setVermouth(String(params.vermouth));
    }
    if (params.bottle && params.bottle !== 'none') {
      setTenthBottle(String(params.bottle));
    }
    if (params.syrups === '1') {
      setAddSyrups(true);
    }
  }, []);

  const excluded = excludeTags.filter((b) => b != tenthBottle);
  const drinks = allDrinks.filter((drink) => {
    if (drink.tags.includes('ten-bottle-bar')) {
      if (vermouth === 'sweet' || !drink.tags.includes('sweet-vermouth'))
        return true;
    }
    if (!addSyrups && includesFancySyrups(drink)) {
      return false;
    }
    if (!vermouthMatches(vermouth, drink)) {
      return false;
    }
    return tenthBottleMatches(excluded, drink);
  });

  return (
    <>
      <Card>
        <GridForm>
          <GridFormLabel>Type of vermouth</GridFormLabel>
          <ButtonGroup
            name="vermouth"
            value={vermouth}
            options={['sweet', 'blanc', 'dry']}
            onChange={(value) => {
              setVermouth(value);
              setParam('vermouth', value);
            }}
          />
          <GridFormLabel>Tenth bottle</GridFormLabel>
          <SelectStart
            id="tenth-bottle"
            options={[
              ['none', 'None'],
              ['absinthe', 'Absinthe'],
              ['aged-rum', 'Aged Rum'],
              ['apple-brandy', 'Apple Brandy'],
              ['benedictine', 'Bénédictine'],
              ['campari', 'Campari'],
              // ['drambuie', 'Drambuie'],
              ['elderflower-liqueur', 'Elderflower Liqueur'],
              ['genever-gin', 'Genever Gin'],
              ['green-chartreuse', 'Green Chartreuse'],
              ['maraschino-liqueur', 'Maraschino Liqueur'],
              ['mezcal', 'Mezcal'],
              ['vodka', 'Vodka'],
            ]}
            value={tenthBottle}
            onChange={(value) => {
              setTenthBottle(value);
              setParam('bottle', value);
            }}
          />
          <CheckboxRow
            id="include-syrups"
            checked={addSyrups}
            onChange={(value: boolean) => {
              setAddSyrups(value);
              setParam('syrups', value ? '1' : '0');
            }}
            label={
              <SplitLabel heading="Specialty syrups">
                Include drinks that use homemade specialty or infused syrups
              </SplitLabel>
            }
          />
        </GridForm>

      </Card>
      <DrinkList drinks={drinks} imageMap={imageMap} />
    </>
  );
}

const fancySyrups = [
  'ginger',
  'honey',
  'black-pepper-syrup',
  'ipa-syrup',
  'burnt-sugar-syrup',
  'jalapeno-syrup',
  'muscovado-syrup',
  'special-syrup',
  'orgeat',
];
// non-fancy: simple syrup, demarara, agave

function includesFancySyrups(drink: Drink): boolean {
  for (let i = 0; i < fancySyrups.length; i++) {
    if (drink.tags.includes(fancySyrups[i])) {
      return true;
    }
  }
  return false;
}

function vermouthMatches(type: string, drink: Drink): boolean {
  const tag = drink.tags.find((t) => t.endsWith('-vermouth'));
  return !tag || tag === `${type}-vermouth`;
}

function tenthBottleMatches(exclude: string[], drink: Drink): boolean {
  for (let i = 0; i < exclude.length; i++) {
    if (drink.tags.includes(exclude[i])) {
      return false;
    }
  }
  return true;
}
