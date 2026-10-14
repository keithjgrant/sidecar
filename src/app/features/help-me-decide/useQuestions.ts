import { useState, useEffect } from 'react';
import {
  loadFromQuery,
  persistQuestionSelection,
  selectQuestions,
} from './questionSelection';
import type { QuestionDef } from './types';

export default function useQuestions(): QuestionDef[] {
  const [questions, setQuestions] = useState<QuestionDef[]>([]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const q = url.searchParams.get('q');
    if (q) {
      setQuestions(loadFromQuery(q));
      return;
    }

    const [selected, indexes] = selectQuestions();
    persistQuestionSelection(indexes);
    setQuestions(selected);
  }, []);

  return questions;
}
