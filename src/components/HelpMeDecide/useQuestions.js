import { useState } from 'react';
import lightOrDark from './questions/lightOrDark';
import refreshingOrIntense from './questions/refreshingOrIntense';

export default function useQuestions() {
  return [lightOrDark];
}
