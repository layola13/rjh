export function createInvalidObservableTypeError(value: unknown): TypeError {
  const valueDescription = 
    value !== null && typeof value === "object"
      ? "an invalid object"
      : `'${value}'`;

  return new TypeError(
    `You provided ${valueDescription} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
  );
}