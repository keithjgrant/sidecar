import React from 'react';
import { Link } from 'gatsby';

export default function Results({ drinks, imageMap }) {
  const sorted = Object.values(drinks).sort(byScore);
  return (
    <ul>
      {sorted.map((drink) => (
        <li key={drink.path}>
          <Link to={drink.path}>
            {drink.title} ({drink.score})
          </Link>
        </li>
      ))}
    </ul>
  );
}

function byScore(a, b) {
  if (a.score > b.score) {
    return -1;
  }
  if (a.score < b.score) {
    return 1;
  }
  if (a.score === b.score) {
    return 0;
  }
}
