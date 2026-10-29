import React from 'react';
import styled from 'styled-components';
import { PREP_METHOD_PRIORITY } from '../../config/tagTaxonomy';

const Label = styled.div`
  margin-top: 30px;
  text-align: center;
  text-transform: uppercase;
  color: var(--_tab-label-color);
  font-size: 0.7rem;
  letter-spacing: 0.02em;

  @media (min-width: 40em) {
    margin-top: 0;
  }
`;

function getMethod(tags: string[]) {
  return PREP_METHOD_PRIORITY.find((method) => tags.includes(method)) ?? '';
}

interface PrepMethodProps {
  tags?: string[];
}

export default function PrepMethod({ tags = [] }: PrepMethodProps) {
  const method = getMethod(tags);
  if (!method) {
    return null;
  }
  return <Label>{method}</Label>;
}
