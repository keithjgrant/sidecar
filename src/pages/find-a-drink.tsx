import React from 'react';
import { graphql } from 'gatsby';
import DrinkListLayout from '../app/components/layouts/DrinkListLayout';
import Meta from '../app/components/Meta';
import FindADrink from '../app/features/find-a-drink/FindADrink';

import type { Drink } from '../app/types';

interface FindADrinkPageProps {
  data: {
    drinks: { edges: { node: { html: string; frontmatter: Drink } }[] };
    images: { edges: { node: { name: string; childImageSharp: unknown } }[] };
  };
}

export default function FindADrinkPage({
  data: { drinks, images },
}: FindADrinkPageProps) {
  const imageMap: Record<string, unknown> = {};
  if (images && images.edges) {
    images.edges.forEach(({ node: { name, childImageSharp } }) => {
      imageMap[name] = { childImageSharp };
    });
  }
  return (
    <DrinkListLayout title="Find a Drink">
      <FindADrink
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

export const Head = () => <Meta title="Find a Drink" />;
