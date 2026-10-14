import styled from 'styled-components';

const TileLinkList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: var(--gap-size);
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
  list-style: none;

  > li > a {
    display: block;
    height: 100%;
    min-height: 5rem;
    padding: 1.2rem 1rem 1.6rem;
    border: 1px solid var(--card-border);
    border-radius: var(--border-radius);
    background-color: var(--card-bg);
    background-size: cover;
    font-family: var(--font-heading);
    font-size: 1.2rem;
    text-decoration: none;

    &[style*='image'] {
      color: var(--white);
      text-shadow: 0 0 4px var(--gray-3);
    }

    @media (min-width: 500px) {
      min-height: 8rem;
    }
  }

  @media (pointer: coarse) {
    grid-template-columns: initial;
    max-width: 100vw;
    overflow: auto;

    & > li {
      grid-row: 1;
      width: 40vw;
    }
  }
`;

export default TileLinkList;
