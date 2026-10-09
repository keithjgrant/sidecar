/**
 * Month-keyed featured bottle schedule. Single source of truth for the app
 * (via featuredBottles.ts) and offline precache (via gatsby-config.js).
 *
 * `image` is the filename under src/images/bottles/, including extension
 * (e.g. 'campari.webp').
 *
 * Future candidates (once more recipes exist):
 * - suze (~4 drinks)
 * - aperol (~3)
 * - ancho-reyes (~2)
 * - averna
 * - dry curacao
 * - sweet vermouth?
 *
 * @typedef {{ tag: string, label: string, image?: string }} FeaturedBottle
 * @type {Record<string, FeaturedBottle>}
 */
const featuredBottles = {
  '2026-11': { tag: 'cynar', label: 'Cynar', image: 'cynar.jpg' },
  '2026-12': {
    tag: 'green-chartreuse',
    label: 'Green Chartreuse (and substitutes)',
  },
  '2027-01': { tag: 'benedictine', label: 'Bénédictine' },
  '2027-02': { tag: 'campari', label: 'Campari', image: 'campari.webp' },
  '2027-03': { tag: 'maraschino', label: 'Maraschino' },
};

module.exports = { featuredBottles };
