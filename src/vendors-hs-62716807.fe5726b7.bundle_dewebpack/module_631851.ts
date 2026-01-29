export function getRenderPropValue<T>(value: T | (() => T) | null | undefined): T | null {
  if (!value) {
    return null;
  }
  
  if (typeof value === "function") {
    return (value as () => T)();
  }
  
  return value;
}