function convertValue(input: number): number {
  if (input === 1) {
    return 0;
  }
  if (input === 2) {
    return 1;
  }
  if (input === 3) {
    return 2;
  }
  return 3;
}

export default convertValue;