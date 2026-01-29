type Callback = (() => void) | ((arg: any) => any);

function isFunction(value: unknown): value is Callback {
  return typeof value === "function";
}

export default function ensureFunction(callback: unknown): Callback {
  return isFunction(callback) ? callback : noop;
}

function noop(): void {}