const hasOwnProperty = (obj: object, prop: string): boolean => {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};

const isPrototypeOf = (proto: object, obj: unknown): boolean => {
  return Object.prototype.isPrototypeOf.call(proto, obj);
};

const callRegExpPrototypeGetter = (regex: RegExp): string | undefined => {
  const descriptor = Object.getOwnPropertyDescriptor(RegExp.prototype, 'flags');
  return descriptor?.get?.call(regex);
};

const regExpPrototype = RegExp.prototype;

export function getRegExpFlags(regex: RegExp): string | undefined {
  const flags = regex.flags;
  
  if (
    flags !== undefined ||
    'flags' in regExpPrototype ||
    hasOwnProperty(regex, 'flags') ||
    !isPrototypeOf(regExpPrototype, regex)
  ) {
    return flags;
  }
  
  return callRegExpPrototypeGetter(regex);
}