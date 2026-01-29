import iterate from './79227';
import getIteratorMethod from './6975';
import getIteratorDirect from './59468';

interface IteratorPrototype {
  toArray<T>(this: Iterator<T>): T[];
}

declare global {
  interface Iterator<T> {
    toArray(): T[];
  }
}

const arrayPush = Array.prototype.push;

iterate(
  {
    target: "Iterator",
    proto: true,
    real: true
  },
  {
    toArray<T>(this: Iterator<T>): T[] {
      const result: T[] = [];
      getIteratorMethod(
        getIteratorDirect(this),
        arrayPush,
        {
          that: result,
          IS_RECORD: true
        }
      );
      return result;
    }
  }
);