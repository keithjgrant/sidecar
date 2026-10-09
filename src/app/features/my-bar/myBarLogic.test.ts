import { describe, expect, it } from 'vitest';
import {
  BAR_CATALOG,
  DEFAULT_BAR,
  SPIRIT_PARENTS,
  canMakeDrink,
  filterMakeableDrinks,
  formatBarLabel,
  getRequiredBarTags,
} from './myBarLogic';

describe('myBar', () => {
  it('should default the bar to lemon and lime', () => {
    expect([...DEFAULT_BAR]).toEqual(['lemon', 'lime']);
  });

  it('should include all taxonomy bar groups in catalog order', () => {
    expect(BAR_CATALOG.map((g) => g.id)).toEqual([
      'spirits',
      'vermouth',
      'liqueurs',
      'amaro',
      'syrups',
      'citrus',
    ]);
  });

  it('should nest spirit subtypes under their parent tags', () => {
    const spirits = BAR_CATALOG.find((g) => g.id === 'spirits');
    const whiskey = spirits?.items.find((item) => item.tag === 'whiskey');
    const gin = spirits?.items.find((item) => item.tag === 'gin');
    const topLevelTags = spirits?.items.map((item) => item.tag) ?? [];

    expect(whiskey?.children).toEqual([
      'bourbon',
      'irish-whiskey',
      'rye-whiskey',
      'scotch',
    ]);
    expect(gin?.children).toContain('london-dry-gin');
    expect(topLevelTags).not.toContain('bourbon');
    expect(topLevelTags).toContain('mezcal');
  });

  it('should nest orange liqueur styles under orange-liqueur', () => {
    const liqueurs = BAR_CATALOG.find((g) => g.id === 'liqueurs');
    const orange = liqueurs?.items.find((item) => item.tag === 'orange-liqueur');
    const topLevelTags = liqueurs?.items.map((item) => item.tag) ?? [];

    expect(orange?.children).toEqual([
      'curacao',
      'dry-curacao',
      'triple-sec',
    ]);
    expect(topLevelTags).not.toContain('triple-sec');
    expect(topLevelTags).toContain('orange-liqueur');
  });

  it('should format slug tags as title case labels', () => {
    expect(formatBarLabel('london-dry-gin')).toBe('London Dry Gin');
    expect(formatBarLabel('campari')).toBe('Campari');
  });

  it('should require only bar-relevant tags and ignore flavor and technique', () => {
    expect(
      getRequiredBarTags([
        'gin',
        'campari',
        'sweet-vermouth',
        'stirred',
        'bitter',
        'negroni',
      ]),
    ).toEqual(['gin', 'campari', 'sweet-vermouth']);
  });

  it('should not treat drinks with no bar tags as makeable', () => {
    expect(canMakeDrink({ tags: ['stirred', 'classic-cocktail'] }, [])).toBe(
      false,
    );
  });

  it('should match when every required tag is owned', () => {
    expect(
      canMakeDrink(
        { tags: ['gin', 'campari', 'sweet-vermouth', 'stirred'] },
        ['gin', 'campari', 'sweet-vermouth'],
      ),
    ).toBe(true);
  });

  it('should fail when a required bottle is missing', () => {
    expect(
      canMakeDrink(
        { tags: ['gin', 'campari', 'sweet-vermouth'] },
        ['gin', 'campari'],
      ),
    ).toBe(false);
  });

  it('should let a spirit subtype satisfy the parent tag', () => {
    expect(SPIRIT_PARENTS.bourbon).toBe('whiskey');
    expect(
      canMakeDrink({ tags: ['whiskey', 'sweet-vermouth'] }, [
        'bourbon',
        'sweet-vermouth',
      ]),
    ).toBe(true);
  });

  it('should not let a parent spirit satisfy a subtype requirement', () => {
    expect(
      canMakeDrink({ tags: ['bourbon', 'lemon'] }, ['whiskey', 'lemon']),
    ).toBe(false);
  });

  it('should let an orange liqueur style satisfy orange-liqueur', () => {
    expect(
      canMakeDrink({ tags: ['tequila', 'orange-liqueur', 'lime'] }, [
        'tequila',
        'triple-sec',
        'lime',
      ]),
    ).toBe(true);
  });

  it('should not let orange-liqueur satisfy a specific style requirement', () => {
    expect(
      canMakeDrink({ tags: ['rum', 'dry-curacao', 'lime'] }, [
        'rum',
        'orange-liqueur',
        'lime',
      ]),
    ).toBe(false);
  });

  it('should let citrus defaults unlock citrus drinks when bottles are owned', () => {
    expect(
      canMakeDrink({ tags: ['gin', 'lemon', 'shaken'] }, [
        'gin',
        ...DEFAULT_BAR,
      ]),
    ).toBe(true);
    expect(canMakeDrink({ tags: ['gin', 'lemon'] }, ['gin'])).toBe(false);
  });

  it('should omit meyer-lemon from the bar checklist and requirements', () => {
    const citrus = BAR_CATALOG.find((g) => g.id === 'citrus');
    expect(citrus?.items.map((item) => item.tag)).not.toContain('meyer-lemon');
    expect(
      getRequiredBarTags(['vodka', 'lemon', 'meyer-lemon', 'shaken']),
    ).toEqual(['vodka', 'lemon']);
    expect(
      canMakeDrink(
        { tags: ['vodka', 'lemon', 'meyer-lemon'] },
        ['vodka', 'lemon'],
      ),
    ).toBe(true);
  });

  it('should filter a list down to makeable drinks only', () => {
    const drinks = [
      { title: 'Negroni', tags: ['gin', 'campari', 'sweet-vermouth'] },
      { title: 'Whiskey Sour', tags: ['bourbon', 'lemon', 'shaken'] },
      { title: 'Untagged', tags: ['classic-cocktail'] },
    ];
    const makeable = filterMakeableDrinks(drinks, [
      'gin',
      'campari',
      'sweet-vermouth',
      'lemon',
    ]);
    expect(makeable.map((d) => d.title)).toEqual(['Negroni']);
  });
});
