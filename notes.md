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

# Help me decide questions:

x seasonal or timeless (based on seasonal tags (winter, summer, fall, spring) vs classic-cocktail tag)
X citrusy or rich (citrus tags (lemon, lime, grapefruit) vs rich ingredients (cream, egg, amaretto))
X fruity or herbal (fruit tags vs herbal ingredients (gin, chartreuse, etc.))
- smoky or clean (mezcal, peaty scotch, smokey tags vs clean spirits)
- spicy or mellow (based on spicy tag and ingredients like jalapeño, black pepper)
- bitter or smooth (Campari, Aperol, amaro tags vs smooth ingredients)
