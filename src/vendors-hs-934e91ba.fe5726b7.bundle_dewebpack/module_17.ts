function getPluralForm(count: number): number {
  return Number(
    count === 1 || (count % 10 === 1 && count % 100 !== 11) ? 0 : 1
  );
}

export { getPluralForm };