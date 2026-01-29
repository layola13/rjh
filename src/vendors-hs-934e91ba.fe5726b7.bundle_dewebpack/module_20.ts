function getPluralFormIndex(count: number): number {
  return Number(
    1 === count 
      ? 0 
      : 0 === count || (count % 100 > 0 && count % 100 < 20) 
        ? 1 
        : 2
  );
}

export default getPluralFormIndex;