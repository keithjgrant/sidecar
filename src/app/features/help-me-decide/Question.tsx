import React, { useEffect } from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby';
import type { QuestionDef } from './types';

const Selections = styled.div`
  display: flex;
`;

const SelectionButton = styled.button<{ $isSelected?: boolean }>`
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
    props.$isSelected
      ? `
    && {color: var(--brand-primary); }
  `
      : ''}
`;

interface QuestionProps {
  question: QuestionDef;
  selectedAnswer: string | null;
  onAnswer: (answer: string) => void;
}

export default function Question({ question, selectedAnswer, onAnswer }: QuestionProps) {
  useEffect(() => {
    const url = new URL(window.location.href);
    const answer = url.searchParams.get(question.key);
    if (answer) {
      onAnswer(answer);
    }
  }, []);

  return (
    <div>
      <p>...{question.prompt}</p>
      <Selections>
        {question.options.map(([value, label]) => (
          <SelectionButton
            type="button"
            key={value}
            $isSelected={selectedAnswer === value}
            onClick={() => {
              setUrlParam(question.key, value);
              onAnswer(value);
            }}
          >
            {label}
          </SelectionButton>
        ))}
      </Selections>
    </div>
  );
}

function setUrlParam(key: string, value: string): void {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  navigate(`${url.pathname}${url.search}`, { replace: true });
}
