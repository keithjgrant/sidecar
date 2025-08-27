# Cocktail Recipe Tag Analysis

*Analysis conducted on 127+ cocktail recipes*

## Current Tag Usage Statistics

**Most Common Tags:**
- `shaken`: 68 recipes
- `stirred`: 47 recipes  
- `gin`: 37 recipes
- `lemon`: 29 recipes
- `whiskey`: 28 recipes
- `lime`: 28 recipes
- `sweet-vermouth`: 24 recipes
- `ten-bottle-bar`: 22 recipes

**Glass Distribution:**
- Coupe: 72 recipes (most popular)
- Rocks: 37 recipes
- Collins: 7 recipes
- Others: flute (4), martini (2), mug (2), snifter (1), wine (1)

**Complexity Patterns:**
- `boozy-2-sweet-3`: 31 recipes
- `boozy-2-sweet-2`: 30 recipes (balanced cocktails)
- `boozy-1-sweet-3`: 14 recipes (light & sweet)
- `boozy-3-sweet-2`: 14 recipes (strong but not too sweet)
- `boozy-3-sweet-3`: 11 recipes (strong & sweet)

## Issues Found

### 1. Ingredient Tagging Inconsistencies

fixed

### 2. Missing Technique Tags

fixed

### 3. Inconsistent Seasonal Tagging

**Currently tagged (22 recipes):**
- Seasonal tags: summer, fall, winter, spring
- Time tags: afternoon
- Examples: GBC (summer, afternoon), Whiskey Sour (fall), Clover Club (summer)

**Missing seasonal opportunities (35+ recipes):**
Based on ingredient analysis, these could benefit from seasonal tags:
- **Summer candidates**: Paloma, Weekday Fizz, Ramos Gin Fizz (grapefruit, fizz, refreshing ingredients)
- **Winter candidates**: Tortuga, Angel Face, Rye & Spice (cinnamon, ginger, warming spices)
- **Fall candidates**: Churchill's Breakfast, The Conference (apple, spice, warming elements)
- **Spring candidates**: Elder Fashioned, La Chilena (elderflower, light, fresh ingredients)

## Recommended Improvements

### 1. New Tag Categories

**Strength/Complexity Tags:**
- `light-and-refreshing` (booziness 1, afternoon drinks)
- `strong-cocktail` (booziness 3+, serious drinks)
- `balanced` (sweetness 2, booziness 2, crowd-pleasers)
- `dessert-cocktail` (sweetness 3+, after-dinner drinks)

**Mood/Occasion Tags:**
- `date-night` (complex, stirred cocktails)
- `party-drink` (easy to batch, crowd-pleasers)
- `nightcap` (digestifs, lower alcohol)
- `brunch` (lighter, fizzy drinks)

**Enhanced Flavor Profile Tags:**
- `citrusy` (lemon/lime forward drinks)
- `floral` (elderflower, rose, etc.)
- `bitter` (Campari, amaro-forward)
- `creamy` (cream, egg-based drinks)
- `smoky` (mezcal, peated spirits)
- `fruity` (berry, stone fruit elements)
- `spicy` (ginger, jalapeño, black pepper)

**Dietary/Lifestyle Tags:**
- `vegan` (no dairy, egg, honey)
- `low-sugar` (minimal sweeteners)
- `batch-friendly` (scales well for parties)

**Glass-Specific Tags:**
Consider adding glass-specific tags for serving guidance:
- `coupe-glass`, `rocks-glass`, `collins-glass`, etc.

### 2. Immediate Action Items

**High Priority:**
1. **Fix gin type inconsistencies** - add `london-dry-gin`, `plymouth-gin`, `old-tom-gin` tags where ingredients specify them
2. **Add missing technique tags** to the 4 identified recipes
3. **Standardize rum categorization** - ensure all rum drinks have both generic and specific tags

**Medium Priority:**
4. **Add seasonal tags** to 35+ recipes with seasonal ingredients
5. **Add complexity-based tags** for better filtering by strength/occasion
6. **Consider mood/occasion tags** for date-night, party, brunch contexts

**Low Priority:**
7. **Expand flavor profile tags** for more nuanced searching
8. **Add dietary/lifestyle tags** for special dietary needs

## Usage Recommendations

### For Recipe Organization:
- Use technique tags (`shaken`, `stirred`, `built`, `muddled`) consistently
- Apply both generic and specific ingredient tags (e.g., `gin` + `london-dry-gin`)
- Add seasonal tags to help users find appropriate drinks for the season
- Use complexity tags to match drinks to occasions

### For User Experience:
- Mood/occasion tags help users find the right drink for the moment
- Dietary tags accommodate different lifestyles
- Flavor profile tags enable taste-based discovery
- Glass tags can suggest appropriate serving vessels

## Current Tag Health: 85%

**Strengths:**
- Excellent technique tagging (95% coverage)
- Good ingredient specificity for spirits
- Solid foundation of flavor and seasonal tags
- Consistent use of the ten-bottle-bar system

**Areas for Improvement:**
- Gin type consistency
- Missing technique tags on 4 recipes
- Underutilized seasonal tagging opportunities
- Could benefit from complexity/occasion-based organization
