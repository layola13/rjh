type ObjectOrFunction = object | Function;

function getTypeOf(value: unknown): string {
  return typeof value === 'object' && value !== null 
    ? 'object' 
    : typeof value;
}

function hasGetPrototypeOf(): boolean {
  return typeof Object.getPrototypeOf === 'function';
}

function hasProtoProperty(): boolean {
  return '__proto__' in Object.prototype;
}

function getProtoViaProperty(target: ObjectOrFunction): object | null {
  return (target as any).__proto__;
}

function getProtoViaObjectMethod(target: ObjectOrFunction): object | null {
  if (!target || (typeof target !== 'object' && typeof target !== 'function')) {
    throw new TypeError('getProto: not an object');
  }
  return getProtoViaProperty(target);
}

function getProtoViaReflect(target: ObjectOrFunction): object | null {
  return Reflect.getPrototypeOf(target as object);
}

const getProto: ((target: ObjectOrFunction) => object | null) | null = 
  hasGetPrototypeOf() 
    ? Object.getPrototypeOf
    : hasProtoProperty()
    ? getProtoViaObjectMethod
    : typeof Reflect !== 'undefined' && typeof Reflect.getPrototypeOf === 'function'
    ? getProtoViaReflect
    : null;

export default getProto;