function hasOwnProperty(obj: object, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function classNames(...args: unknown[]): string {
  let result = "";
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg) {
      result = appendClass(result, parseValue(arg));
    }
  }
  
  return result;
}

function parseValue(value: unknown): string {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }
  
  if (typeof value !== "object" || value === null) {
    return "";
  }
  
  if (Array.isArray(value)) {
    return classNames(...value);
  }
  
  const hasCustomToString = 
    (value as Record<string, unknown>).toString !== Object.prototype.toString &&
    !(value as Record<string, unknown>).toString.toString().includes("[native code]");
    
  if (hasCustomToString) {
    return (value as Record<string, unknown>).toString() as string;
  }
  
  let classes = "";
  for (const key in value as Record<string, unknown>) {
    if (hasOwnProperty(value as object, key) && (value as Record<string, boolean>)[key]) {
      classes = appendClass(classes, key);
    }
  }
  
  return classes;
}

function appendClass(baseClass: string, newClass: string): string {
  if (!newClass) {
    return baseClass;
  }
  
  if (!baseClass) {
    return newClass;
  }
  
  return baseClass + " " + newClass;
}

export default classNames;
export { classNames };