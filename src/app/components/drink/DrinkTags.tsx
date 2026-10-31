import React, { useState } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { getTagKind } from '../../config/tagTaxonomy';

const Tags = styled.ul`
  margin-block: -0.5em 0;
  padding-left: 0;
  list-style-type: none;

  > li {
    display: inline-block;
    margin-right: 0.5em;
  }

  > li + li {
    margin-top: 0.5em;
  }
`;

const Tag = styled.li`
  --_tag-color: var(--text-secondary);

  & > a,
  & > button {
    display: block;
    padding: 4px 6px;
    text-box: trim-both cap alphabetic;
    background: transparent;
    color: var(--_tag-color);
    font-family: inherit;
    font-weight: 400;
    font-size: 0.8rem;
    border-radius: var(--border-radius);
    border: 1px solid var(--_tag-color);
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: var(--white);
    }
  }

  &.tag--other {
    --_tag-color: var(--accent-cyan);
  }

  &.tag--spirit,
  &.tag--liqueur,
  &.tag--amaro {
    --_tag-color: var(--accent-orange);

    ~ .tag--other {
      --_tag-color: var(--text-secondary);
    }
  }
  &.tag--syrup,
  &.tag--flavor,
  &.tag--citrus {
    --_tag-color: var(--accent-indigo);
  }
`;

const Toggle = styled.button`
  && {
    border-radius: 0.2em;
    padding: 0.15em 0.3em;
    color: var(--gray-8);
  }
`;

interface DrinkTagsProps {
  tags?: string[];
}

export default function DrinkTags({ tags = [] }: DrinkTagsProps) {
  const showToggle = tags.length > 5;
  const [isExpanded, setIsExpanded] = useState(!showToggle);
  const shownTags = isExpanded ? tags : tags.slice(0, 4);
  return (
    <Tags>
      {shownTags.map((tag) => (
        <Tag key={tag} className={`tag--${getTagKind(tag)}`}>
          <Link to={`/tags/${tag}`}>{tag}</Link>
        </Tag>
      ))}
      {showToggle && (
        <Tag>
          <Toggle onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded
              ? 'Show less'
              : `${tags.length - shownTags.length} more…`}
          </Toggle>
        </Tag>
      )}
    </Tags>
  );
}
