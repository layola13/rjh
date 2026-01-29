export function getKeyValue<T = any>(obj: any, path: string | string[]): T | undefined {
  let pathArray = path;
  if (typeof path === "string") {
    pathArray = path.split(".");
  }
  
  let current = obj;
  for (let i = 0; i < (pathArray as string[]).length; i++) {
    const key = (pathArray as string[])[i];
    if (!current[key]) {
      return undefined;
    }
    current = current[key];
  }
  
  return current;
}

export function deleteKey(obj: any, path: string | string[]): void {
  let pathArray = path;
  if (typeof path === "string") {
    pathArray = path.split(".");
  }
  
  let current = obj;
  for (let i = 0; i < (pathArray as string[]).length - 1; i++) {
    const key = (pathArray as string[])[i];
    if (!current[key]) {
      delete current[key];
      return;
    }
    current = current[key];
  }
  
  delete current[(pathArray as string[])[(pathArray as string[]).length - 1]];
}

export function setKeyValue(obj: any, path: string, value: any): void {
  const pathArray = path.split(".");
  let current = obj;
  
  for (let i = 0; i < pathArray.length - 1; i++) {
    const key = pathArray[i];
    if (!current[key] || !(current[key] instanceof Object)) {
      current[key] = {};
    }
    current = current[key];
  }
  
  current[pathArray[pathArray.length - 1]] = value;
}

export function copyObject<T extends Record<string, any>>(
  source: T | null | undefined,
  keys: string[]
): Partial<T> {
  if (!source) {
    return {};
  }
  
  return keys.reduce((result, key) => {
    result[key] = source[key];
    return result;
  }, {} as any);
}