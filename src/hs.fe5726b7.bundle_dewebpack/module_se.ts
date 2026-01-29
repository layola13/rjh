function moduleSeChange<T extends Record<string, unknown>>(
  target: T,
  name: string,
  index: number
): T {
  return Object.assign(
    {},
    this._change.s.apply(this, arguments),
    this._change.e.apply(this, [target, name, index])
  );
}