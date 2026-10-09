import React from 'react';
import styled from 'styled-components';

const RadioButton = styled.button`
  padding: var(--input-padding);
  border: var(--input-border);
  border-radius: 0;
  outline: 0;
  font-weight: 400;
  color: var(--gray-8);
  background-color: var(--gray-dark);
  cursor: pointer;
  box-shadow: 0 4px 4px hsla(315, 5%, 7%, 0.4);

  &:first-child {
    border-top-left-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);
  }

  &:last-child {
    border-top-right-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
  }

  &:hover {
    color: var(--brand-primary);
    color: var(--white);
    box-shadow: none;
  }

  &:focus {
    outline: var(--focus-outline);
  }

  &[disabled] {
    cursor: default;
    color: var(--brand-primary);
    background: hsl(315, 3.2%, 20%);
    box-shadow: none;
  }
`;

type Option = string | [string, string];

interface ButtonGroupProps {
  value: string;
  name?: string;
  options: Option[];
  onChange: (value: string) => void;
}

export default function ButtonGroup({ value, options, onChange }: ButtonGroupProps) {
  return (
    <div>
      {options.map((option) => {
        const [val, label] = Array.isArray(option) ? option : [option, option];
        return (
          <RadioButton
            key={val}
            disabled={value === val}
            onClick={(e) => {
              e.preventDefault();
              onChange(val);
            }}
          >
            {label}
          </RadioButton>
        );
      })}
    </div>
  );
}
