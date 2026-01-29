function isArrayLikeObject(value: unknown): boolean {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as any).length === 'number' &&
    (value as any).length >= 0 &&
    (value as any).length % 1 === 0 &&
    (value as any).length <= Number.MAX_SAFE_INTEGER
  );
}

function isObjectLike(value: unknown): boolean {
  return typeof value === 'object' && value !== null;
}

const objectProto = Object.prototype;
const hasOwnProperty = objectProto.hasOwnProperty;
const propertyIsEnumerable = objectProto.propertyIsEnumerable;

const isArguments = (function(): (value: unknown) => boolean {
  function baseIsArguments(value: unknown): boolean {
    return isArrayLikeObject(value);
  }

  try {
    const testArgs = (function() { return arguments; })();
    if (baseIsArguments(testArgs)) {
      return baseIsArguments;
    }
  } catch (e) {
    // Fall through to fallback
  }

  return function(value: unknown): boolean {
    return (
      isObjectLike(value) &&
      hasOwnProperty.call(value, 'callee') &&
      !propertyIsEnumerable.call(value, 'callee')
    );
  };
})();

export default isArguments;