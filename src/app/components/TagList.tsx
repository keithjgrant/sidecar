import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import AlphaIndex, { ALPHA_INDEX_GUTTER, LetterHeading } from './AlphaIndex';
import {
  groupByAlphaLetter,
  sectionIdForLetter,
  shouldUseAlphaIndex,
} from '../lib/alphaGroup';

const ID_PREFIX = 'alpha-tag';

const List = styled.ul`
  padding-left: 0;
  list-style: none;
`;

const AlphaList = styled.div`
  padding-right: ${ALPHA_INDEX_GUTTER};
`;

const LetterSection = styled.section`
  margin-bottom: 0.5em;
`;

const TagLink = styled(Link)`
  display: block;
  padding: 0.5em 1em;
  border: 1px solid var(--gray-4);
  text-decoration: none;
`;

interface TagListProps {
  tags: string[];
}

export default function TagList({ tags }: TagListProps) {
  if (!tags.length) {
    return null;
  }

  const sorted = [...tags].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: 'base' }),
  );
  const groups = groupByAlphaLetter(sorted, (tag) => tag);
  const letters = groups.map((group) => group.letter);
  const useAlpha = shouldUseAlphaIndex(sorted.length, letters.length);

  if (!useAlpha) {
    return (
      <List>
        {sorted.map((tag) => (
          <li key={tag}>
            <TagLink to={`/tags/${tag}`}>{tag}</TagLink>
          </li>
        ))}
      </List>
    );
  }

  return (
    <AlphaList>
      {groups.map(({ letter, items }) => (
        <LetterSection
          key={letter}
          id={sectionIdForLetter(ID_PREFIX, letter)}
        >
          <LetterHeading>{letter}</LetterHeading>
          <List>
            {items.map((tag) => (
              <li key={tag}>
                <TagLink to={`/tags/${tag}`}>{tag}</TagLink>
              </li>
            ))}
          </List>
        </LetterSection>
      ))}
      <AlphaIndex letters={letters} idPrefix={ID_PREFIX} />
    </AlphaList>
  );
}
