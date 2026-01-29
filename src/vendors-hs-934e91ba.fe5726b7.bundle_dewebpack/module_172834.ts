const objectPrototype = Object.prototype;

export function isPrototype(value: unknown): boolean {
  if (value == null) {
    return false;
  }
  
  const constructor = (value as any).constructor;
  const prototype = typeof constructor === "function" ? constructor.prototype : objectPrototype;
  
  return value === prototype;
}