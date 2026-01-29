export default Object.assign || function<T extends object>(target: T, ...sources: Partial<T>[]): T {
  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key] as T[Extract<keyof T, string>];
      }
    }
  }
  return target;
};