import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  color: var(--gray-8);

  &:hover {
    color: var(--white);
  }

  &:focus-within {
    outline: var(--focus-outline);
  }
`;

const StyledSelect = styled.select`
  padding: var(--input-padding);
  padding-right: 1.5em;
  border: var(--input-border);
  border-radius: var(--border-radius);
  outline: 0;
  font-weight: 400;
  color: inherit;
  background-color: var(--gray-dark);
  cursor: pointer;
  appearance: none;
`;

const Arrow = styled.div`
  position: absolute;
  top: 0.8em;
  right: 0.5em;
  width: 0;
  height: 0;
  pointer-events: none;
  border-width: 0.4em 0.4em 0 0.4em;
  border-style: solid;
  border-color: var(--gray-7) transparent transparent transparent;

  ${Container}:hover > & {
    border-top-color: var(--brand-primary);
  }
`;

interface SelectProps {
  id?: string;
  name?: string;
  className?: string;
  value: string;
  options: [string, string][];
  onChange: (value: string) => void;
}

export default function Select({
  id,
  name,
  className,
  value,
  options,
  onChange,
}: SelectProps) {
  return (
    <Container className={className}>
      <StyledSelect
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </StyledSelect>
      <Arrow />
    </Container>
  );
}
