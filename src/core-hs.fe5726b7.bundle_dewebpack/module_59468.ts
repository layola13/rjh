import bind from './module_94743';
import getIteratorMethod from './module_77064';

export default function getIteratorWithBoundNext<T>(iterable: Iterable<T>): {
  iterator: Iterator<T>;
  next: () => IteratorResult<T>;
} {
  const iterator = getIteratorMethod(iterable);
  
  return {
    iterator,
    next: bind(iterator.next)
  };
}