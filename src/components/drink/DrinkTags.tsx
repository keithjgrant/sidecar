import React, { useState } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const Tags = styled.ul`
  margin: 0.5em -0.5em 0 0;
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
  & > a,
  & > button {
    position: relative;
    display: block;
    padding: 0.15em 0.3em 0.2em 1.4em;
    background: transparent;
    color: var(--brand-primary);
    font-family: inherit;
    font-weight: 400;
    font-size: 0.8rem;
    border-radius: 0.8em 0.2em 0.2em 0.8em;
    border: 1px solid var(--gray-6);
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: var(--white);
    }
  }

  & > a::before {
    position: absolute;
    content: '';
    left: 0.5em;
    top: 0.6em;
    border-radius: 50%;
    height: 4px;
    width: 4px;
    border: 1px solid var(--gray-6);
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
        <Tag key={tag}>
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
