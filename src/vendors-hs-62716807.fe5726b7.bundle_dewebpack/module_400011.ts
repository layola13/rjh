function toIntegerOrInfinity(value: unknown): number {
  const number = Number(value);
  
  if (Number.isNaN(number)) {
    return 0;
  }
  
  if (number === 0 || !Number.isFinite(number)) {
    return number;
  }
  
  return Math.trunc(number);
}

function toAbsoluteIndex(index: number, length: number): number {
  const integerIndex = toIntegerOrInfinity(index);
  return integerIndex < 0 
    ? Math.max(integerIndex + length, 0) 
    : Math.min(integerIndex, length);
}

export default toAbsoluteIndex;