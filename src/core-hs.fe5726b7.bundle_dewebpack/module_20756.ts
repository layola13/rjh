import call from './47730';
import isCallable from './94743';
import anObject from './77064';
import tryToString from './60056';
import getIteratorMethod from './74832';

export default function getIterator<T>(target: T, method?: Function): Iterator<any> {
  const iteratorMethod = arguments.length < 2 ? getIteratorMethod(target) : method;
  
  if (isCallable(iteratorMethod)) {
    return anObject(call(iteratorMethod, target));
  }
  
  throw new TypeError(`${tryToString(target)} is not iterable`);
}