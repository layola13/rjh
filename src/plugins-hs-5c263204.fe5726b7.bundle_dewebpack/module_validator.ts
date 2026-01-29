function numberValidator(value: unknown): boolean {
  return typeof value === 'number' && !isNaN(value);
}

export { numberValidator };