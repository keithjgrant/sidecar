import styled, { css } from 'styled-components';

const PageHeading = styled.h1<{ bleed?: boolean }>`
  align-self: stretch;
  text-align: left;
  font-size: 2rem;
  color: var(--gray-8);

  ${(props) =>
    !props.bleed &&
    css`
      padding-right: 1rem;
      padding-left: 1rem;
    `}
`;

export default PageHeading;

const BrowserHeading = styled(PageHeading)`
  @media (display-mode: standalone) {
    display: none;
  }
`;

export { BrowserHeading };
