import React from 'react';
import { graphql } from 'gatsby';
import DrinkListLayout from '../components/layouts/DrinkListLayout';
import Meta from '../components/Meta';
import Explore from '../components/Explore';

import type { Drink } from '../types';

interface DrinksPageProps {
  data: {
    drinks: { edges: { node: { frontmatter: Drink } }[] };
    images: { edges: { node: { name: string; childImageSharp: unknown } }[] };
  };
}

export default function DrinksPage({ data: { drinks, images } }: DrinksPageProps) {
  const imageMap: Record<string, unknown> = {};
  if (images && images.edges) {
    images.edges.forEach(({ node: { name, childImageSharp } }) => {
      imageMap[name] = childImageSharp;
    });
  }
  return (
    <DrinkListLayout title="All Drinks">
      <Explore
        drinks={drinks.edges.map((item) => item.node.frontmatter)}
        imageMap={imageMap}
      />
    </DrinkListLayout>
  );
}

export const pageQuery = graphql`
  query AllDrinks {
    drinks: allMarkdownRemark(
      filter: { frontmatter: { path: { regex: "/^/drinks//" } } }
      sort: { frontmatter: { path: ASC } }
    ) {
      edges {
        node {
          frontmatter {
            title
            path
            date(formatString: "DD MMM YYYY")
            glass
            family
            tags
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
            gatsbyImageData(layout: CONSTRAINED, width: 130, quality: 80)
          }
        }
      }
    }
  }
`;

export const Head = () => <Meta title="Sidecar: All Drinks" />;
