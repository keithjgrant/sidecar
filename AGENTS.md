# Agents

Guidelines for AI agents working in this project.

## Adding new drinks

Use the `add-drink.sh` script to create new drink files:

```
./add-drink.sh "Drink Name"
```

This generates a file from `DRINK_TEMPLATE.md` with the title, path, and date pre-filled. Fill in the remaining frontmatter and body from there.

## Drink tag ordering

Tags in drink markdown files should be ordered to keep the most useful information "above the fold" (only the first four tags are displayed initially):

1. **Descriptive tags** first — flavor profile, family, occasion, season (e.g. `bitter`, `classic-cocktail`, `negroni`, `aperitif`, `refreshing`, `winter`)
2. **Ingredient tags** — spirits, modifiers, syrups (e.g. `bourbon`, `campari`, `sweet-vermouth`, `demerara`)
3. **Citrus** — (e.g. `lemon`, `lime`, `grapefruit`)
4. **Technique** last — `stirred`, `shaken`, `built`, `muddled`
