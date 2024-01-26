import React from 'react';
import { graphql, Link } from 'gatsby';
import DrinkListLayout from '../../components/layouts/DrinkListLayout';
import Meta from '../../components/Meta';
import SimpleContent from '../../components/SimpleContent';
import TenBottleBar from '../../components/TenBottleBar';

export default function TenBottleBarPage({ data: { drinks, images } }) {
  const imageMap = {};
  images.edges.forEach(({ node: { name, childImageSharp } }) => {
    imageMap[name] = childImageSharp;
  });
  return (
    <DrinkListLayout title="Your Ten Bottle Bar">
      <SimpleContent>
        <p>
          If you’ve stocked your{' '}
          <Link to="/ingredients/ten-bottle-bar">Ten Bottle Bar</Link>, you can
          make any of the drinks listed here. Use the options below to filter
          the results to match your bar.
        </p>
      </SimpleContent>
      <TenBottleBar
        allDrinks={drinks.edges.map((item) => item.node.frontmatter)}
        imageMap={imageMap}
      />
    </DrinkListLayout>
  );
}

export const pageQuery = graphql`
  query TenBottleBarDrinks {
    drinks: allMarkdownRemark(
      filter: { frontmatter: { tenBottleCandidate: { eq: true } } }
      sort: { frontmatter: { path: ASC } }
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

export const Head = () => <Meta title="Drinks From Your Ten Bottle Bar" />;
