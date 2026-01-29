function moduleK<T = unknown>(e: string | number, t: string | number): unknown {
  const normalizedE = lt(e);
  const normalizedT = lt(t);
  return ut(normalizedE[normalizedT]);
}

function lt(value: string | number): any {
  // Implementation needed
  return value;
}

function ut(value: unknown): unknown {
  // Implementation needed
  return value;
}