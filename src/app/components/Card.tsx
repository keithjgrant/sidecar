import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid var(--card-border);
  border-radius: var(--border-radius);
  padding: 1rem;
  margin-bottom: 1.2rem;
  color: var(--gray-8);

  & > * {
    margin: 0;
  }

  & > *:not(:first-child) {
    margin-top: 1rem;
  }
`;

export default Card;
