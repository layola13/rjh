export function createIteratorResult<T>(value: T, done: boolean): IteratorResult<T> {
  return {
    value,
    done
  };
}