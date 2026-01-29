import deburr from './deburr';
import words from './words';
import toString from './toString';

const APOSTROPHE_REGEX = /['']/g;

export default function createCompounder(callback: (result: string, word: string, index: number) => string) {
  return function(value: string): string {
    const stringValue = toString(value);
    const normalizedValue = stringValue.replace(APOSTROPHE_REGEX, '');
    const wordArray = words(normalizedValue);
    const deburriedWords = deburr(wordArray);
    
    return callback(deburriedWords, '', 0);
  };
}