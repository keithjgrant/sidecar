/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const DrinkTemplate = path.resolve('src/templates/DrinkTemplate.js');
  const ArticleTemplate = path.resolve('src/templates/ArticleTemplate.js');
  const TagTemplate = path.resolve('src/templates/TagTemplate.js');

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 1000) {
        edges {
          node {
            frontmatter {
              path
              tags
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  const pages = result.data.allMarkdownRemark.edges;
  const tags = new Set();
  pages.forEach(({ node: { frontmatter } }) => {
    if (!frontmatter.path) {
      return;
    }
    const isDrink = frontmatter.path.startsWith('/drinks/');
    createPage({
      path: frontmatter.path,
      component: isDrink ? DrinkTemplate : ArticleTemplate,
      context: {
        filePath: frontmatter.path,
        imagePath: isDrink ? `${frontmatter.path.substr(1)}.jpg` : '',
      },
    });

    if (frontmatter.tags) {
      frontmatter.tags.forEach((tag) => tags.add(tag));
    }
  });

  const customTagPages = ['ten-bottle-bar'];

  tags.forEach((tag) => {
    if (customTagPages.includes(tag)) {
      return;
    }
    createPage({
      path: `/tags/${tag}`,
      component: TagTemplate,
      context: { tag, contentPath: `/_tags/${tag}` },
    });
  });
};
