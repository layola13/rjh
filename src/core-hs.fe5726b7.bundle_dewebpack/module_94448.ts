import { iterateIterator } from './iterate';
import { aCallable } from './a-callable';
import { anObject } from './an-object';

interface IteratorRecord<T = unknown> {
  iterator: Iterator<T>;
  next: () => IteratorResult<T>;
  done?: boolean;
}

interface IterateOptions {
  IS_RECORD?: boolean;
  INTERRUPTED?: boolean;
}

interface IterateResult {
  stopped: boolean;
  result?: unknown;
}

declare global {
  interface Iterator<T> {
    every(predicate: (value: T, index: number) => boolean): boolean;
  }
}

const predicateCallback = <T>(
  predicate: (value: T, index: number) => boolean,
  index: number
) => {
  return (value: T, interrupt: () => void): void => {
    if (!predicate(value, index)) {
      interrupt();
    }
  };
};

export function everyMethod<T>(
  this: Iterator<T>,
  predicate: (value: T, index: number) => boolean
): boolean {
  const iteratorRecord = anObject(this) as IteratorRecord<T>;
  let index = 0;

  aCallable(predicate);

  const result = iterateIterator(
    iteratorRecord,
    (value: T, interrupt: () => void) => {
      if (!predicate(value, index++)) {
        return interrupt();
      }
    },
    {
      IS_RECORD: true,
      INTERRUPTED: true
    }
  ) as IterateResult;

  return !result.stopped;
}

Iterator.prototype.every = everyMethod;