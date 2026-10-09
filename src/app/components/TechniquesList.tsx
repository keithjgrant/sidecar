import React from 'react';
import SectionHeading from './SectionHeading';
import TileLinkList from './tiles/TileLinkList';
import TileLink, { type TileLinkProps } from './tiles/TileLink';

interface TechniquesListProps {
  thumbnails: Record<string, TileLinkProps['image']>;
}

export default function TechniquesList({ thumbnails }: TechniquesListProps) {
  return (
    <>
      <SectionHeading>Skills</SectionHeading>
      <TileLinkList>
        <li>
          <TileLink
            href="/techniques/building"
            image={thumbnails.building}
            imagePosition="50% 70%"
          >
            Building
          </TileLink>
        </li>
        <li>
          <TileLink
            href="/techniques/shaking"
            image={thumbnails.shaking}
            imagePosition="50% 15%"
          >
            Shaking
          </TileLink>
        </li>
        <li>
          <TileLink
            href="/techniques/stirring"
            image={thumbnails.stirring}
            imagePosition="50% 40%"
          >
            Stirring
          </TileLink>
        </li>
        <li>
          <TileLink href="/techniques/straining">Straining</TileLink>
        </li>
        <li>
          <TileLink href="/techniques/twist">Adding a Twist</TileLink>
        </li>
      </TileLinkList>
      <SectionHeading>Cocktail Families</SectionHeading>
      <p>All cocktails stem from one of six root recipes:</p>
      <TileLinkList>
        <li>
          <TileLink href="/techniques/sour">Sour</TileLink>
        </li>
        <li>
          <TileLink href="/techniques/sidecar">Sidecar</TileLink>
        </li>
        <li>
          <TileLink href="/techniques/old-fashioned">Old Fashioned</TileLink>
        </li>
        <li>
          <TileLink href="/techniques/martini">Martini</TileLink>
        </li>
        <li>
          <TileLink href="/techniques/highball">Highball</TileLink>
        </li>
        <li>
          <TileLink href="/techniques/flip">Flip</TileLink>
        </li>
      </TileLinkList>
    </>
  );
}
