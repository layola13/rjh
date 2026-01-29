type ReplacerValue = string | number;

interface ReplacerFunction {
  (this: unknown, key: string, value: unknown): unknown;
}

function createJSONReplacer(
  replacer: ReplacerValue[] | null | undefined
): ReplacerFunction | ReplacerValue[] {
  if (isCallable(replacer)) {
    return replacer as ReplacerFunction;
  }

  if (isArray(replacer)) {
    const length = replacer.length;
    const allowedKeys: string[] = [];

    for (let index = 0; index < length; index++) {
      const element = replacer[index];

      if (typeof element === 'string') {
        allowedKeys.push(element);
      } else if (
        typeof element === 'number' ||
        getClassName(element) === 'Number' ||
        getClassName(element) === 'String'
      ) {
        allowedKeys.push(toString(element));
      }
    }

    const allowedKeysLength = allowedKeys.length;
    let isFirstCall = true;

    return function (this: unknown, key: string, value: unknown): unknown {
      if (isFirstCall) {
        isFirstCall = false;
        return value;
      }

      if (isArray(this)) {
        return value;
      }

      for (let index = 0; index < allowedKeysLength; index++) {
        if (allowedKeys[index] === key) {
          return value;
        }
      }

      return undefined;
    };
  }

  return replacer as ReplacerValue[];
}

function isCallable(value: unknown): boolean {
  // Implementation would be imported from module 52530
  return typeof value === 'function';
}

function isArray(value: unknown): value is unknown[] {
  // Implementation would be imported from module 86761
  return Array.isArray(value);
}

function getClassName(value: unknown): string {
  // Implementation would be imported from module 97303
  return Object.prototype.toString.call(value).slice(8, -1);
}

function toString(value: unknown): string {
  // Implementation would be imported from module 24200
  return String(value);
}

export default createJSONReplacer;