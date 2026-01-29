interface NumberConstructor {
  prototype: Number;
}

interface Number {
  toFixed(fractionDigits?: number): string;
}

const RANGE_ERROR_MESSAGE = "Incorrect fraction digits";
const MIN_FRACTION_DIGITS = 0;
const MAX_FRACTION_DIGITS = 20;
const SCIENTIFIC_NOTATION_THRESHOLD = 1e21;
const PRECISION_THRESHOLD = 1e-21;
const MANTISSA_BITS = 52;
const MANTISSA_MULTIPLIER = 4503599627370496;
const DECIMAL_BASE = 1e7;
const INITIAL_EXPONENT = 69;

function power(base: number, exponent: number, accumulator: number): number {
  if (exponent === 0) {
    return accumulator;
  }
  if (exponent % 2 === 1) {
    return power(base, exponent - 1, accumulator * base);
  }
  return power(base * base, exponent / 2, accumulator);
}

function multiply(digits: number[], multiplier: number, value: number): void {
  let carry = value;
  for (let index = 0; index < 6; index++) {
    carry += multiplier * digits[index];
    digits[index] = carry % DECIMAL_BASE;
    carry = Math.floor(carry / DECIMAL_BASE);
  }
}

function divide(digits: number[], divisor: number): void {
  let remainder = 0;
  for (let index = 5; index >= 0; index--) {
    remainder += digits[index];
    digits[index] = Math.floor(remainder / divisor);
    remainder = (remainder % divisor) * DECIMAL_BASE;
  }
}

function convertToString(digits: number[]): string {
  let result = "";
  for (let index = 5; index >= 0; index--) {
    if (result !== "" || index === 0 || digits[index] !== 0) {
      const segment = String(digits[index]);
      result = result === "" ? segment : result + "0".repeat(7 - segment.length) + segment;
    }
  }
  return result;
}

function toFixedPolyfill(fractionDigits: number): string {
  const value = Number(this);
  const digits = Math.floor(fractionDigits);
  const digitArray: number[] = [0, 0, 0, 0, 0, 0];
  let sign = "";
  let result = "0";

  if (digits < MIN_FRACTION_DIGITS || digits > MAX_FRACTION_DIGITS) {
    throw new RangeError(RANGE_ERROR_MESSAGE);
  }

  if (Number.isNaN(value)) {
    return "NaN";
  }

  if (value <= -SCIENTIFIC_NOTATION_THRESHOLD || value >= SCIENTIFIC_NOTATION_THRESHOLD) {
    return String(value);
  }

  let absValue = value;
  if (value < 0) {
    sign = "-";
    absValue = -value;
  }

  if (absValue > PRECISION_THRESHOLD) {
    const exponent = calculateExponent(absValue * power(2, INITIAL_EXPONENT, 1)) - INITIAL_EXPONENT;
    let mantissa = exponent < 0
      ? absValue * power(2, -exponent, 1)
      : absValue / power(2, exponent, 1);

    mantissa *= MANTISSA_MULTIPLIER;
    const bitsRemaining = MANTISSA_BITS - exponent;

    if (bitsRemaining > 0) {
      multiply(digitArray, 0, mantissa);
      
      let remainingDigits = digits;
      while (remainingDigits >= 7) {
        multiply(digitArray, DECIMAL_BASE, 0);
        remainingDigits -= 7;
      }
      multiply(digitArray, power(10, remainingDigits, 1), 0);

      let remainingBits = bitsRemaining - 1;
      while (remainingBits >= 23) {
        divide(digitArray, 1 << 23);
        remainingBits -= 23;
      }
      divide(digitArray, 1 << remainingBits);
      multiply(digitArray, 1, 1);
      divide(digitArray, 2);
      result = convertToString(digitArray);
    } else {
      multiply(digitArray, 0, mantissa);
      multiply(digitArray, 1 << -bitsRemaining, 0);
      result = convertToString(digitArray) + "0".repeat(digits);
    }
  }

  if (digits > 0) {
    const resultLength = result.length;
    if (resultLength <= digits) {
      return sign + "0." + "0".repeat(digits - resultLength) + result;
    }
    return sign + result.slice(0, resultLength - digits) + "." + result.slice(resultLength - digits);
  }

  return sign + result;
}

function calculateExponent(num: number): number {
  let exp = 0;
  let value = num;
  while (value >= 4096) {
    exp += 12;
    value /= 4096;
  }
  while (value >= 2) {
    exp += 1;
    value /= 2;
  }
  return exp;
}

if (typeof Number.prototype.toFixed !== 'function' || 
    (8e-5).toFixed(3) !== "0.000" ||
    (0.9).toFixed(0) !== "1" ||
    (1.255).toFixed(2) !== "1.25" ||
    (0xde0b6b3a7640080).toFixed(0) !== "1000000000000000128") {
  Number.prototype.toFixed = toFixedPolyfill;
}

export {};