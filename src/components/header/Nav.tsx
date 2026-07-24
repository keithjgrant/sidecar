import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const Navbar = styled.div`
  display: flex;
  flex-grow: 1;
  margin: 0;
  justify-content: center;

  > a {
    display: block;
    padding: 0.4rem 0.3rem;
    color: var(--gray-2);
    font-size: 0.8rem;
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: none;

    &:hover {
      color: var(--white);
    }
  }

  @media (min-width: 40em) {
    > a {
      padding: 0.5rem 0.8rem;
    }
  }
`;

export default function Nav() {
  return (
    <Navbar>
      <Link to="/drinks">Drinks</Link>
      <Link to="/tags">Tags</Link>
      <Link to="/ingredients">Ingredients</Link>
      <Link to="/techniques">Techniques</Link>
      <Link to="/about">About</Link>
    </Navbar>
  );
}
