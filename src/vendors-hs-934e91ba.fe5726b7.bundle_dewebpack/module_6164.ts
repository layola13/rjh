function createIterator(isReverse: boolean): <T extends object>(
  obj: T,
  callback: <K extends keyof T>(value: T[K], key: K, object: T) => boolean | void,
  keysFunc: (obj: T) => Array<keyof T>
) => T {
  return function <T extends object>(
    obj: T,
    callback: <K extends keyof T>(value: T[K], key: K, object: T) => boolean | void,
    keysFunc: (obj: T) => Array<keyof T>
  ): T {
    let index = -1;
    const objectRef = Object(obj);
    const keys = keysFunc(obj);
    const length = keys.length;
    let remaining = length;

    while (remaining--) {
      const key = keys[isReverse ? remaining : ++index];
      if (callback(objectRef[key], key, objectRef) === false) {
        break;
      }
    }

    return obj;
  };
}

export { createIterator };