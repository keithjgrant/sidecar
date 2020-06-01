import React from 'react';
import { graphql } from 'gatsby';
import DrinkListLayout from '../components/layouts/DrinkListLayout';
import Meta from '../components/Meta';
import HelpMeDecide from '../components/HelpMeDecide/HelpMeDecide';

export default function HelpMeDecidePage({ data: { drinks, images } }) {
  const imageMap = {};
  if (images && images.edges) {
    images.edges.forEach(({ node: { name, childImageSharp } }) => {
      imageMap[name] = childImageSharp;
    });
  }
  return (
    <DrinkListLayout title="Help Me Decide">
      <Meta title="Sidecar: Help Me Decide" />
      <HelpMeDecide
        drinks={drinks.edges.map((item) => ({
          html: item.html,
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
      sort: { order: ASC, fields: [frontmatter___path] }
    ) {
      edges {
        node {
          html
          frontmatter {
            title
            path
            glass
            tags
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
            fluid(maxWidth: 130, webpQuality: 80) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;
