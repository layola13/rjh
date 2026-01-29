const toIntegerOrInfinity = (value: unknown): number => {
  if (typeof value === 'number') {
    return Math.trunc(value);
  }
  if (typeof value === 'string') {
    const num = Number(value);
    return isNaN(num) ? 0 : Math.trunc(num);
  }
  return 0;
};

const MAX_SAFE_INTEGER = 9007199254740991;

export function toLength(value: unknown): number {
  const integer = toIntegerOrInfinity(value);
  return integer > 0 ? Math.min(integer, MAX_SAFE_INTEGER) : 0;
}