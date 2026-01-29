function get<T = unknown>(target: T, path: string | string[]): unknown {
  return A.get(target, path);
}

export default get;