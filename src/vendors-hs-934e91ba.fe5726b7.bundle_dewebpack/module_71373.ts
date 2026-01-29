type AnyFunction = (...args: unknown[]) => unknown;

const identity = <T>(value: T): T => value;

export function ensureFunction<T extends AnyFunction>(value: T | unknown): T | typeof identity {
  return typeof value === "function" ? value : identity;
}