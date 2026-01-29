type IterateeFunction<T> = (value: T, key: string, object: Record<string, T>) => boolean;

type KeysFunction = (obj: any) => string[];

function createBaseFor(fromRight: boolean): <T>(
  target: Record<string, T>,
  iteratee: IterateeFunction<T>,
  keysFunc: KeysFunction
) => Record<string, T> {
  return function<T>(
    target: Record<string, T>,
    iteratee: IterateeFunction<T>,
    keysFunc: KeysFunction
  ): Record<string, T> {
    let index = -1;
    const object = Object(target);
    const keys = keysFunc(target);
    const length = keys.length;
    let currentLength = length;

    while (currentLength--) {
      const key = keys[fromRight ? currentLength : ++index];
      
      if (iteratee(object[key], key, object) === false) {
        break;
      }
    }

    return target;
  };
}

export default createBaseFor;