const allSettled = Promise.allSettled;

export default function promiseAllSettled<T>(
  this: PromiseConstructor | undefined,
  promises: Iterable<T | PromiseLike<T>>
): Promise<Array<PromiseSettledResult<Awaited<T>>>> {
  const context = this !== undefined && this !== null ? this : Promise;
  return allSettled.call(context, promises);
}