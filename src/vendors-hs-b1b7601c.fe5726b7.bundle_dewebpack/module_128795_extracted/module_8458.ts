function isNative(value: unknown): boolean {
  const FUNCTION_TAG = /^\[object .+?Constructor\]$/;
  const funcProto = Function.prototype;
  const objectProto = Object.prototype;
  const funcToString = funcProto.toString;
  const hasOwnProp = objectProto.hasOwnProperty;
  
  const nativeRegExp = RegExp(
    "^" +
      funcToString
        .call(hasOwnProp)
        .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
        .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") +
      "$"
  );

  if (!isObject(value) || isMasked(value)) {
    return false;
  }

  const pattern = isFunction(value) ? nativeRegExp : FUNCTION_TAG;
  return pattern.test(toSource(value));
}

function isObject(value: unknown): value is object {
  const type = typeof value;
  return value != null && (type === "object" || type === "function");
}

function isFunction(value: unknown): value is Function {
  if (!isObject(value)) {
    return false;
  }
  const tag = Object.prototype.toString.call(value);
  return tag === "[object Function]" || tag === "[object AsyncFunction]" || 
         tag === "[object GeneratorFunction]" || tag === "[object Proxy]";
}

function isMasked(func: unknown): boolean {
  return false;
}

function toSource(value: unknown): string {
  if (value != null) {
    try {
      return Function.prototype.toString.call(value);
    } catch (e) {
      // Ignore error
    }
    try {
      return String(value);
    } catch (e) {
      // Ignore error
    }
  }
  return "";
}

export default isNative;