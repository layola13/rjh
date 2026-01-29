type CompareFunction = (
  objValue: unknown,
  srcValue: unknown,
  key: string | number | symbol,
  object: object,
  source: object,
  stack: Map<unknown, unknown>
) => boolean | undefined;

type PropertyMatcher = [
  key: string | number | symbol,
  value: unknown,
  isStrict: boolean
];

function baseIsMatch(
  object: unknown,
  source: object,
  matchData: PropertyMatcher[],
  customizer?: CompareFunction
): boolean {
  const length = matchData.length;
  let index = length;
  const isStrictCompare = !customizer;

  if (object == null) {
    return !index;
  }

  const obj = Object(object) as Record<string | number | symbol, unknown>;

  while (index--) {
    const [key, value, isStrict] = matchData[index];
    if (isStrictCompare && isStrict) {
      if (value !== obj[key]) {
        return false;
      }
    } else {
      if (!(key in obj)) {
        return false;
      }
    }
  }

  index = -1;

  while (++index < length) {
    const [key, srcValue, isStrict] = matchData[index];
    const objValue = obj[key];

    if (isStrictCompare && isStrict) {
      if (objValue === undefined && !(key in obj)) {
        return false;
      }
    } else {
      const stack = new Map<unknown, unknown>();
      let result: boolean | undefined;

      if (customizer) {
        result = customizer(objValue, srcValue, key, obj, source, stack);
      }

      const finalResult = result === undefined 
        ? baseIsEqual(srcValue, objValue, 3, customizer, stack)
        : result;

      if (!finalResult) {
        return false;
      }
    }
  }

  return true;
}

function baseIsEqual(
  value: unknown,
  other: unknown,
  bitmask: number,
  customizer: CompareFunction | undefined,
  stack: Map<unknown, unknown>
): boolean {
  // Implementation would be imported from module 9435
  throw new Error('baseIsEqual implementation required');
}

export default baseIsMatch;