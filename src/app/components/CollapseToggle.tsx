import React from 'react';
import styled, { css } from 'styled-components';

const Toggle = styled.button<{ $isExpanded: boolean }>`
  position: relative;
  padding-right: 1.8em !important;

  &::after {
    content: '';
    position: absolute;
    top: 0.6em;
    right: 0.6em;
    border: 0.4em solid transparent;
    border-left-color: currentColor;
    transform-origin: 0.2em center;
    transition: transform 0.2s var(--ease-out-cubic, ease);
  }

  ${(props) =>
    props.$isExpanded &&
    css`
      &::after {
        transform: rotate(90deg);
      }
    `}
`;

type CollapseToggleProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'type'
> & {
  isExpanded: boolean;
};

/** Orange `.button` control with a right chevron that rotates down when open. */
export default function CollapseToggle({
  isExpanded,
  children,
  className,
  ...rest
}: CollapseToggleProps) {
  return (
    <Toggle
      type="button"
      $isExpanded={isExpanded}
      aria-expanded={isExpanded}
      className={['button', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </Toggle>
  );
}
