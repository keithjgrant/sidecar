import { describe, expect, it } from 'vitest';
import { formatBarLabel } from './formatBarLabel';

describe('formatBarLabel', () => {
  it('should format slug tags as title case labels', () => {
    expect(formatBarLabel('london-dry-gin')).toBe('London Dry Gin');
    expect(formatBarLabel('campari')).toBe('Campari');
  });

  it('should use label overrides for accents and special casing', () => {
    expect(formatBarLabel('cachaca')).toBe('Cachaça');
    expect(formatBarLabel('curacao')).toBe('Curaçao');
    expect(formatBarLabel('dry-curacao')).toBe('Dry Curaçao');
    expect(formatBarLabel('creme-de-cacao')).toBe('Crème de Cacao');
    expect(formatBarLabel('creme-de-mure')).toBe('Crème de Mûre');
    expect(formatBarLabel('benedictine')).toBe('Bénédictine');
    expect(formatBarLabel('jalapeno-syrup')).toBe('Jalapeño Syrup');
    expect(formatBarLabel('ipa-syrup')).toBe('IPA Syrup');
    expect(formatBarLabel('punt-e-mes')).toBe('Punt e Mes');
  });
});
