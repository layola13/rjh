function moduleSet(element: unknown, value: unknown, options: unknown): unknown {
  return m(this, value === 0 ? 0 : value, options);
}