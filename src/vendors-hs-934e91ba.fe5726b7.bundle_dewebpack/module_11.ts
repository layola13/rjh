function getPluralFormIndex(count: number): number {
  return Number(
    count === 1 || count === 11
      ? 0
      : count === 2 || count === 12
      ? 1
      : count > 2 && count < 20
      ? 2
      : 3
  );
}

export default getPluralFormIndex;