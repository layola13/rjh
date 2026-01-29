const IS_HTMLDDA: unknown = undefined; // This would need to be imported from the appropriate module

type Callable = ((...args: any[]) => any) | typeof IS_HTMLDDA;

export function isFunction(value: unknown): value is Function {
  if (IS_HTMLDDA !== undefined) {
    return typeof value === "function" || value === IS_HTMLDDA;
  }
  return typeof value === "function";
}