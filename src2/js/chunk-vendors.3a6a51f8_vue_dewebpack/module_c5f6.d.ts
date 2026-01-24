/**
 * Number constructor polyfill for ES6+ numeric literals
 * Provides support for binary (0b), octal (0o), and proper parsing of numeric strings
 */

interface NumberConstructorPolyfill {
  (value?: unknown): number;
  new (value?: unknown): Number;
  readonly prototype: Number;
  readonly MAX_VALUE: number;
  readonly MIN_VALUE: number;
  readonly NaN: number;
  readonly NEGATIVE_INFINITY: number;
  readonly POSITIVE_INFINITY: number;
  readonly EPSILON: number;
  isFinite(value: unknown): boolean;
  isInteger(value: unknown): boolean;
  isNaN(value: unknown): boolean;
  isSafeInteger(value: unknown): boolean;
  readonly MAX_SAFE_INTEGER: number;
  readonly MIN_SAFE_INTEGER: number;
  parseFloat(value: string): number;
  parseInt(value: string, radix?: number): number;
}

const RADIX_BINARY = 2;
const RADIX_OCTAL = 8;
const RADIX_DECIMAL = 10;
const MAX_BINARY_DIGIT = 49; // '1'
const MAX_OCTAL_DIGIT = 55; // '7'

const CHAR_CODE_PLUS = 43;
const CHAR_CODE_MINUS = 45;
const CHAR_CODE_ZERO = 48;
const CHAR_CODE_UPPER_B = 66;
const CHAR_CODE_LOWER_B = 98;
const CHAR_CODE_UPPER_O = 79;
const CHAR_CODE_LOWER_O = 111;
const CHAR_CODE_UPPER_X = 88;
const CHAR_CODE_LOWER_X = 120;

const MIN_PARSEABLE_LENGTH = 2;

/**
 * Parse numeric string with support for ES6+ binary and octal literals
 * @param value - The value to parse
 * @returns Parsed number or NaN if invalid
 */
function parseNumericString(value: unknown): number {
  const primitive = toPrimitive(value, false);
  
  if (typeof primitive !== "string" || primitive.length <= MIN_PARSEABLE_LENGTH) {
    return Number(primitive);
  }

  const trimmed = hasNativeTrim ? primitive.trim() : customTrim(primitive, 3);
  const firstChar = trimmed.charCodeAt(0);

  // Handle signed hex literals (invalid: +0x1, -0x1)
  if (firstChar === CHAR_CODE_PLUS || firstChar === CHAR_CODE_MINUS) {
    const thirdChar = trimmed.charCodeAt(2);
    if (thirdChar === CHAR_CODE_UPPER_X || thirdChar === CHAR_CODE_LOWER_X) {
      return NaN;
    }
  } else if (firstChar === CHAR_CODE_ZERO) {
    const secondChar = trimmed.charCodeAt(1);
    let radix: number;
    let maxDigitCode: number;

    switch (secondChar) {
      case CHAR_CODE_UPPER_B:
      case CHAR_CODE_LOWER_B:
        radix = RADIX_BINARY;
        maxDigitCode = MAX_BINARY_DIGIT;
        break;
      case CHAR_CODE_UPPER_O:
      case CHAR_CODE_LOWER_O:
        radix = RADIX_OCTAL;
        maxDigitCode = MAX_OCTAL_DIGIT;
        break;
      default:
        return Number(trimmed);
    }

    const digits = trimmed.slice(2);
    for (let index = 0; index < digits.length; index++) {
      const digitCode = digits.charCodeAt(index);
      if (digitCode < CHAR_CODE_ZERO || digitCode > maxDigitCode) {
        return NaN;
      }
    }
    return parseInt(digits, radix);
  }

  return Number(trimmed);
}

// Import global objects and utilities
const global = globalThis as typeof globalThis & { Number: NumberConstructorPolyfill };
const hasOwnProperty = Object.prototype.hasOwnProperty;
const objectCreate = Object.create;
const getOwnPropertyNames = Object.getOwnPropertyNames;
const toPrimitive = (value: unknown, hint: boolean): unknown => {
  // Implementation from module 6a99
  return value;
};
const fails = (fn: () => void): boolean => {
  try {
    fn();
    return false;
  } catch {
    return true;
  }
};
const customTrim = (str: string, mode: number): string => {
  // Implementation from module aa77
  return str.trim();
};
const defineProperty = Object.defineProperty;
const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
const setPrototypeOf = Object.setPrototypeOf ?? ((obj: object, proto: object | null) => {
  (obj as { __proto__: unknown }).__proto__ = proto;
  return obj;
});

const NUMBER_CONSTRUCTOR_NAME = "Number";
const nativeNumber = global.Number;
const numberPrototype = nativeNumber.prototype;
const isNumberTag = Object.prototype.toString.call(objectCreate(numberPrototype)) === `[object ${NUMBER_CONSTRUCTOR_NAME}]`;
const hasNativeTrim = "trim" in String.prototype;
const descriptorSupported = typeof getOwnPropertyNames === "function";

const STATIC_PROPERTIES = [
  "MAX_VALUE", "MIN_VALUE", "NaN", "NEGATIVE_INFINITY", "POSITIVE_INFINITY",
  "EPSILON", "isFinite", "isInteger", "isNaN", "isSafeInteger",
  "MAX_SAFE_INTEGER", "MIN_SAFE_INTEGER", "parseFloat", "parseInt", "isInteger"
];

/**
 * Check if native Number constructor properly handles ES6+ literals
 */
const needsPolyfill = !nativeNumber(" 0o1" as unknown as number) ||
                      !nativeNumber("0b1" as unknown as number) ||
                      nativeNumber("+0x1" as unknown as number);

if (needsPolyfill) {
  const NumberPolyfill = function Number(this: Number | void, value?: unknown): number | Number {
    const numericValue = arguments.length < 1 ? 0 : value;
    const context = this;

    // Called as constructor with 'new'
    if (context instanceof NumberPolyfill) {
      const shouldWrap = isNumberTag 
        ? fails(() => numberPrototype.valueOf.call(context))
        : Object.prototype.toString.call(context) !== `[object ${NUMBER_CONSTRUCTOR_NAME}]`;

      if (shouldWrap) {
        return setPrototypeOf(new nativeNumber(parseNumericString(numericValue)), context, NumberPolyfill);
      }
    }

    // Called as function
    return parseNumericString(numericValue);
  } as unknown as NumberConstructorPolyfill;

  // Copy static properties from native Number
  const propertiesToCopy = descriptorSupported
    ? getOwnPropertyNames(nativeNumber)
    : STATIC_PROPERTIES;

  for (const propertyName of propertiesToCopy) {
    if (hasOwnProperty.call(nativeNumber, propertyName) && !hasOwnProperty.call(NumberPolyfill, propertyName)) {
      const descriptor = getOwnPropertyDescriptor(nativeNumber, propertyName);
      if (descriptor) {
        defineProperty(NumberPolyfill, propertyName, descriptor);
      }
    }
  }

  NumberPolyfill.prototype = numberPrototype;
  numberPrototype.constructor = NumberPolyfill;

  // Replace global Number constructor
  global.Number = NumberPolyfill;
}