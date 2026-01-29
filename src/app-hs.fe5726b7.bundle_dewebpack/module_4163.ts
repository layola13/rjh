function has(object: unknown, path: PropertyKey | PropertyKey[]): boolean {
  return object != null && hasPath(object, path, get);
}

export default has;