import { describe, expect, it } from 'vitest';
import { TENTH_BOTTLE_TAGS } from '../../config/tenBottleBar';
import type { Drink } from '../../types';
import { getDrinkFilter } from './TenBottleBar';

function drink(tags: string[]): Drink {
  return {
    title: tags.join(' '),
    path: `/${tags.join('-')}`,
    glass: 'coupe',
    tags,
    ingredients: [],
  };
}

function filter(
  options: Partial<{
    vermouth: string;
    addSyrups: boolean;
    excluded: readonly string[];
  }> = {}
) {
  return getDrinkFilter({
    vermouth: 'sweet',
    addSyrups: false,
    excluded: TENTH_BOTTLE_TAGS,
    ...options,
  });
}

describe.skip('getDrinkFilter', () => {
  describe('drinks with ten-bottle-bar tag', () => {
    it('should include a tagged drink with no vermouth for any vermouth selection', () => {
      const daiquiri = drink(['ten-bottle-bar', 'rum', 'lime']);
      expect(filter({ vermouth: 'sweet' })(daiquiri)).toBe(true);
      expect(filter({ vermouth: 'blanc' })(daiquiri)).toBe(true);
      expect(filter({ vermouth: 'dry' })(daiquiri)).toBe(true);
    });

    it('should include a tagged sweet-vermouth drink when sweet is selected', () => {
      const manhattan = drink([
        'ten-bottle-bar',
        'rye-whiskey',
        'sweet-vermouth',
      ]);
      expect(filter({ vermouth: 'sweet' })(manhattan)).toBe(true);
    });

    it('should exclude a tagged sweet-vermouth drink when blanc or dry is selected', () => {
      const manhattan = drink([
        'ten-bottle-bar',
        'rye-whiskey',
        'sweet-vermouth',
      ]);
      expect(filter({ vermouth: 'blanc' })(manhattan)).toBe(false);
      expect(filter({ vermouth: 'dry' })(manhattan)).toBe(false);
    });

    it('should include a tagged blanc-vermouth drink when blanc is selected', () => {
      const corpseReviver = drink([
        'ten-bottle-bar',
        'gin',
        'blanc-vermouth',
        'absinthe',
      ]);
      expect(filter({ vermouth: 'blanc' })(corpseReviver)).toBe(true);
    });

    it('should exclude a tagged blanc-vermouth drink when sweet or dry is selected', () => {
      const corpseReviver = drink([
        'ten-bottle-bar',
        'gin',
        'blanc-vermouth',
        'absinthe',
      ]);
      expect(filter({ vermouth: 'sweet' })(corpseReviver)).toBe(false);
      expect(filter({ vermouth: 'dry' })(corpseReviver)).toBe(false);
    });

    it('should include a tagged dry-vermouth drink when dry is selected', () => {
      const martiniStyle = drink(['ten-bottle-bar', 'gin', 'dry-vermouth']);
      expect(filter({ vermouth: 'dry' })(martiniStyle)).toBe(true);
    });

    it('should exclude a tagged dry-vermouth drink when sweet or blanc is selected', () => {
      const martiniStyle = drink(['ten-bottle-bar', 'gin', 'dry-vermouth']);
      expect(filter({ vermouth: 'sweet' })(martiniStyle)).toBe(false);
      expect(filter({ vermouth: 'blanc' })(martiniStyle)).toBe(false);
    });
  });

  describe('candidate drinks without ten-bottle-bar', () => {
    it('should include a drink with no vermouth tag', () => {
      const sour = drink(['gin', 'lemon', 'simple-syrup']);
      expect(filter({ vermouth: 'sweet' })(sour)).toBe(true);
      expect(filter({ vermouth: 'blanc' })(sour)).toBe(true);
      expect(filter({ vermouth: 'dry' })(sour)).toBe(true);
    });

    it('should include a drink whose vermouth matches the selection', () => {
      const negroni = drink(['gin', 'campari', 'sweet-vermouth']);
      expect(
        filter({
          vermouth: 'sweet',
          excluded: TENTH_BOTTLE_TAGS.filter((t) => t !== 'campari'),
        })(negroni)
      ).toBe(true);
    });

    it('should exclude a drink whose vermouth does not match the selection', () => {
      const negroni = drink(['gin', 'campari', 'sweet-vermouth']);
      expect(
        filter({
          vermouth: 'blanc',
          excluded: TENTH_BOTTLE_TAGS.filter((t) => t !== 'campari'),
        })(negroni)
      ).toBe(false);
      expect(
        filter({
          vermouth: 'dry',
          excluded: TENTH_BOTTLE_TAGS.filter((t) => t !== 'campari'),
        })(negroni)
      ).toBe(false);
    });

    it('should exclude a drink with a fancy syrup when syrups are off', () => {
      const fancy = drink(['gin', 'lemon', 'orgeat']);
      expect(filter({ addSyrups: false })(fancy)).toBe(false);
    });

    it('should include a drink with a fancy syrup when syrups are on', () => {
      const fancy = drink(['gin', 'lemon', 'orgeat']);
      expect(filter({ addSyrups: true })(fancy)).toBe(true);
    });

    it('should exclude a drink that needs an unselected tenth bottle', () => {
      const negroni = drink(['gin', 'campari', 'sweet-vermouth']);
      expect(
        filter({
          vermouth: 'sweet',
          excluded: TENTH_BOTTLE_TAGS,
        })(negroni)
      ).toBe(false);
    });

    it('should include a drink when its tenth bottle is selected', () => {
      const negroni = drink(['gin', 'campari', 'sweet-vermouth']);
      expect(
        filter({
          vermouth: 'sweet',
          excluded: TENTH_BOTTLE_TAGS.filter((t) => t !== 'campari'),
        })(negroni)
      ).toBe(true);
    });

    it('should exclude a blanc-vermouth candidate when sweet is selected', () => {
      const elPresidente = drink(['rum', 'blanc-vermouth', 'orange-liqueur']);
      expect(filter({ vermouth: 'sweet' })(elPresidente)).toBe(false);
    });

    it('should exclude a dry-vermouth candidate when sweet is selected', () => {
      const martini = drink(['gin', 'dry-vermouth']);
      expect(filter({ vermouth: 'sweet' })(martini)).toBe(false);
    });
  });
});
