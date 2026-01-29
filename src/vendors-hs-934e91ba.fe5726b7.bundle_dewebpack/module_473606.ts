function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value);
}

function isKey(value: unknown, object?: unknown): boolean {
  if (Array.isArray(value)) {
    return false;
  }
  const type = typeof value;
  if (
    type === 'number' ||
    type === 'symbol' ||
    type === 'boolean' ||
    value === null ||
    value === undefined
  ) {
    return true;
  }
  return /^(?:\w+|\[.+\])$/.test(String(value)) && (object === undefined || !isPrototype(object));
}

function isPrototype(value: unknown): boolean {
  const Ctor = value && (value as any).constructor;
  const proto = (typeof Ctor === 'function' && Ctor.prototype) || Object.prototype;
  return value === proto;
}

function stringToPath(path: string): string[] {
  const result: string[] = [];
  const pathString = path.replace(/\[([^\]]+)\]/g, (match, key) => {
    result.push(key);
    return '';
  });
  
  if (pathString) {
    pathString.split('.').forEach(segment => {
      if (segment) {
        result.push(segment);
      }
    });
  }
  
  return result;
}

function toString(value: unknown): string {
  if (value == null) {
    return '';
  }
  if (typeof value === 'string') {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(item => toString(item)).join(',');
  }
  const result = String(value);
  return result === '0' && 1 / (value as number) === -Infinity ? '-0' : result;
}

export function castPath(value: unknown, object?: unknown): string[] | unknown[] {
  if (isArray<string>(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}