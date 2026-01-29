const requireNonNullable = (value: unknown): unknown => {
  if (value === null || value === undefined) {
    throw new TypeError('Cannot convert null or undefined to object');
  }
  return value;
};

const toObject = (value: unknown): object => {
  return Object(requireNonNullable(value));
};

export default toObject;