function convertValueToNumber(value: number): number {
  if (value === 1) {
    return 0;
  }
  
  if (value === 2) {
    return 1;
  }
  
  if (value !== 8 && value !== 11) {
    return 2;
  }
  
  return 3;
}

export { convertValueToNumber };