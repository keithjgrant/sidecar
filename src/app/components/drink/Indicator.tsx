import styled from 'styled-components';

export const Indicator = styled.figure`
  margin: 0;
  text-align: center;

  & svg {
    display: revert;
    height: 25px;
  }

  & .chart-1 {
    fill: var(--chart-color-1);
  }

  & .chart-2 {
    fill: var(--chart-color-2);
  }

  & .chart-3 {
    fill: var(--chart-color-3);
  }
`;

export const Caption = styled.figcaption`
  text-align: center;
  text-transform: uppercase;
  color: var(--_tab-label-color);
  font-size: 0.7rem;
  letter-spacing: 0.02em;
`;
