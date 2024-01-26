import React from 'react';
import { graphql } from 'gatsby';
import DrinkListLayout from '../components/layouts/DrinkListLayout';
import Meta from '../components/Meta';
import HelpMeDecide from '../components/HelpMeDecide/HelpMeDecide';

export default function HelpMeDecidePage({ data: { drinks, images } }) {
  const imageMap = {};
  if (images && images.edges) {
    images.edges.forEach(({ node: { name, childImageSharp } }) => {
      imageMap[name] = { childImageSharp };
    });
  }
  return (
    <DrinkListLayout title="Help Me Decide">
      <HelpMeDecide
        drinks={drinks.edges.map((item) => ({
          html: item.node.html,
          ...item.node.frontmatter,
        }))}
        imageMap={imageMap}
      />
    </DrinkListLayout>
  );
}

export const pageQuery = graphql`
  query AllDrinksDecide {
    drinks: allMarkdownRemark(
      filter: { frontmatter: { path: { regex: "/^/drinks//" } } }
      sort: { frontmatter: { path: ASC } }
    ) {
      edges {
        node {
          html
          frontmatter {
            title
            path
            glass
            tags
            ingredients
            garnish
            family
            booziness
            sweetness
            image {
              url
              alt
              align
            }
          }
        }
      }
    }
    images: allFile(
      filter: {
        relativePath: { regex: "/^drinks//" }
        sourceInstanceName: { eq: "images" }
      }
    ) {
      edges {
        node {
          name
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 80, quality: 85)
          }
        }
      }
    }
  }
`;

export const Head = () => <Meta title="Help Me Decide" />;
