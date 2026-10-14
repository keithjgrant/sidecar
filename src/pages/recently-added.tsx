import React from 'react';
import { graphql, Link } from 'gatsby';
import DrinkListLayout from '../app/components/layouts/DrinkListLayout';
import DrinkList from '../app/components/DrinkList';
import Meta from '../app/components/Meta';

import type { Drink } from '../app/types';

/** How far back “recently added” reaches (evaluated at build time). */
const RECENT_MONTHS = 9;

function monthsAgo(months: number): Date {
  const d = new Date();
  d.setMonth(d.getMonth() - months);
  return d;
}

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

  const since = monthsAgo(RECENT_MONTHS);
  const recent = drinks.edges
    .map((item) => item.node.frontmatter)
    .filter((drink) => drink.date && new Date(drink.date) >= since);

  return (
    <DrinkListLayout title="Recently Added">
      <DrinkList drinks={recent} imageMap={imageMap} sortBy="date" />
      <p>
        <Link to="/drinks">See all drinks</Link>
      </p>
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
