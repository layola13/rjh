export function isPrototype(value: unknown): boolean {
  const objectPrototype = Object.prototype;
  const constructor = value && (value as Record<string, unknown>).constructor;
  const prototype = typeof constructor === "function" && constructor.prototype || objectPrototype;
  return value === prototype;
}