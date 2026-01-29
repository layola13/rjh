export function getKeyValue<T = any>(obj: Record<string, any>, path: string | string[]): T | undefined {
  let keys = path;
  if (typeof path === "string") {
    keys = path.split(".");
  }
  
  let current: any = obj;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (!current[key]) {
      return undefined;
    }
    current = current[key];
  }
  
  return current;
}

export function deleteKey(obj: Record<string, any>, path: string | string[]): void {
  let keys = path;
  if (typeof path === "string") {
    keys = path.split(".");
  }
  
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key]) {
      delete current[key];
      return;
    }
    current = current[key];
  }
  
  delete current[keys[keys.length - 1]];
}

export function setKeyValue(obj: Record<string, any>, path: string, value: any): void {
  const keys = path.split(".");
  let current = obj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key] || !(current[key] instanceof Object)) {
      current[key] = {};
    }
    current = current[key];
  }
  
  current[keys[keys.length - 1]] = value;
}

export function copyObject<T extends Record<string, any>>(
  source: T | null | undefined,
  keysToSelect: string[]
): Partial<T> {
  if (!source) {
    return {};
  }
  
  return keysToSelect.reduce((result, key) => {
    result[key] = source[key];
    return result;
  }, {} as Record<string, any>);
}