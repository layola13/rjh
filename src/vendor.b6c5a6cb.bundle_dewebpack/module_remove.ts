interface DataCache {
  [key: string]: unknown;
}

interface CamelCaseUtil {
  camelCase(str: string): string;
  isEmptyObject(obj: unknown): boolean;
}

interface DataStorage {
  expando: string;
  remove(target: Node | Record<string, unknown>, keys?: string | string[]): void;
}

const EXPANDO_KEY = 'expando';

function remove(
  this: DataStorage,
  target: Node | Record<string, unknown>,
  keys?: string | string[]
): void {
  const cache = (target as Record<string, DataCache>)[this.expando];
  
  if (cache === undefined) {
    return;
  }

  if (keys !== undefined) {
    const normalizedKeys = Array.isArray(keys)
      ? keys.map((key) => camelCase(key))
      : camelCase(keys) in cache
        ? [camelCase(keys)]
        : matchKeys(keys) ?? [];

    let index = normalizedKeys.length;
    while (index--) {
      delete cache[normalizedKeys[index]];
    }
  }

  if (keys === undefined || isEmptyObject(cache)) {
    if (isNode(target)) {
      (target as Record<string, unknown>)[this.expando] = undefined;
    } else {
      delete (target as Record<string, unknown>)[this.expando];
    }
  }
}

function camelCase(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
}

function isEmptyObject(obj: unknown): boolean {
  if (obj === null || typeof obj !== 'object') {
    return true;
  }
  return Object.keys(obj).length === 0;
}

function matchKeys(str: string): string[] | null {
  return str.match(/\S+/g);
}

function isNode(target: unknown): target is Node {
  return target !== null && typeof target === 'object' && 'nodeType' in target;
}