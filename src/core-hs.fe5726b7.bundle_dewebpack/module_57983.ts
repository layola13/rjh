function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
}

function getClassName(value: unknown): string {
  return Object.prototype.toString.call(value).slice(8, -1);
}

const WELL_KNOWN_SYMBOL_MATCH = Symbol.match;

export function isRegExp(value: unknown): boolean {
  if (!isObject(value)) {
    return false;
  }

  const matchSymbol = (value as any)[WELL_KNOWN_SYMBOL_MATCH];
  
  if (matchSymbol !== undefined) {
    return !!matchSymbol;
  }
  
  return getClassName(value) === 'RegExp';
}