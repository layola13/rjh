import call from './948496';
import aCallable from './742706';
import getMethod from './547193';

export default function iteratorClose(
  iterator: Iterator<unknown>,
  kind: 'normal' | 'throw',
  value: unknown
): unknown {
  let result: unknown;
  let errorOccurred: boolean = false;

  aCallable(iterator);

  try {
    const returnMethod = getMethod(iterator, 'return');

    if (!returnMethod) {
      if (kind === 'throw') throw value;
      return value;
    }

    result = call(returnMethod, iterator);
  } catch (error) {
    errorOccurred = true;
    result = error;
  }

  if (kind === 'throw') throw value;
  if (errorOccurred) throw result;

  aCallable(result);
  return value;
}