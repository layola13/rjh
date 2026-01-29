type UnknownFunction = (...args: unknown[]) => unknown;

const IS_HTMLDDA: unknown = undefined;
const all: unknown = undefined;

export function isFunction(value: unknown): value is UnknownFunction {
  if (IS_HTMLDDA) {
    return typeof value === "function" || value === all;
  }
  return typeof value === "function";
}