import styled from 'styled-components';

/** Underlined text control used for select/clear actions. */
const TextButton = styled.button`
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--gray-6, #8a8588);
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 0.15em;

  &:hover {
    color: var(--white);
  }
`;

export default TextButton;
