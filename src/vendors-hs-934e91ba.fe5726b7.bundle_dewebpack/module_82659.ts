import trimString from './module_37331';
import isObject from './module_877916';
import isSymbol from './module_96835';

const HEX_PATTERN = /^[-+]0x[0-9a-f]+$/i;
const BINARY_PATTERN = /^0b[01]+$/i;
const OCTAL_PATTERN = /^0o[0-7]+$/i;

/**
 * Converts a value to a number.
 * Handles objects with valueOf methods, symbols, and various number formats (hex, binary, octal).
 * 
 * @param value - The value to convert to a number
 * @returns The numeric representation of the value
 */
function toNumber(value: unknown): number {
  if (typeof value === 'number') {
    return value;
  }

  if (isSymbol(value)) {
    return NaN;
  }

  if (isObject(value)) {
    const primitive = typeof (value as any).valueOf === 'function' 
      ? (value as any).valueOf() 
      : value;
    value = isObject(primitive) ? `${primitive}` : primitive;
  }

  if (typeof value !== 'string') {
    return value === 0 ? value : +value;
  }

  const trimmedValue = trimString(value);
  const isBinary = BINARY_PATTERN.test(trimmedValue);

  if (isBinary || OCTAL_PATTERN.test(trimmedValue)) {
    const radix = isBinary ? 2 : 8;
    return parseInt(trimmedValue.slice(2), radix);
  }

  if (HEX_PATTERN.test(trimmedValue)) {
    return NaN;
  }

  return +trimmedValue;
}

export default toNumber;