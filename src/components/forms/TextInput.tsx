import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  max-width: 20em;
  padding: var(--input-padding);
  border: var(--input-border);
  border-radius: var(--border-radius);
  outline: 0;
  font-weight: 400;
  color: var(--gray-8);
  background-color: var(--gray-dark);

  &:hover {
    color: var(--white);
  }

  &:focus {
    outline: var(--focus-outline);
  }

  &::placeholder {
    color: var(--gray-7);
  }
`;

interface TextInputProps {
  id?: string;
  name?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function TextInput({
  id,
  name,
  value,
  placeholder,
  onChange,
}: TextInputProps) {
  return (
    <Input
      id={id}
      name={name}
      type="search"
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
