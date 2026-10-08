import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import AlphaIndex, { LetterHeading } from './AlphaIndex';
import { groupByAlphaLetter, sectionIdForLetter } from '../util/alphaGroup';

const ID_PREFIX = 'alpha-tag';

const List = styled.ul`
  padding-left: 0;
  list-style: none;
`;

const AlphaList = styled.div<{ $withIndex?: boolean }>`
  padding-right: ${(props) => (props.$withIndex ? '1.4em' : '0')};
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

  const groups = groupByAlphaLetter(tags, (tag) => tag);
  const letters = groups.map((group) => group.letter);
  const showIndex = letters.length >= 2;

  return (
    <AlphaList $withIndex={showIndex}>
      {groups.map(({ letter, items }) => (
        <LetterSection key={letter}>
          <LetterHeading id={sectionIdForLetter(ID_PREFIX, letter)}>
            {letter}
          </LetterHeading>
          <List>
            {items.map((tag) => (
              <li key={tag}>
                <TagLink to={`/tags/${tag}`}>{tag}</TagLink>
              </li>
            ))}
          </List>
        </LetterSection>
      ))}
      {showIndex ? <AlphaIndex letters={letters} idPrefix={ID_PREFIX} /> : null}
    </AlphaList>
  );
}
