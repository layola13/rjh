const toInteger = (value: unknown): number => {
  const number = Number(value);
  if (Number.isNaN(number)) return 0;
  if (number === 0 || !Number.isFinite(number)) return number;
  return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
};

export default function clampIndexToLength(index: unknown, length: number): number {
  const integerIndex = toInteger(index);
  return integerIndex < 0 
    ? Math.max(integerIndex + length, 0) 
    : Math.min(integerIndex, length);
}