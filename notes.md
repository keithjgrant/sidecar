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

[x] clean up `amaro` tag. either apply it everywhere or remove it from Paper Plane
[x] merge `fernet` and `fernet-branca` tags → use `fernet`
[x] is `special-syrup` tag use consistently? Is it necessary for 10-bottle-bar functionality?
    → keep as catch-all for one-off syrups; dual-tag flavor + `*-syrup`; fancy list lives in tagTaxonomy
[x] `anise` tag? removed — redundant with absinthe, out of place in FLAVOR_TAGS
[] Add "skip question" option in Help My Decide
[x] Rework homescreen; add Tags & featured bottle link
[x] Featured bottle feature (replaces featured drinks on homescreen)
[] In My Bar
    [] Group checkboxes logically
    [] select/clear all for page & each section
    [] make each section collapsible?
    [] Add checkbox for sparkling-wine/prosecco - Aperol Spritz, etc.
    [] Add filter on Drinks page & remove list from Bar page
    [] orange liqueur tag subtypes?
    [] add note listing items not tracked/assumed (bitters, etc)
[] better testing/evaluation tools for Help Me Decided weighted selection
[] Nav icons along bottom of screen in standalone (PWA) mode?
[] clean up weird TileWithLink homescreen components/css
[] haptics
    [] back-button long press function broken (part of screen is text-selected instead)
    [] favorite button no longer provides haptic feedback

Let's look at a little file structure cleanup. I'd like it to be clear from the file structure what is used for drink/tag filtering, In My Bar functionality, etc. In particular, is @src/util/tagTaxonomy.ts used by multiple functions? should some of the newer files be reorganized, or it the structure clear as it is?
