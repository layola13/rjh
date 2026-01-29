function get<T = unknown>(path: string, options?: RequestInit): Promise<T> {
  return e.get<T>(path, options);
}

export default get;