export default function isNumeric(value: unknown): boolean {
  return !isNaN(parseFloat(value as string)) && isFinite(value as number);
}