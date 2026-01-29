function toObject(value: unknown): object {
  if (value === null || value === undefined) {
    throw new TypeError("Cannot convert undefined or null to object");
  }
  return Object(value);
}

export default toObject;