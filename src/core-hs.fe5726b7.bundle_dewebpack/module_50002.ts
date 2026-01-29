import call from './module_47730';
import aCallable from './module_77064';
import getMethod from './module_9087';

export default function iteratorClose(
  iterator: any,
  kind: 'normal' | 'throw',
  value: unknown
): unknown {
  let result: unknown;
  let hasError: boolean = false;

  aCallable(iterator);

  try {
    const returnMethod = getMethod(iterator, "return");

    if (!returnMethod) {
      if (kind === "throw") throw value;
      return value;
    }

    result = call(returnMethod, iterator);
  } catch (error) {
    hasError = true;
    result = error;
  }

  if (kind === "throw") throw value;
  if (hasError) throw result;

  aCallable(result);
  return value;
}