function mergeChanges<T extends object>(
  t: T,
  n: unknown,
  i: unknown
): T & object {
  return Object.assign(
    {},
    this._change.s.apply(this, arguments),
    this._change.w.apply(this, [t, n, i])
  );
}