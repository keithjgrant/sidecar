import React, { useState } from 'react';
import {
  useBarFilteredDrinks,
  FILTER_DRINKS,
} from '../my-bar/useBarFilteredDrinks';
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
  const { drinks: candidateDrinks, isFiltering } = useBarFilteredDrinks(
    drinks,
    FILTER_DRINKS,
  );

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
          drinks={candidateDrinks}
          questions={questions}
          answers={answers}
          imageMap={imageMap}
          isFilteringByBar={isFiltering}
        />
      ) : null}
    </div>
  );
}
