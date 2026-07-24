import React, { useState } from 'react';
import useQuestions from './useQuestions';
import Question from './Question';
import Results from './Results';
import type { DecideDrink } from './types';

interface HelpMeDecideProps {
  drinks: DecideDrink[];
  imageMap: Record<string, unknown>;
}

export default function HelpMeDecide({ drinks, imageMap }: HelpMeDecideProps) {
  const questions = useQuestions();
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (i: number) => {
    return (answer: string) => {
      if (answer === answers[i]) {
        return;
      }
      setAnswers([...answers.slice(0, i), answer, ...answers.slice(i + 1)]);
    };
  };

  return (
    <div>
      <p>Are you in the mood for something...</p>
      {questions.map((question, i) =>
        answers.length >= i ? (
          <Question
            key={`question-${i}`}
            question={question}
            selectedAnswer={answers[i] || null}
            onAnswer={handleAnswer(i)}
          />
        ) : null
      )}
      {answers.length >= questions.length ? (
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
