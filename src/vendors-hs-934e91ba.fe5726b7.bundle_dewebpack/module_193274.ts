import deburr from './deburr';
import hasUnicodeWord from './hasUnicodeWord';
import unicodeWords from './unicodeWords';
import asciiWords from './asciiWords';

export function words(str: string, pattern?: RegExp): string[] {
  const normalizedStr = toString(str);
  const finalPattern = pattern === undefined ? undefined : pattern;
  
  if (finalPattern === undefined) {
    return hasUnicodeWord(normalizedStr) 
      ? unicodeWords(normalizedStr) 
      : asciiWords(normalizedStr);
  }
  
  return normalizedStr.match(finalPattern) || [];
}

function toString(value: unknown): string {
  if (value == null) {
    return '';
  }
  if (typeof value === 'string') {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(toString).join(',');
  }
  const result = String(value);
  return (result === '0' && (1 / (value as number)) === -Infinity) ? '-0' : result;
}