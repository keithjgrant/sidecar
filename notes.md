Flavor profile spectrums (from noillyprat.com):

- sweet to dry
- winey to bitter
- round to sour
- floral to spicy


Future possible homepage links:
* tags
* favorites
* in my bar
* help me decide
* hand-selected featured link (new article, drink, etc.)

# Ten bottle bar

•  tenBottleCandidate: true → "Can this drink potentially be made with a ten-bottle bar?"
•  ten-bottle-bar tag → "This drink definitely works with the basic ten-bottle setup"

tenBottleCandidate: true flag
•  Purpose: Controls which drinks appear on the ten-bottle-bar page
•  Used in: GraphQL query in src/pages/tags/ten-bottle-bar.js (line 34): filter: { frontmatter: { tenBottleCandidate: { eq: true } } }
•  Function: Initial filtering to determine the candidate set of drinks for the ten-bottle bar page

ten-bottle-bar tag  
•  Purpose: Used for runtime filtering logic within the TenBottleBar component
•  Used in: src/components/TenBottleBar.js (line 61): if (drink.tags.includes('ten-bottle-bar'))
•  Function: Fine-grained filtering based on user selections (vermouth type, tenth bottle choice, etc.)


# TODO

[x] agave tag (add to bar list)
[x] egg nog has all the tags. figure out My Bar filtering
[x] move featured bottle above Ingredients | Techniques
[x] cream, eggs, milk, coffee, etc to Misc in Bar
[x] track bitters in My Bar
[] Add "skip question" option in Help My Decide
[x] clean up console errors
[] split "aged-rum" to jamaican, barbados etc, now that substitutions in place?
[x] sticky alpha headers cover mobile title + back button
[x] don't use alpha scroll when list below a certain length
[] add `modern-classic` tag
[] add cynar to TBB options
[] control dials for help me decide weights?
[] better testing/evaluation tools for Help Me Decided weighted selection
[] Nav icons along bottom of screen in standalone (PWA) mode?
[] clean up weird TileWithLink homescreen components/css
[] haptics
    [] back-button long press function broken (part of screen is text-selected instead)
    [] favorite button no longer provides haptic feedback
[] add any new options for 10th bottle in TenBottleBar.tsx?
[] Centralize storage-blocked warning: add useStorageBlocked() + app-level banner (not MyBar-specific); widen copy beyond bar saves

Updated palette?
https://tools.keithjgrant.com/theme-machine/palette/?d=81,02,273.3,slate&c=81,11,63.3,orange&c=81,11,273.3,indigo&c=81,11,213.3,cyan&b1=slate-14&b2=slate-12&b3=slate-16&t1=slate-3&t2=slate-5&br=orange-5&lc=1&cc=0
