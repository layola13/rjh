type ClassType = string;

function getClassType(value: unknown): ClassType {
  return Object.prototype.toString.call(value).slice(8, -1);
}

function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value) || getClassType(value) === "Array";
}

export default isArray;