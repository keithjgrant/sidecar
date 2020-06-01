import React from 'react';
import styled from 'styled-components';

const Selections = styled.div`
  ${'' /*  */}
`;

export default function Question({ question, onAnswer }) {
  return (
    <div>
      <p>{question.prompt}</p>
      <Selections>
        {question.options.map(([value, label]) => (
          <button type="button" key={value} onClick={() => onAnswer(value)}>
            {label}
          </button>
        ))}
      </Selections>
    </div>
  );
}
