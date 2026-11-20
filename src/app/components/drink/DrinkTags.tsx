import React, { useState } from 'react';
import { Link } from 'gatsby';
import { getTagKind } from '../../config/tagTaxonomy';

interface DrinkTagsProps {
  tags?: string[];
}

export default function DrinkTags({ tags = [] }: DrinkTagsProps) {
  const showToggle = tags.length > 5;
  const [isExpanded, setIsExpanded] = useState(!showToggle);
  const shownTags = isExpanded ? tags : tags.slice(0, 4);
  return (
    <ul className="drink-tags">
      {shownTags.map((tag) => (
        <li key={tag} data-tag-type={getTagKind(tag)}>
          <Link to={`/tags/${tag}`}>{tag}</Link>
        </li>
      ))}
      {showToggle && (
        <li>
          <button
            className="drink-tags__toggle"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded
              ? 'Show less'
              : `${tags.length - shownTags.length} more…`}
          </button>
        </li>
      )}
    </ul>
  );
}
