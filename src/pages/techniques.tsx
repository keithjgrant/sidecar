import React from 'react';
import { graphql } from 'gatsby';
import IndexLayout from '../app/components/layouts/IndexLayout';
import Meta from '../app/components/Meta';
import TechniquesList from '../app/components/TechniquesList';

import type { TileLinkProps } from '../app/components/tiles/TileLink';

interface TechniquesPageProps {
  data: Record<string, TileLinkProps['image']>;
}

export default function TechniquesPage({ data }: TechniquesPageProps) {
  return (
    <IndexLayout title="Techniques">
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
