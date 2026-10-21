import React, { useMemo } from 'react';
import styled from 'styled-components';
import type { Drink } from '../../types';
/* TODO css only : relocate somewhere */
import { Chip } from '../../features/my-bar/BarFilterNotice';
import {
  getDrinkSubstitutions,
  type ActiveSubstitution,
} from '../../features/my-bar/myBarUtils';
import { formatBarLabel } from '../../lib/formatBarLabel';
import { useBar } from '../../storage/bar';
import { useSettings } from '../../storage/settings';
import Bottles from '../svg/Bottles';

const Wrap = styled.div`
  padding-block-end: 1em;
  border-bottom: 1px solid var(--gray-4);
  color: var(--gray-7);
  font-size: 0.9rem;
  line-height: 1.35;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5em 0.65em;
  margin-bottom: 0.35em;
`;

const List = styled.ul`
  margin: 0;
  padding: 0 0 0 1.25em;
  list-style: disc;
`;

const Item = styled.li`
  &::marker {
    color: var(--brand-primary);
  }
`;

/** Join labels as "A", "A or B", or "A, B, or C". */
export function formatOrList(items: string[]): string {
  if (items.length === 0) {
    return '';
  }
  if (items.length === 1) {
    return items[0];
  }
  if (items.length === 2) {
    return `${items[0]} or ${items[1]}`;
  }
  return `${items.slice(0, -1).join(', ')}, or ${items[items.length - 1]}`;
}

export function formatSubstitutionSentence(sub: ActiveSubstitution): string {
  const usingPhrase = formatOrList(sub.using.map(formatBarLabel));
  return `${usingPhrase} for ${formatBarLabel(sub.required)}`;
}

interface DrinkSubstitutionsProps {
  drink: Drink;
}

export default function DrinkSubstitutions({ drink }: DrinkSubstitutionsProps) {
  const { tags: owned, isLoading: barLoading, error: barError } = useBar();
  const {
    settings,
    isLoading: settingsLoading,
    error: settingsError,
  } = useSettings();

  const ready = !barLoading && !settingsLoading && !barError && !settingsError;

  const substitutions = useMemo(() => {
    if (!ready) {
      return [];
    }
    return getDrinkSubstitutions(drink.tags, owned, settings.substitutions);
  }, [ready, drink.tags, owned, settings.substitutions]);

  if (!substitutions.length) {
    return null;
  }

  return (
    <Wrap>
      <Header>
        <Chip
          to="/my-bar"
          title="Ingredient swaps from bottles in your bar"
          aria-label="Ingredient swaps from bottles in your bar. Open My Bar to adjust."
        >
          <Bottles />
          My Bar
        </Chip>
        &nbsp;Possible substitutions:
      </Header>
      <List>
        {substitutions.map((sub) => (
          <Item key={sub.required}>{formatSubstitutionSentence(sub)}</Item>
        ))}
      </List>
    </Wrap>
  );
}
