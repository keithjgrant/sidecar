import styled from 'styled-components';

export const Indicator = styled.figure`
  margin: 0;
  text-align: center;

  & svg {
    height: 25px;
  }
`;

export const Caption = styled.figcaption`
  text-align: center;
  text-transform: uppercase;
  color: var(--gray-8);
  font-size: 0.7rem;
  letter-spacing: 0.02em;
`;
