export function safePropertyAccess<T extends object, K extends keyof T>(
  obj: T,
  key: K
): T[K] | undefined {
  if (key === "constructor" && typeof obj[key] === "function") {
    return undefined;
  }
  
  if (key === "__proto__") {
    return undefined;
  }
  
  return obj[key];
}