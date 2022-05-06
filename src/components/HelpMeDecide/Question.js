import React from 'react';
import styled from 'styled-components';

const Selections = styled.div`
  display: flex;
`;

const SelectionButton = styled.button`
  padding: 1rem;
  border: var(--input-border);
  border-radius: 0;
  outline: 0;
  font-weight: 400;
  color: var(--gray-8);
  background-color: var(--gray-dark);
  cursor: pointer;
  box-shadow: 0 4px 4px hsla(315, 5%, 7%, 0.4);
  flex: 1 0 0;

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

  ${(props) =>
    props.isSelected
      ? `
    && {color: var(--brand-primary); }
  `
      : ''}
`;

export default function Question({ question, selectedAnswer, onAnswer }) {
  return (
    <div>
      <p>{question.prompt}</p>
      <Selections>
        {question.options.map(([value, label]) => (
          <SelectionButton
            type="button"
            key={value}
            isSelected={selectedAnswer === value}
            onClick={() => onAnswer(value)}
          >
            {label}
          </SelectionButton>
        ))}
      </Selections>
    </div>
  );
}
