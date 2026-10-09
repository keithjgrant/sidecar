// Test script to evaluate all help-me-decide questions
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Import all question modules
const lightOrDark =
  require('./src/app/features/help-me-decide/questions/lightOrDark.js').default;
const sweetOrStiff =
  require('./src/app/features/help-me-decide/questions/sweetOrStiff.js').default;
const refreshingOrIntense =
  require('./src/app/features/help-me-decide/questions/refreshingOrIntense.js').default;
const simpleOrElaborate =
  require('./src/app/features/help-me-decide/questions/simpleOrElaborate.js').default;
const boozyOrMild =
  require('./src/app/features/help-me-decide/questions/boozyOrMild.js').default;
const seasonalOrTimeless =
  require('./src/app/features/help-me-decide/questions/seasonalOrTimeless.js').default;
const citrusyOrRich =
  require('./src/app/features/help-me-decide/questions/citrusyOrRich.js').default;
const fruityOrHerbal =
  require('./src/app/features/help-me-decide/questions/fruityOrHerbal.js').default;
const smokyOrClean =
  require('./src/app/features/help-me-decide/questions/smokyOrClean.js').default;
const spicyOrMellow =
  require('./src/app/features/help-me-decide/questions/spicyOrMellow.js').default;
const bitterOrSmooth =
  require('./src/app/features/help-me-decide/questions/bitterOrSmooth.js').default;

const allQuestions = [
  lightOrDark,
  sweetOrStiff,
  refreshingOrIntense,
  simpleOrElaborate,
  boozyOrMild,
  seasonalOrTimeless,
  citrusyOrRich,
  fruityOrHerbal,
  smokyOrClean,
  spicyOrMellow,
  bitterOrSmooth,
];

// Load all cocktail data
function loadCocktails() {
  const cocktailsDir = path.join(__dirname, 'src/pages/drinks');
  const files = fs
    .readdirSync(cocktailsDir)
    .filter((file) => file.endsWith('.md'));

  return files.map((file) => {
    const filePath = path.join(cocktailsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data: frontMatter, content: html } = matter(content);

    return {
      title: frontMatter.title,
      path: frontMatter.path,
      tags: frontMatter.tags || [],
      garnish: frontMatter.garnish || '',
      ingredients: frontMatter.ingredients || [],
      family: frontMatter.family,
      booziness: frontMatter.booziness,
      sweetness: frontMatter.sweetness,
      glass: frontMatter.glass,
      html: html,
    };
  });
}

// Test a single question with all answers
function testQuestion(question, cocktails) {
  const results = {};

  question.options.forEach(([answer, label]) => {
    console.log(`\n=== ${question.prompt} → ${label} ===`);

    const scoredDrinks = question.score(cocktails, answer);
    const sorted = scoredDrinks.sort((a, b) => b.score - a.score);
    const top = sorted.slice(0, 15); // Top 15 results
    const bottom = sorted.slice(-15); // Bottom 5 results

    console.log('Ranked cocktails:');
    sorted.forEach((drink) => {
      console.log(`${drink.score.toString().padStart(3)}: ${drink.title}`);
    });
    // console.log('Top scoring cocktails:');
    // top.forEach((drink) => {
    //   console.log(`${drink.score.toString().padStart(3)}: ${drink.title}`);
    // });
    // console.log('Bottom scoring cocktails:');
    // bottom.forEach((drink) => {
    //   console.log(`${drink.score.toString().padStart(3)}: ${drink.title}`);
    // });

    results[answer] = sorted;
  });

  return results;
}

// Main execution
function runTests() {
  console.log('Loading cocktails...');
  const cocktails = loadCocktails();
  console.log(`Loaded ${cocktails.length} cocktails\n`);

  allQuestions.forEach((question) => {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`TESTING: ${question.prompt.toUpperCase()}`);
    console.log(`${'='.repeat(60)}`);

    testQuestion(question, cocktails);
  });
}

// Run the tests
runTests();
