import getIteratorMethod from './get-iterator-method';
import tryToString from './try-to-string';
import isNullOrUndefined from './is-null-or-undefined';
import Iterators from './iterators';
import wellKnownSymbol from './well-known-symbol';

const ITERATOR_SYMBOL = wellKnownSymbol('iterator');

export default function getIterator(value: unknown): Iterator<unknown> | undefined {
  if (!isNullOrUndefined(value)) {
    return tryToString(value, ITERATOR_SYMBOL) || 
           tryToString(value, '@@iterator') || 
           Iterators[getIteratorMethod(value)];
  }
  return undefined;
}