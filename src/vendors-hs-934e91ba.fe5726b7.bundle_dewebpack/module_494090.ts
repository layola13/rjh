import createStack from './createStack';
import baseIsEqual from './baseIsEqual';

interface PropertyCriteria {
  [0]: string | number | symbol;
  [1]: any;
  [2]?: boolean;
}

type Customizer = (
  objValue: any,
  othValue: any,
  key: string | number | symbol,
  object: any,
  other: any,
  stack: Stack
) => boolean | undefined;

interface Stack {
  // Stack implementation details
}

export default function baseIsMatch(
  object: any,
  source: any,
  matchData: PropertyCriteria[],
  customizer?: Customizer
): boolean {
  const length = matchData.length;
  let index = length;
  const noCustomizer = !customizer;

  if (object == null) {
    return !index;
  }

  let target = Object(object);

  while (index--) {
    const data = matchData[index];
    if (noCustomizer && data[2] 
      ? data[1] !== target[data[0]] 
      : !(data[0] in target)
    ) {
      return false;
    }
  }

  index = -1;
  while (++index < length) {
    const data = matchData[index];
    const key = data[0];
    const objValue = target[key];
    const srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in target)) {
        return false;
      }
    } else {
      const stack = createStack();
      let result: boolean | undefined;
      
      if (customizer) {
        result = customizer(objValue, srcValue, key, target, source, stack);
      }

      if (!(result === undefined ? baseIsEqual(srcValue, objValue, 3, customizer, stack) : result)) {
        return false;
      }
    }
  }

  return true;
}