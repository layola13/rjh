function get<T = unknown>(obj: T, path: string | string[]): unknown {
  return obj?.[path as keyof T];
}