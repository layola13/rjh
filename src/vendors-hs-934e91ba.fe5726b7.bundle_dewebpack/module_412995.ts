function isArguments(value: unknown): value is IArguments {
  return (
    isObjectLike(value) &&
    hasOwnProperty.call(value, "callee") &&
    !propertyIsEnumerable.call(value, "callee")
  );
}

interface ObjectLike {
  [key: string]: unknown;
}

function isObjectLike(value: unknown): value is ObjectLike {
  return typeof value === "object" && value !== null;
}

const hasOwnProperty = Object.prototype.hasOwnProperty;
const propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

export default isArguments;