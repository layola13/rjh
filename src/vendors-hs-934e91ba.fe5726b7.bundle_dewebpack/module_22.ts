function determineCategory(value: number): number {
  return Number(
    value === 1 
      ? 0 
      : value === 2 
      ? 1 
      : (value < 0 || value > 10) && value % 10 === 0 
      ? 2 
      : 3
  );
}

export default determineCategory;