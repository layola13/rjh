export function toInteger(value: unknown): number {
  const numericValue = +value;
  return numericValue !== numericValue || numericValue === 0 ? 0 : Math.trunc(numericValue);
}