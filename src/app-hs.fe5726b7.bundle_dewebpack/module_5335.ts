export default function constant<T>(value: T): () => T {
  return function(): T {
    return value;
  };
}