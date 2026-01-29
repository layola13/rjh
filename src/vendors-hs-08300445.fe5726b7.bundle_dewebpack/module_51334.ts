export default function getNestedProperty<T = unknown>(obj: unknown, path: string[]): T | undefined {
  let current: any = obj;
  
  for (let i = 0; i < path.length; i += 1) {
    if (current == null) {
      return undefined;
    }
    current = current[path[i]];
  }
  
  return current as T;
}