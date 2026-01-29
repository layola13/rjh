function isNative(value: unknown): boolean {
  const NATIVE_FUNCTION_PATTERN = /^\[object .+?Constructor\]$/;
  const functionProto = Function.prototype;
  const objectProto = Object.prototype;
  const funcToString = functionProto.toString;
  const hasOwnProp = objectProto.hasOwnProperty;
  
  const reIsNative = RegExp(
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

  const pattern = isFunction(value) ? reIsNative : NATIVE_FUNCTION_PATTERN;
  return pattern.test(toSource(value));
}

export default isNative;

// Note: These imports would need to be defined based on the actual module dependencies:
// import isFunction from './isFunction';
// import isMasked from './isMasked';
// import isObject from './isObject';
// import toSource from './toSource';