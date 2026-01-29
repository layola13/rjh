function get<T = unknown>(obj: Record<string, unknown> | undefined | null, path: string | string[]): T | undefined {
  if (!obj) {
    return undefined;
  }
  
  const value = o(obj, path);
  return value?.value as T | undefined;
}

export { get };