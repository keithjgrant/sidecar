import { useState } from 'react';
import lightOrDark from './questions/lightOrDark';
import sweetOrStiff from './questions/sweetOrStiff';
import refreshingOrIntense from './questions/refreshingOrIntense';
import simpleOrElaborate from './questions/simpleOrElaborate';
import boozyOrMild from './questions/boozyOrMild';

export default function useQuestions() {
  return [boozyOrMild, simpleOrElaborate];
}
