export function toInteger(value: unknown): number {
  const num = Number(value);
  
  if (num !== num || num === 0) {
    return 0;
  }
  
  return Math.trunc(num);
}