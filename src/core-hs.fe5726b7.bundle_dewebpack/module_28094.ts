type ArrayIterationMode = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface ArrayIterationCallback<T, R> {
  (element: T, index: number, source: object): R;
}

function createArrayIterator(mode: ArrayIterationMode) {
  const isMap = mode === 1;
  const isFilter = mode === 2;
  const isSome = mode === 3;
  const isEvery = mode === 4;
  const isFind = mode === 5;
  const isFindIndex = mode === 6;
  const isForEachOrFindIndex = mode === 5 || mode === 6;

  return function <T, R>(
    target: ArrayLike<T>,
    callback: ArrayIterationCallback<T, R>,
    thisArg?: unknown,
    arraySpeciesCreate?: (target: ArrayLike<T>, length: number) => unknown[]
  ): unknown {
    let element: T;
    let callbackResult: R;
    const sourceObject = Object(target);
    const arrayLike = Object(sourceObject) as ArrayLike<T>;
    const boundCallback = callback.bind(thisArg);
    const length = arrayLike.length >>> 0;
    let index = 0;
    const createArray = arraySpeciesCreate || ((t: ArrayLike<T>, len: number) => new Array(len));
    const resultArray = isMap
      ? createArray(target, length)
      : isFilter || mode === 7
      ? createArray(target, 0)
      : undefined;

    for (; index < length; index++) {
      if ((isForEachOrFindIndex || index in arrayLike)) {
        element = arrayLike[index];
        callbackResult = boundCallback(element, index, sourceObject);

        if (mode) {
          if (isMap) {
            (resultArray as unknown[])[index] = callbackResult;
          } else if (callbackResult) {
            switch (mode) {
              case 3:
                return true;
              case 5:
                return element;
              case 6:
                return index;
              case 2:
                (resultArray as unknown[]).push(element);
            }
          } else {
            switch (mode) {
              case 4:
                return false;
              case 7:
                (resultArray as unknown[]).push(element);
            }
          }
        }
      }
    }

    return isFindIndex ? -1 : isSome || isEvery ? isEvery : resultArray;
  };
}

export const forEach = createArrayIterator(0);
export const map = createArrayIterator(1);
export const filter = createArrayIterator(2);
export const some = createArrayIterator(3);
export const every = createArrayIterator(4);
export const find = createArrayIterator(5);
export const findIndex = createArrayIterator(6);
export const filterReject = createArrayIterator(7);