import classof from './classof';
import getMethod from './getMethod';
import isNullish from './isNullish';
import Iterators from './Iterators';
import wellKnownSymbol from './wellKnownSymbol';

const ITERATOR = wellKnownSymbol('iterator');

export default function getIteratorMethod(value: unknown): Function | undefined {
  if (!isNullish(value)) {
    return getMethod(value, ITERATOR) || getMethod(value, '@@iterator') || Iterators[classof(value)];
  }
  return undefined;
}