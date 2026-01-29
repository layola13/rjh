function getPluralForm(count: number): number {
  if (count === 1) {
    return 0;
  }
  
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  
  if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 10 || lastTwoDigits >= 20)) {
    return 1;
  }
  
  return 2;
}

export { getPluralForm };