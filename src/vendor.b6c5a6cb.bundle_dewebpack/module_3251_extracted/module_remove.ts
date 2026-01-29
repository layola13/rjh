interface DataCache {
  [key: string]: unknown;
}

interface CamelCaseUtility {
  camelCase(input: string): string;
  isEmptyObject(obj: Record<string, unknown>): boolean;
}

interface DataStorage {
  expando: string;
  remove(target: Node | Record<string, unknown>, keys?: string | string[]): void;
}

declare const b: CamelCaseUtility;
declare const z: RegExp;

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
      ? keys.map(b.camelCase)
      : (b.camelCase(keys) in cache ? [b.camelCase(keys)] : b.camelCase(keys).match(z) ?? []);

    let length = normalizedKeys.length;

    while (length--) {
      delete cache[normalizedKeys[length]];
    }
  }

  if (keys === undefined || b.isEmptyObject(cache)) {
    if ('nodeType' in target && target.nodeType) {
      (target as Record<string, unknown>)[this.expando] = undefined;
    } else {
      delete (target as Record<string, unknown>)[this.expando];
    }
  }
}