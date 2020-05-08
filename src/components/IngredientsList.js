import React from 'react';
import SectionHeading from './SectionHeading';
import TileLinkList from './tiles/TileLinkList';
import TileLink from './tiles/TileLink';

export default function IngredientsIndex() {
  return (
    <>
      <SectionHeading>Spirits</SectionHeading>
      <TileLinkList>
        <li>
          <TileLink href="/ingredients/ten-bottle-bar">
            Stocking a Ten-Bottle Bar
          </TileLink>
        </li>
        <li>
          <TileLink href="/ingredients/vermouth">Vermouth</TileLink>
        </li>
        <li>
          <TileLink href="/ingredients/gin">Gin</TileLink>
        </li>
      </TileLinkList>
      <SectionHeading>Syrups & mixers</SectionHeading>
      <TileLinkList>
        <li>
          <TileLink href="/ingredients/simple-syrup">Simple Syrup</TileLink>
        </li>
        <li>
          <TileLink href="/ingredients/burnt-sugar-syrup">
            Burnt Sugar Syrup
          </TileLink>
        </li>
        <li>
          <TileLink href="/ingredients/butter-syrup">Butter Syrup</TileLink>
        </li>
      </TileLinkList>
    </>
  );
}
