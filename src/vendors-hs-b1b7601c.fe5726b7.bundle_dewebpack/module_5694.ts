function isArguments(value: unknown): value is IArguments {
  return (
    isObjectLike(value) &&
    hasOwnProperty.call(value, "callee") &&
    !propertyIsEnumerable.call(value, "callee")
  );
}

function isObjectLike(value: unknown): value is object {
  return value != null && typeof value === "object";
}

const hasOwnProperty = Object.prototype.hasOwnProperty;
const propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

export { isArguments };