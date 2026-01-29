interface SortItem {
  k: string;
  v: number;
}

type CompareFn<T> = (a: T, b: T) => number;

function createDefaultCompareFn<T>(userCompareFn?: CompareFn<T>): CompareFn<T> {
  return (left: T, right: T): number => {
    if (right === undefined) return -1;
    if (left === undefined) return 1;
    if (userCompareFn !== undefined) {
      return +userCompareFn(left, right) || 0;
    }
    return String(left) > String(right) ? 1 : -1;
  };
}

function customArraySort<T>(this: T[], compareFn?: CompareFn<T>): T[] {
  if (compareFn !== undefined) {
    validateCallable(compareFn);
  }

  const target = toObject(this);

  if (isNativeStableSortSupported) {
    return compareFn === undefined 
      ? nativeSort.call(target) 
      : nativeSort.call(target, compareFn);
  }

  const elements: T[] = [];
  const length = getArrayLength(target);

  for (let i = 0; i < length; i++) {
    if (i in target) {
      elements.push(target[i]);
    }
  }

  sortArray(elements, createDefaultCompareFn(compareFn));

  const sortedLength = getArrayLength(elements);
  let index = 0;

  for (; index < sortedLength;) {
    target[index] = elements[index++];
  }

  for (; index < length;) {
    deleteProperty(target, index++);
  }

  return target;
}

const testArray: SortItem[] = [];
const nativeSort = testArray.sort;
const nativePush = testArray.push;

const throwsOnUndefined = (() => {
  try {
    testArray.sort(undefined);
    return false;
  } catch {
    return true;
  }
})();

const throwsOnNull = (() => {
  try {
    testArray.sort(null as any);
    return false;
  } catch {
    return true;
  }
})();

const isStableSort = checkStableSort();
const isNativeStableSortSupported = !(() => {
  if (engineVersion) return engineVersion < 70;
  if (webkitVersion && webkitVersion > 3) return false;
  if (isIE) return true;
  if (isSafari) return isSafari < 603;

  const test: SortItem[] = [];
  let result = "";

  for (let charCode = 65; charCode < 76; charCode++) {
    const char = String.fromCharCode(charCode);
    let value: number;

    switch (charCode) {
      case 66:
      case 69:
      case 70:
      case 72:
        value = 3;
        break;
      case 68:
      case 71:
        value = 4;
        break;
      default:
        value = 2;
    }

    for (let j = 0; j < 47; j++) {
      test.push({ k: char + j, v: value });
    }
  }

  test.sort((a, b) => b.v - a.v);

  for (let i = 0; i < test.length; i++) {
    const firstChar = test[i].k.charAt(0);
    if (result.charAt(result.length - 1) !== firstChar) {
      result += firstChar;
    }
  }

  return result !== "DGBEFHACIJK";
})();

export { customArraySort };

declare function validateCallable(fn: unknown): void;
declare function toObject<T>(value: T): T;
declare function getArrayLength(obj: any): number;
declare function sortArray<T>(arr: T[], compareFn: CompareFn<T>): void;
declare function deleteProperty(obj: any, key: PropertyKey): void;
declare function checkStableSort(): boolean;

declare const engineVersion: number | undefined;
declare const webkitVersion: number | undefined;
declare const isIE: boolean;
declare const isSafari: number | false;