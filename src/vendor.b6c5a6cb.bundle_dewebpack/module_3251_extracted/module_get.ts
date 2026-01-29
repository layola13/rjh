function get<T extends object>(target: T, key?: string): unknown {
  return key === undefined 
    ? this.cache(target) 
    : target[this.expando] && target[this.expando][camelCase(key)];
}