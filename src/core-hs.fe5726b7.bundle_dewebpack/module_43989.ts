const globalThis = (typeof window !== 'undefined' ? window : global) as typeof window & typeof globalThis;

const WHITESPACE_WITH_ZERO_WIDTH = '-0';

function trimString(str: string): string {
  return str.trim();
}

function toString(value: unknown): string {
  if (value === null || value === undefined) {
    throw new TypeError('Cannot convert null or undefined to string');
  }
  return String(value);
}

function charAt(str: string, index: number): string {
  return str.charAt(index);
}

const nativeParseFloat = globalThis.parseFloat;
const SymbolIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : undefined;

function hasParseFloatBug(): boolean {
  const negativeZeroTest = 1 / nativeParseFloat(WHITESPACE_WITH_ZERO_WIDTH + '-0') !== -Infinity;
  
  if (SymbolIterator) {
    try {
      const iteratorObject = Object(SymbolIterator);
      nativeParseFloat(iteratorObject);
      return true;
    } catch {
      return negativeZeroTest;
    }
  }
  
  return negativeZeroTest;
}

const shouldPolyfill = hasParseFloatBug();

export const parseFloat: (value: unknown) => number = shouldPolyfill
  ? function parseFloatPolyfill(value: unknown): number {
      const stringValue = trimString(toString(value));
      const result = nativeParseFloat(stringValue);
      
      if (result === 0 && charAt(stringValue, 0) === '-') {
        return -0;
      }
      
      return result;
    }
  : nativeParseFloat;

export default parseFloat;