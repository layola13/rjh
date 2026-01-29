import call from './948496';
import isCallable from './61177';
import anObject from './742706';
import tryToString from './920174';
import getIteratorMethod from './232250';

export default function getIterator<T>(
  target: Iterable<T>,
  method?: () => Iterator<T>
): Iterator<T> {
  const iteratorMethod = arguments.length < 2 ? getIteratorMethod(target) : method;
  
  if (isCallable(iteratorMethod)) {
    return anObject(call(iteratorMethod, target));
  }
  
  throw new TypeError(`${tryToString(target)} is not iterable`);
}