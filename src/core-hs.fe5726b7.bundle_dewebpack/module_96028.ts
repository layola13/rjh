import { getWellKnownSymbol } from './well-known-symbols';
import { Iterators } from './iterators';

const iteratorSymbol = getWellKnownSymbol('iterator');
const arrayPrototype = Array.prototype;

export function isArrayIterator(value: unknown): boolean {
  return (
    value !== undefined &&
    (Iterators.Array === value || arrayPrototype[iteratorSymbol] === value)
  );
}