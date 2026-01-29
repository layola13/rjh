export default function isPrototype(value: unknown): boolean {
  if (value == null) {
    return false;
  }
  
  const objectPrototype = Object.prototype;
  const Ctor = (value as any).constructor;
  
  return value === (typeof Ctor === 'function' && Ctor.prototype || objectPrototype);
}