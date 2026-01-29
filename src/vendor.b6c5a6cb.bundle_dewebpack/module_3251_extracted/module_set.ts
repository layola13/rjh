interface Cache {
  [key: string]: unknown;
}

interface CamelCaseUtility {
  camelCase(str: string): string;
}

declare const b: CamelCaseUtility;

function set(target: unknown, key: string | Record<string, unknown>, value?: unknown): Cache {
  const cache = this.cache(target);
  
  if (typeof key === "string") {
    cache[b.camelCase(key)] = value;
  } else {
    for (const prop in key) {
      cache[b.camelCase(prop)] = key[prop];
    }
  }
  
  return cache;
}