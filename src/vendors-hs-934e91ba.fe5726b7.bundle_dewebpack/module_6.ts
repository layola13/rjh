function getPluralCategory(count: number): number {
  if (count === 1) {
    return 0;
  }
  
  if (count >= 2 && count <= 4) {
    return 1;
  }
  
  return 2;
}

export default getPluralCategory;