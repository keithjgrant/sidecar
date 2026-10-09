import React from 'react';
import { graphql } from 'gatsby';
import type { IGatsbyImageData } from 'gatsby-plugin-image';
import HomepageLayout from '../app/components/layouts/HomepageLayout';
import Meta from '../app/components/Meta';
import HomeTiles from '../app/components/homepage/HomeTiles';

import type { Drink } from '../app/types';

interface DrinkEdge {
  node: { frontmatter: Drink };
}

function getDrinkObjects(result: { edges: DrinkEdge[] }) {
  return result.edges.map((item) => item.node.frontmatter);
}

interface IndexPageProps {
  data: {
    recent: { edges: DrinkEdge[] };
    images: { edges: { node: { name: string; childImageSharp: unknown } }[] };
    bottleImages: {
      edges: {
        node: {
          base: string;
          childImageSharp: { gatsbyImageData: IGatsbyImageData };
        };
      }[];
    };
    heroImage: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
  };
}

export default function IndexPage({
  data: { recent, images, bottleImages, heroImage },
}: IndexPageProps) {
  const imageMap: Record<string, unknown> = {};
  images.edges.forEach(({ node: { name, childImageSharp } }) => {
    imageMap[name] = childImageSharp;
  });

  const bottleImageMap: Record<
    string,
    { gatsbyImageData: IGatsbyImageData } | undefined
  > = {};
  bottleImages.edges.forEach(({ node: { base, childImageSharp } }) => {
    bottleImageMap[base] = childImageSharp;
  });

  return (
    <HomepageLayout heroImage={heroImage}>
      <HomeTiles
        recent={getDrinkObjects(recent)}
        imageMap={imageMap}
        bottleImageMap={bottleImageMap}
      />
    </HomepageLayout>
  );
}

export const pageQuery = graphql`
  query FeaturedDrinks {
    recent: allMarkdownRemark(
      filter: { frontmatter: { path: { regex: "/^/drinks//" } } }
      sort: { frontmatter: { date: DESC } }
      limit: 3
    ) {
      edges {
        node {
          frontmatter {
            title
            path
            date(formatString: "MMMM DD, YYYY")
            glass
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
            gatsbyImageData(layout: CONSTRAINED, width: 250, quality: 80)
          }
        }
      }
    }
    bottleImages: allFile(
      filter: {
        relativePath: { regex: "/^bottles//" }
        sourceInstanceName: { eq: "images" }
      }
    ) {
      edges {
        node {
          base
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 120, quality: 80)
          }
        }
      }
    }
    heroImage: file(relativePath: { eq: "hero.jpg" }) {
      relativePath
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, quality: 85)
      }
    }
  }
`;

export const Head = () => (
  <Meta title="Sidecar — Cocktails for the home bartender" />
);
