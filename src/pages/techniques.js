import React from 'react';
import { graphql } from 'gatsby';
import IndexLayout from '../components/layouts/IndexLayout';
import Meta from '../components/Meta';
import { BrowserHeading } from '../components/PageHeading';
import TechniquesList from '../components/TechniquesList';

export default function TechniquesPage({ data }) {
  return (
    <IndexLayout title="Techniques">
      <BrowserHeading bleed>
        Essential Techniques for Cocktail Making
      </BrowserHeading>
      <TechniquesList thumbnails={data} />
    </IndexLayout>
  );
}

export const pageQuery = graphql`
  query Techniques {
    building: file(
      relativePath: { eq: "drinks/french-kiss.jpg" }
      sourceInstanceName: { eq: "images" }
    ) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, width: 250, quality: 80)
      }
    }
    shaking: file(
      relativePath: { eq: "drinks/angel-city-fizz.jpg" }
      sourceInstanceName: { eq: "images" }
    ) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, width: 250, quality: 80)
      }
    }
    stirring: file(
      relativePath: { eq: "drinks/pilots-license.jpg" }
      sourceInstanceName: { eq: "images" }
    ) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, width: 250, quality: 80)
      }
    }
  }
`;

export const Head = () => (
  <Meta title="Essential Techniques for Cocktail Making" />
);
