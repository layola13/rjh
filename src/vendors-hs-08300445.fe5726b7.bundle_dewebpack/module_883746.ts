export default function omit<T extends Record<string, unknown>>(
  obj: T,
  keys: string[]
): Partial<T> {
  const result = Object.assign({}, obj);
  
  if (Array.isArray(keys)) {
    keys.forEach((key) => {
      delete result[key];
    });
  }
  
  return result;
}