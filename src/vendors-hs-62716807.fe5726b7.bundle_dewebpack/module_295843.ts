interface TypeofResult {
  (value: unknown): string;
}

function isArray(value: unknown): value is unknown[] {
  return "[object Array]" === Object.prototype.toString.call(value);
}

function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object";
}

function isFunction(value: unknown): value is Function {
  return "[object Function]" === Object.prototype.toString.call(value);
}

function isArrayBuffer(value: unknown): value is ArrayBuffer {
  return "[object ArrayBuffer]" === Object.prototype.toString.call(value);
}

function isBuffer(value: unknown): boolean {
  return (
    value !== null &&
    !isUndefined(value) &&
    (value as any).constructor !== null &&
    !(value as any).constructor === undefined &&
    typeof (value as any).constructor.isBuffer === "function" &&
    (value as any).constructor.isBuffer(value)
  );
}

function isFormData(value: unknown): value is FormData {
  return typeof FormData !== "undefined" && value instanceof FormData;
}

function isArrayBufferView(value: unknown): value is ArrayBufferView {
  return typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView
    ? ArrayBuffer.isView(value)
    : !!(value && (value as any).buffer && (value as any).buffer instanceof ArrayBuffer);
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

function isDate(value: unknown): value is Date {
  return "[object Date]" === Object.prototype.toString.call(value);
}

function isFile(value: unknown): value is File {
  return "[object File]" === Object.prototype.toString.call(value);
}

function isBlob(value: unknown): value is Blob {
  return "[object Blob]" === Object.prototype.toString.call(value);
}

function isStream(value: unknown): boolean {
  return isObject(value) && isFunction((value as any).pipe);
}

function isURLSearchParams(value: unknown): value is URLSearchParams {
  return typeof URLSearchParams !== "undefined" && value instanceof URLSearchParams;
}

function isStandardBrowserEnv(): boolean {
  return (
    (typeof navigator === "undefined" ||
      (navigator.product !== "ReactNative" &&
        navigator.product !== "NativeScript" &&
        navigator.product !== "NS")) &&
    typeof window !== "undefined" &&
    typeof document !== "undefined"
  );
}

type ForEachCallback<T> = (value: T, key: string | number, collection: T[] | Record<string, T>) => void;

function forEach<T>(
  collection: T[] | Record<string, T> | null | undefined,
  callback: ForEachCallback<T>
): void {
  if (collection == null) return;

  if (typeof collection !== "object" || isArray(collection)) {
    const array = isArray(collection) ? collection : [collection as T];
    for (let i = 0, length = array.length; i < length; i++) {
      callback.call(null, array[i], i, array);
    }
  } else {
    for (const key in collection) {
      if (Object.prototype.hasOwnProperty.call(collection, key)) {
        callback.call(null, collection[key], key, collection);
      }
    }
  }
}

function merge<T extends Record<string, any>>(...sources: Array<Partial<T> | null | undefined>): T {
  const result: Record<string, any> = {};

  function assignValue(value: any, key: string): void {
    if (typeof result[key] === "object" && typeof value === "object") {
      result[key] = merge(result[key], value);
    } else {
      result[key] = value;
    }
  }

  for (let i = 0, length = sources.length; i < length; i++) {
    forEach(sources[i] as any, assignValue);
  }

  return result as T;
}

function deepMerge<T extends Record<string, any>>(...sources: Array<Partial<T> | null | undefined>): T {
  const result: Record<string, any> = {};

  function assignValue(value: any, key: string): void {
    if (typeof result[key] === "object" && typeof value === "object") {
      result[key] = deepMerge(result[key], value);
    } else if (typeof value === "object") {
      result[key] = deepMerge({}, value);
    } else {
      result[key] = value;
    }
  }

  for (let i = 0, length = sources.length; i < length; i++) {
    forEach(sources[i] as any, assignValue);
  }

  return result as T;
}

function extend<T extends Record<string, any>, S extends Record<string, any>>(
  target: T,
  source: S,
  thisArg?: any
): T & S {
  forEach(source, (value: any, key: string) => {
    (target as any)[key] = thisArg && typeof value === "function" ? value.bind(thisArg) : value;
  });

  return target as T & S;
}

function trim(str: string): string {
  return str.replace(/^\s*/, "").replace(/\s*$/, "");
}

export {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isObject,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isFunction,
  isStream,
  isURLSearchParams,
  isStandardBrowserEnv,
  forEach,
  merge,
  deepMerge,
  extend,
  trim
};