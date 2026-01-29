function moduleOne<T>(
  context: T,
  arg1: unknown,
  arg2: unknown,
  arg3: unknown,
  arg4: unknown
): unknown {
  return Ct(this, context, arg1, arg2, arg3, arg4, 1);
}