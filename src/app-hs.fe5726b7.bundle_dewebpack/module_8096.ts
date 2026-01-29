type Constructor<T = any> = new (...args: any[]) => T;

interface ObjectWithConstructor {
  constructor?: Constructor | Function;
}

function getPrototypeOf(obj: any): any {
  return Object.getPrototypeOf(obj);
}

function isPrototype(value: any): boolean {
  const Ctor = value?.constructor;
  const proto = (typeof Ctor === 'function' && Ctor.prototype) || Object.prototype;
  return value === proto;
}

function baseCreate(proto: any): Record<string, any> {
  if (!proto || typeof proto !== 'object') {
    return {};
  }
  return Object.create(proto);
}

export default function initCloneObject(obj: ObjectWithConstructor): Record<string, any> {
  if (typeof obj.constructor !== 'function' || isPrototype(obj)) {
    return {};
  }
  return baseCreate(getPrototypeOf(obj));
}