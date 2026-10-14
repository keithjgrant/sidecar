import type { Drink } from '../../types';

export interface DecideDrink extends Drink {
  html?: string;
  family?: string;
  score?: number;
}

export interface ScoredDecideDrink extends DecideDrink {
  score: number;
}

export interface QuestionDef {
  key: string;
  prompt: string;
  options: [string, string][];
  score: (drinks: DecideDrink[], answer: string) => ScoredDecideDrink[];
}
