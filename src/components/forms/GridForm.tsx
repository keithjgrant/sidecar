import React from 'react';
import styled from 'styled-components';

const nbsp = '\u00A0';

const GridForm = styled.form`
  display: grid;
  grid-gap: var(--gap-size);
  align-items: baseline;

  @media (min-width: 650px) {
    grid-template-columns: min-content auto;
  }
`;

export default GridForm;

const Label = styled.label`
  @media (min-width: 650px) {
    text-align: right;
  }
`;

interface GridFormLabelProps {
  props?: React.LabelHTMLAttributes<HTMLLabelElement>;
  children: React.ReactNode;
}

export function GridFormLabel({ props, children }: GridFormLabelProps) {
  if (typeof children === 'string') {
    return <Label {...props}>{children.replace(' ', nbsp)}</Label>;
  }
  return <Label {...props}>{children}</Label>;
}
