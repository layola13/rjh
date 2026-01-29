export function isPrototype(value: unknown): boolean {
  const objectPrototype = Object.prototype;
  const valueConstructor = (value as any)?.constructor;
  
  return value === (
    typeof valueConstructor === "function" 
      ? valueConstructor.prototype 
      : objectPrototype
  );
}