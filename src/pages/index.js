import React from 'react';
import { graphql } from 'gatsby';
import HomepageLayout from '../components/layouts/HomepageLayout';
import Meta from '../components/Meta';
import HomeTiles from '../components/homepage/HomeTiles';

function getDrinkObjects(result) {
  return result.edges.map((item) => item.node.frontmatter);
}

export default function IndexPage({
  data: { recent, featured, images, heroImage },
}) {
  const imageMap = {};
  images.edges.forEach(({ node: { name, childImageSharp } }) => {
    imageMap[name] = childImageSharp;
  });
  return (
    <HomepageLayout heroImage={heroImage}>
      <HomeTiles
        recent={getDrinkObjects(recent)}
        featured={getDrinkObjects(featured)}
        imageMap={imageMap}
      />
    </HomepageLayout>
  );
}

export const pageQuery = graphql`
  query FeaturedDrinks {
    featured: allMarkdownRemark(
      filter: { frontmatter: { featured: { eq: true } } }
      limit: 3
    ) {
      edges {
        node {
          frontmatter {
            title
            path
            date(formatString: "DD MMM YYYY")
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
    heroImage: file(relativePath: { eq: "hero.jpg" }) {
      relativePath
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, height: 800, quality: 85)
      }
    }
  }
`;

export const Head = () => (
  <Meta title="Sidecar — Cocktails for the home bartender" />
);
