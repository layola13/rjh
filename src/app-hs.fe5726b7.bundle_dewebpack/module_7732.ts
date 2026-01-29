function getPrototypeOf(value: unknown): unknown {
  return Object.getPrototypeOf(Object(value));
}

export default getPrototypeOf;