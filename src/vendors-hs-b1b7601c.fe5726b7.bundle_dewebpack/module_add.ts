function add(value: number): number {
  const normalizedValue = value === 0 ? 0 : value;
  return m(this, normalizedValue, normalizedValue);
}