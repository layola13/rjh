function isArrayLike(value: unknown): boolean {
  return (
    value != null &&
    isLength((value as any).length) &&
    !isFunction(value)
  );
}

export default isArrayLike;