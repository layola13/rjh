interface StringIteratorMethods {
  codeAt: (str: string, position: number) => number | undefined;
  charAt: (str: string, position: number) => string;
}

function createStringIterator(returnString: boolean): (str: string, position: number) => string | number | undefined {
  return function(inputString: string, position: number): string | number | undefined {
    const stringValue = String(inputString);
    const index = Math.trunc(position) || 0;
    const stringLength = stringValue.length;

    if (index < 0 || index >= stringLength) {
      return returnString ? "" : undefined;
    }

    const firstCodeUnit = stringValue.charCodeAt(index);

    // Check if it's a high surrogate (start of surrogate pair)
    const HIGH_SURROGATE_START = 0xD800;
    const HIGH_SURROGATE_END = 0xDBFF;
    const LOW_SURROGATE_START = 0xDC00;
    const LOW_SURROGATE_END = 0xDFFF;
    const SURROGATE_OFFSET = 0x10000;

    if (
      firstCodeUnit < HIGH_SURROGATE_START ||
      firstCodeUnit > HIGH_SURROGATE_END ||
      index + 1 === stringLength
    ) {
      return returnString ? stringValue.charAt(index) : firstCodeUnit;
    }

    const secondCodeUnit = stringValue.charCodeAt(index + 1);

    if (secondCodeUnit < LOW_SURROGATE_START || secondCodeUnit > LOW_SURROGATE_END) {
      return returnString ? stringValue.charAt(index) : firstCodeUnit;
    }

    if (returnString) {
      return stringValue.slice(index, index + 2);
    }

    // Calculate Unicode code point from surrogate pair
    const codePoint = (firstCodeUnit - HIGH_SURROGATE_START << 10) + 
                      (secondCodeUnit - LOW_SURROGATE_START) + 
                      SURROGATE_OFFSET;
    
    return codePoint;
  };
}

export const stringIteratorMethods: StringIteratorMethods = {
  codeAt: createStringIterator(false) as (str: string, position: number) => number | undefined,
  charAt: createStringIterator(true) as (str: string, position: number) => string
};

export const { codeAt, charAt } = stringIteratorMethods;