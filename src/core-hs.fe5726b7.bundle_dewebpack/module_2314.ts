type IteratorResult<T> = {
  value: T;
  done: boolean;
};

type SetIterator<T> = {
  next(): IteratorResult<T>;
};

type IteratorFunction<T> = (set: Set<T>) => SetIterator<T>;

type ForEachCallback<T> = (value: T, key: T, set: Set<T>) => void;

type ForEachFunction<T> = (set: Set<T>, callback: ForEachCallback<T>) => void;

type IterateFunction<T> = (
  iterator: SetIterator<T>,
  callback: ForEachCallback<T>,
  next: () => IteratorResult<T>
) => void;

const setForEach: ForEachFunction<unknown> = Set.prototype.forEach;
const setKeys: IteratorFunction<unknown> = Set.prototype.keys;
const nextMethod = setKeys(new Set()).next;

export default function<T>(
  set: Set<T>,
  callback: ForEachCallback<T>,
  useIterator?: boolean
): void {
  if (useIterator) {
    const iterate: IterateFunction<T> = require('./iterate');
    const iterator = setKeys(set) as SetIterator<T>;
    iterate(iterator, callback, nextMethod);
  } else {
    (setForEach as ForEachFunction<T>)(set, callback);
  }
}