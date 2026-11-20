import React, { useMemo } from 'react';
import { Link } from 'gatsby';
import type { Drink } from '../../types';
import {
  getDrinkSubstitutions,
  type ActiveSubstitution,
} from '../../features/my-bar/myBarUtils';
import { formatBarLabel } from '../../lib/formatBarLabel';
import { useBar } from '../../storage/bar';
import { useSettings } from '../../storage/settings';
import Bottles from '../svg/Bottles';

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
    <>
      <div className="drink-substitutions">
        <div className="drink-substitutions__header">
          <Link
            className="bar-filter-chip"
            to="/my-bar"
            title="Ingredient swaps from bottles in your bar"
            aria-label="Ingredient swaps from bottles in your bar. Open My Bar to adjust."
          >
            <Bottles />
            My Bar
          </Link>
          Possible substitutions:
        </div>
        <ul>
          {substitutions.map((sub) => (
            <li key={sub.required}>{formatSubstitutionSentence(sub)}</li>
          ))}
        </ul>
      </div>
      <hr />
    </>
  );
}
