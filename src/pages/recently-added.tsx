import React from 'react';
import { graphql } from 'gatsby';
import DrinkListLayout from '../app/components/layouts/DrinkListLayout';
import DrinkList from '../app/components/DrinkList';
import Meta from '../app/components/Meta';

import type { Drink } from '../app/types';

interface RecentlyAddedPageProps {
  data: {
    drinks: { edges: { node: { frontmatter: Drink } }[] };
    images: { edges: { node: { name: string; childImageSharp: unknown } }[] };
  };
}

export default function RecentlyAddedPage({
  data: { drinks, images },
}: RecentlyAddedPageProps) {
  const imageMap: Record<string, unknown> = {};
  if (images && images.edges) {
    images.edges.forEach(({ node: { name, childImageSharp } }) => {
      imageMap[name] = childImageSharp;
    });
  }
  return (
    <DrinkListLayout title="Recently Added">
      <DrinkList
        drinks={drinks.edges.map((item) => item.node.frontmatter)}
        imageMap={imageMap}
        sortBy="date"
      />
    </DrinkListLayout>
  );
}

export const pageQuery = graphql`
  query RecentlyAdded {
    drinks: allMarkdownRemark(
      filter: { frontmatter: { path: { regex: "/^/drinks//" } } }
      sort: { frontmatter: { date: DESC } }
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

export const Head = () => <Meta title="Sidecar: Recently Added" />;
