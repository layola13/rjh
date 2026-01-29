function getPluralCategory(value: number): number {
  if (value === 0) return 0;
  if (value === 1) return 1;
  if (value === 2) return 2;
  
  const mod100 = value % 100;
  
  if (mod100 >= 3 && mod100 <= 10) return 3;
  if (mod100 >= 11) return 4;
  
  return 5;
}