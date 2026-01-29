function categorizeValue(value: number): number {
  if (value === 1) {
    return 0;
  }
  
  if (value === 2) {
    return 1;
  }
  
  if (value < 7) {
    return 2;
  }
  
  if (value < 11) {
    return 3;
  }
  
  return 4;
}

export default categorizeValue;