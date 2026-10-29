import styled from 'styled-components';

export const Indicator = styled.figure`
  margin: 0;
  text-align: center;

  & svg {
    display: revert;
    height: 25px;
  }
`;

export const Caption = styled.figcaption`
  text-align: center;
  text-transform: uppercase;
  color: var(--_tab-label-color);
  font-size: 0.7rem;
  letter-spacing: 0.02em;
`;
