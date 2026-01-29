function pluralForm(count: number): number {
  const remainder = count % 100;
  
  if (remainder === 1) {
    return 1;
  }
  
  if (remainder === 2) {
    return 2;
  }
  
  if (remainder === 3 || remainder === 4) {
    return 3;
  }
  
  return 0;
}

export default pluralForm;