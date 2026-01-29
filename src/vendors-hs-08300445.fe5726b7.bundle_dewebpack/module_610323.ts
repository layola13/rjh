export function dontSetMe(obj: Record<string, unknown>, prop: string, componentName: string): Error | undefined {
  if (obj[prop]) {
    return new Error(`Invalid prop ${prop} passed to ${componentName} - do not set this, set it on the child.`);
  }
}

export function findInArray<T>(array: T[], callback: (item: T, index: number, arr: T[]) => boolean): T | undefined {
  for (let i = 0, length = array.length; i < length; i++) {
    if (callback(array[i], i, array)) {
      return array[i];
    }
  }
}

export function int(value: string): number {
  return parseInt(value, 10);
}

export function isFunction(value: unknown): value is Function {
  return typeof value === "function" || Object.prototype.toString.call(value) === "[object Function]";
}

export function isNum(value: unknown): value is number {
  return typeof value === "number" && !isNaN(value);
}