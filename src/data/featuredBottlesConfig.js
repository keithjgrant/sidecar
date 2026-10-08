/**
 * Month-keyed featured bottle schedule. Single source of truth for the app
 * (via featuredBottles.ts) and offline precache (via gatsby-config.js).
 *
 * `image` is the filename under src/images/bottles/, including extension
 * (e.g. 'campari.webp').
 *
 * @typedef {{ tag: string, label: string, image?: string }} FeaturedBottle
 * @type {Record<string, FeaturedBottle>}
 */
const featuredBottles = {
  '2026-10': { tag: 'campari', label: 'Campari', image: 'campari.webp' },
  '2026-11': { tag: 'cynar', label: 'Cynar' },
  '2026-12': {
    tag: 'green-chartreuse',
    label: 'Green Chartreuse (substitutions available)',
  },
  '2027-01': { tag: 'benedictine', label: 'Bénédictine' },
  '2027-02': { tag: 'maraschino', label: 'Maraschino' },
};

/** Unique `/tags/{tag}/` paths for every bottle in the schedule. */
function getFeaturedBottleTagPaths() {
  return [
    ...new Set(
      Object.values(featuredBottles).map((bottle) => `/tags/${bottle.tag}/`)
    ),
  ].sort();
}

module.exports = { featuredBottles, getFeaturedBottleTagPaths };
