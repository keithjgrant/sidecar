import React, { useState, useEffect } from 'react';
import useQuestions from './useQuestions';
import Question from './Question';
import Results from './Results';

export default function HelpMeDecide({ drinks, imageMap }) {
  const questions = useQuestions();
  const [answers, setAnswers] = useState([]);
  const questionNumber = answers.length;
  const nextQuestion = questions[questionNumber];

  if (nextQuestion) {
    return (
      <Question
        question={nextQuestion}
        onAnswer={(answer) => setAnswers(answers.concat(answer))}
      />
    );
  }
  const results = questions.reduce((acc, question, index) => {
    return question.score(drinks, answers[index]);
  }, drinks);
  return <Results drinks={results} imageMap={imageMap} />;
}
