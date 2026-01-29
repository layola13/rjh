function getPluralCategory(count: number): number {
  const mod10 = count % 10;
  const mod100 = count % 100;
  
  if (mod10 === 1 && mod100 !== 11) {
    return 0;
  }
  
  if (count !== 0) {
    return 1;
  }
  
  return 2;
}