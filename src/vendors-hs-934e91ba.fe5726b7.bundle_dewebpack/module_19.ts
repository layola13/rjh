function getPluralForm(count: number): number {
  if (count === 1) {
    return 0;
  }
  
  if (count === 0 || (count % 100 > 1 && count % 100 < 11)) {
    return 1;
  }
  
  if (count % 100 > 10 && count % 100 < 20) {
    return 2;
  }
  
  return 3;
}

export { getPluralForm };