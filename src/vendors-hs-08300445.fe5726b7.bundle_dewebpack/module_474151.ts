export function getColumnsKey(columns: Array<{ key?: string; dataIndex?: string | string[] }>): string[] {
  const keys: string[] = [];
  const keySet: Record<string, boolean> = {};

  columns.forEach((column) => {
    const { key, dataIndex } = column || {};
    let generatedKey = key || toArray(dataIndex).join("-") || "RC_TABLE_KEY";

    while (keySet[generatedKey]) {
      generatedKey = `${generatedKey}_next`;
    }

    keySet[generatedKey] = true;
    keys.push(generatedKey);
  });

  return keys;
}

export function getPathValue<T = unknown>(
  record: Record<string, unknown>,
  path: string | string[] | number
): T | null {
  if (!path && typeof path !== "number") {
    return record as T;
  }

  const pathArray = toArray(path);
  let current: unknown = record;

  for (let i = 0; i < pathArray.length; i += 1) {
    if (!current) {
      return null;
    }
    current = (current as Record<string, unknown>)[pathArray[i]];
  }

  return current as T;
}

export function mergeObject<T extends Record<string, unknown>>(...objects: Array<Partial<T>>): T {
  const result: Record<string, unknown> = {};

  function deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): void {
    if (!source) {
      return;
    }

    Object.keys(source).forEach((key) => {
      const value = source[key];

      if (value && typeof value === "object" && !Array.isArray(value)) {
        target[key] = target[key] || {};
        deepMerge(target[key] as Record<string, unknown>, value as Record<string, unknown>);
      } else {
        target[key] = value;
      }
    });
  }

  objects.forEach((obj) => {
    deepMerge(result, obj as Record<string, unknown>);
  });

  return result as T;
}

export function validateValue(value: unknown): boolean {
  return value != null;
}

function toArray<T>(value: T | T[] | null | undefined): T[] {
  if (value == null) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}