interface AnyObject {
  [key: string]: any;
}

type ForEachCallback<T = any> = (value: T, key: string | number, collection: T[] | AnyObject) => void;

const objectPrototypeToString = Object.prototype.toString;

function isArray(value: any): value is any[] {
  return objectPrototypeToString.call(value) === "[object Array]";
}

function isUndefined(value: any): value is undefined {
  return value === undefined;
}

function isObject(value: any): value is object {
  return value !== null && typeof value === "object";
}

function isFunction(value: any): value is Function {
  return objectPrototypeToString.call(value) === "[object Function]";
}

function forEach<T = any>(collection: T[] | AnyObject | null | undefined, callback: ForEachCallback<T>): void {
  if (collection == null) {
    return;
  }

  let target: T[] | AnyObject = collection;
  
  if (typeof collection !== "object") {
    target = [collection] as any;
  }

  if (isArray(target)) {
    for (let index = 0, length = target.length; index < length; index++) {
      callback.call(null, target[index], index, target);
    }
  } else {
    for (const key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        callback.call(null, target[key], key, target);
      }
    }
  }
}

function isArrayBuffer(value: any): value is ArrayBuffer {
  return objectPrototypeToString.call(value) === "[object ArrayBuffer]";
}

function isBuffer(value: any): boolean {
  return (
    value !== null &&
    !isUndefined(value) &&
    value.constructor !== null &&
    !isUndefined(value.constructor) &&
    typeof value.constructor.isBuffer === "function" &&
    value.constructor.isBuffer(value)
  );
}

function isFormData(value: any): value is FormData {
  return typeof FormData !== "undefined" && value instanceof FormData;
}

function isArrayBufferView(value: any): value is ArrayBufferView {
  return typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView
    ? ArrayBuffer.isView(value)
    : value && value.buffer && value.buffer instanceof ArrayBuffer;
}

function isString(value: any): value is string {
  return typeof value === "string";
}

function isNumber(value: any): value is number {
  return typeof value === "number";
}

function isDate(value: any): value is Date {
  return objectPrototypeToString.call(value) === "[object Date]";
}

function isFile(value: any): value is File {
  return objectPrototypeToString.call(value) === "[object File]";
}

function isBlob(value: any): value is Blob {
  return objectPrototypeToString.call(value) === "[object Blob]";
}

function isStream(value: any): boolean {
  return isObject(value) && isFunction((value as any).pipe);
}

function isURLSearchParams(value: any): value is URLSearchParams {
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

function merge(...sources: AnyObject[]): AnyObject {
  const result: AnyObject = {};

  function assignValue(value: any, key: string): void {
    if (typeof result[key] === "object" && typeof value === "object") {
      result[key] = merge(result[key], value);
    } else {
      result[key] = value;
    }
  }

  for (let index = 0, length = sources.length; index < length; index++) {
    forEach(sources[index], assignValue);
  }

  return result;
}

function deepMerge(...sources: AnyObject[]): AnyObject {
  const result: AnyObject = {};

  function assignValue(value: any, key: string): void {
    if (typeof result[key] === "object" && typeof value === "object") {
      result[key] = deepMerge(result[key], value);
    } else {
      result[key] = typeof value === "object" ? deepMerge({}, value) : value;
    }
  }

  for (let index = 0, length = sources.length; index < length; index++) {
    forEach(sources[index], assignValue);
  }

  return result;
}

function bind(fn: Function, thisArg: any): Function {
  return function boundFunction(this: any, ...args: any[]): any {
    return fn.apply(thisArg, args);
  };
}

function extend(target: AnyObject, source: AnyObject, thisArg?: any): AnyObject {
  forEach(source, (value: any, key: string) => {
    target[key] = thisArg && typeof value === "function" ? bind(value, thisArg) : value;
  });
  return target;
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