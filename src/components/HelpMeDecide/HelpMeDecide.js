import React, { useState } from 'react';
import useQuestions from './useQuestions';
import Question from './Question';
import Results from './Results';

export default function HelpMeDecide({ drinks, imageMap }) {
  const questions = useQuestions();
  const [answers, setAnswers] = useState([]);

  // TODO make answers immutable
  return (
    <div>
      {questions.map((question, i) =>
        answers.length >= i ? (
          <Question
            key={`question-${i}`}
            question={question}
            onAnswer={(answer) => setAnswers(answers.concat(answer))}
          />
        ) : null
      )}
      {answers.length === questions.length ? (
        <Results
          drinks={drinks}
          questions={questions}
          answers={answers}
          imageMap={imageMap}
        />
      ) : null}
    </div>
  );
}
