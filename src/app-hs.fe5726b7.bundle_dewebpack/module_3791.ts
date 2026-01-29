function isArguments(value: unknown): boolean {
  return isObjectLike(value) && getTag(value) === "[object Arguments]";
}

export default isArguments;

function isObjectLike(value: unknown): boolean {
  return value != null && typeof value === "object";
}

function getTag(value: unknown): string {
  return Object.prototype.toString.call(value);
}