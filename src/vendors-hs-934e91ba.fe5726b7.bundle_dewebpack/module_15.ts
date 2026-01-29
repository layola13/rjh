function getPluralForm(count: number): number {
  return Number(
    count % 10 === 1 && count % 100 !== 11
      ? 0
      : count % 10 >= 2 && (count % 100 < 10 || count % 100 >= 20)
      ? 1
      : 2
  );
}

export { getPluralForm };