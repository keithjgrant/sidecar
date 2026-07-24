import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const List = styled.ul`
  padding-left: 0;
  list-style: none;
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
  return (
    <List>
      {tags.map((tag) => {
        return (
          <li key={tag}>
            <TagLink to={`/tags/${tag}`}>{tag}</TagLink>
          </li>
        );
      })}
    </List>
  );
}
