export function sign(value: number): number {
  return isNaN(value) || value === 0 ? value : value < 0 ? -1 : 1;
}