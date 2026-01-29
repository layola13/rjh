/**
 * Repeats a string a specified number of times.
 * @param count - The number of times to repeat the string
 * @returns The repeated string
 * @throws {RangeError} If count is negative or infinite
 */
export function repeatString(count: unknown): string {
  const toIntegerOrInfinity = (value: unknown): number => {
    const number = Number(value);
    return isNaN(number) ? 0 : number === 0 ? 0 : Math.trunc(number);
  };

  const toString = (value: unknown): string => {
    return value == null ? '' : String(value);
  };

  const requireObjectCoercible = (value: unknown): unknown => {
    if (value == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }
    return value;
  };

  const thisValue = toString(requireObjectCoercible(this));
  let result = '';
  let repetitions = toIntegerOrInfinity(count);

  if (repetitions < 0 || repetitions === Infinity) {
    throw new RangeError('Wrong number of repetitions');
  }

  while (repetitions > 0) {
    if (repetitions & 1) {
      result += thisValue;
    }
    repetitions >>>= 1;
    if (repetitions > 0) {
      thisValue += thisValue;
    }
  }

  return result;
}