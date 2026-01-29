import deburr from './module_673184';
import toString from './module_472123';

const LATIN_CHARACTERS = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
const COMBINING_DIACRITICAL_MARKS = /[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]/g;

/**
 * Converts a string by removing diacritical marks from Latin characters.
 * 
 * @param value - The string to convert
 * @returns The converted string with diacritical marks removed
 */
export default function removeDiacritics(value: string): string {
  const stringValue = toString(value);
  return stringValue
    .replace(LATIN_CHARACTERS, deburr)
    .replace(COMBINING_DIACRITICAL_MARKS, '');
}