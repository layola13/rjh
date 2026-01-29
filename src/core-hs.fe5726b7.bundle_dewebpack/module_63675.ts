function validateArgumentCount(actualCount: number, requiredCount: number): number {
  if (actualCount < requiredCount) {
    throw new TypeError("Not enough arguments");
  }
  return actualCount;
}

export default validateArgumentCount;