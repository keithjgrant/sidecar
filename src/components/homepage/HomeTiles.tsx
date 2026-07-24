import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import TileRow from './TileRow';
import Footer from '../Footer';

const nbsp = '\u00A0';

const Card = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--gray-dark);
`;

const CardBoxDark = styled.div`
  padding: 1rem 0;
  background-color: var(--gray-dark);
`;

const CardBoxHighlight = styled.div`
  max-width: 800px;
  margin: 0 1rem;
  padding: 1rem 0;
  border: 1px solid var(--brand-primary);
  border-radius: var(--border-radius);

  .home-tiles-recent {
    margin-top: 1rem;
  }

  @media (min-width: 810px) {
    margin: 0 auto;
  }
`;

const MainLinks = styled.div`
  display: grid;
  min-height: 40vh;
  max-width: 800px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 2fr 1fr 1fr;
  margin: 0 0.5rem;
  background-color: var(--card-border);
  border: 1px solid var(--card-border);
  border-radius: var(--border-radius);

  & > a {
    text-decoration: none;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.3em 0.5em;
    color: var(--gray-8);

    &:hover {
      color: var(--white);
    }
  }

  @media (min-width: 810px) {
    margin: 0 auto;
  }
`;

const TileLink = styled(Link)`
  display: block;
  margin: 0 1rem;
  max-width: 800px;
  padding: 0.4em 0.5em;
  border: 1px solid var(--card-border);
  border-radius: var(--border-radius);
  background-color: var(--card-bg);
  text-align: center;
  text-decoration: none;

  @media (min-width: 810px) {
    margin: 0 auto;
  }
`;

import type { Drink } from '../../types';

const HomeFooter = styled(Footer)`
  margin-top: auto;
  flex: 0;
`;

interface HomeTilesProps {
  featured: Drink[];
  recent: Drink[];
  imageMap: Record<string, unknown>;
}

const FullWidthLink = styled(Link)`
  grid-column: 1 / 3;
  border-bottom: 1px solid var(--card-border);
`;

const BorderLeftLink = styled(Link)`
  border-left: 1px solid var(--card-border);
`;

export default function HomeTiles({ featured, recent, imageMap }: HomeTilesProps) {
  return (
    <Card>
      <CardBoxDark>
        <MainLinks>
          <FullWidthLink to="/drinks">Browse Drinks</FullWidthLink>
          <FullWidthLink to="/favorites">Favorites</FullWidthLink>
          <Link to="/ingredients">Ingredients</Link>
          <BorderLeftLink to="/techniques">Techniques</BorderLeftLink>
        </MainLinks>
      </CardBoxDark>
      <CardBoxDark>
        <CardBoxHighlight>
          <TileRow drinks={featured} heading="Featured" imageMap={imageMap} />
          <TileRow
            drinks={recent}
            heading="New"
            imageMap={imageMap}
            className="home-tiles-recent"
          />
        </CardBoxHighlight>
      </CardBoxDark>
      <CardBoxDark>
        <TileLink to="/about">About</TileLink>
      </CardBoxDark>
      <HomeFooter
        content={`Banner photo by Adam${nbsp}Jaime`}
      />
    </Card>
  );
}
