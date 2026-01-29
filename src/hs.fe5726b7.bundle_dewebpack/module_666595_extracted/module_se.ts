function mergeStartAndEndChanges<T extends Record<string, unknown>>(
  t: T,
  n: unknown,
  i: unknown
): T & Record<string, unknown> {
  const startChanges = this._change.s.apply(this, arguments);
  const endChanges = this._change.e.apply(this, [t, n, i]);
  
  return Object.assign({}, startChanges, endChanges);
}