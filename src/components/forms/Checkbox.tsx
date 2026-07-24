import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  position: relative;
  display: flex;
  padding-left: 2em;
  cursor: pointer;

  & > label {
    cursor: pointer;
  }
`;

const Input = styled.input`
  background: var(--gray-dark);
  position: absolute;
  z-index: -1;
  opacity: 0;
`;

const Indicator = styled.div`
  position: absolute;
  left: 0;
  width: 20px;
  height: 20px;
  background: var(--gray-8);

  ${Label}:hover & {
    outline: 2px solid var(--white);
  }

  ${Input}:focus ~ & {
    outline: var(--focus-outline);
  }

  ${Input}:checked ~ & {
    background-color: var(--brand-primary);

    &::after {
      content: '';
      position: absolute;
      border: var(--gray-dark) 0 solid;
      border-width: 0 3px 3px 0;
      top: 0.05em;
      left: 0.4em;
      width: 0.25em;
      height: 0.8em;
      transform: rotate(40deg);
    }
  }
`;

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: React.ReactNode;
  className?: string;
}

export default function Checkbox({ id, checked, onChange, label, className }: CheckboxProps) {
  return (
    <Label className={className}>
      <Input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          onChange(e.target.checked);
        }}
      />
      <Indicator />
      {label}
    </Label>
  );
}
