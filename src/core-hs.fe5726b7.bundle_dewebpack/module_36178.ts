const WHITESPACE = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

const HEX_PREFIX_PATTERN = /^[+-]?0x/i;

/**
 * Trims whitespace from both ends of a string
 */
function trim(value: string): string {
  const whitespaceChars = WHITESPACE.split('');
  let start = 0;
  let end = value.length;
  
  while (start < end && whitespaceChars.includes(value[start])) {
    start++;
  }
  
  while (end > start && whitespaceChars.includes(value[end - 1])) {
    end--;
  }
  
  return value.slice(start, end);
}

/**
 * Converts a string to a primitive value
 */
function toPrimitive(value: unknown): string {
  if (value == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  return String(value);
}

/**
 * Checks if native parseInt has known bugs
 */
function hasParseIntBugs(): boolean {
  const nativeParseInt = globalThis.parseInt;
  const symbolIterator = Symbol?.iterator;
  
  // Check for octal parsing bug
  const OCTAL_BUG = 8 !== nativeParseInt(WHITESPACE + '08');
  
  // Check for hex parsing bug
  const HEX_BUG = 22 !== nativeParseInt(WHITESPACE + '0x16');
  
  // Check for Symbol.iterator handling
  let SYMBOL_BUG = false;
  if (symbolIterator) {
    try {
      nativeParseInt(Object(symbolIterator) as any);
    } catch {
      SYMBOL_BUG = true;
    }
  }
  
  return OCTAL_BUG || HEX_BUG || (symbolIterator !== undefined && !SYMBOL_BUG);
}

/**
 * Polyfill for parseInt that fixes known bugs in native implementation
 */
function polyfillParseInt(value: unknown, radix?: number): number {
  const stringValue = trim(toPrimitive(value));
  const normalizedRadix = radix >>> 0 || (HEX_PREFIX_PATTERN.test(stringValue) ? 16 : 10);
  return globalThis.parseInt(stringValue, normalizedRadix);
}

/**
 * Safe parseInt implementation that uses polyfill if native has bugs
 */
export const safeParseInt: (value: unknown, radix?: number) => number = 
  hasParseIntBugs() ? polyfillParseInt : globalThis.parseInt;