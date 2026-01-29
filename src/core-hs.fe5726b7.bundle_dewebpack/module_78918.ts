interface StringHelpers {
  codeAt: (text: string, position: number) => number | undefined;
  charAt: (text: string, position: number) => string;
}

const nativeCharAt = String.prototype.charAt;
const nativeCharCodeAt = String.prototype.charCodeAt;
const nativeSlice = String.prototype.slice;

const HIGH_SURROGATE_MIN = 0xD800;
const HIGH_SURROGATE_MAX = 0xDBFF;
const LOW_SURROGATE_MIN = 0xDC00;
const LOW_SURROGATE_MAX = 0xDFFF;
const SURROGATE_OFFSET = 0x10000;
const HIGH_SURROGATE_SHIFT = 10;

function createStringAccessor(returnString: boolean): (text: string, position: number) => string | number | undefined {
  return (text: string, position: number): string | number | undefined => {
    const normalizedText = String(text);
    const index = Math.trunc(position);
    const length = normalizedText.length;

    if (index < 0 || index >= length) {
      return returnString ? "" : undefined;
    }

    const firstCodeUnit = nativeCharCodeAt.call(normalizedText, index);

    // Not a high surrogate or at end of string
    if (
      firstCodeUnit < HIGH_SURROGATE_MIN ||
      firstCodeUnit > HIGH_SURROGATE_MAX ||
      index + 1 === length
    ) {
      return returnString
        ? nativeCharAt.call(normalizedText, index)
        : firstCodeUnit;
    }

    const secondCodeUnit = nativeCharCodeAt.call(normalizedText, index + 1);

    // Second code unit is not a low surrogate
    if (secondCodeUnit < LOW_SURROGATE_MIN || secondCodeUnit > LOW_SURROGATE_MAX) {
      return returnString
        ? nativeCharAt.call(normalizedText, index)
        : firstCodeUnit;
    }

    // Valid surrogate pair
    if (returnString) {
      return nativeSlice.call(normalizedText, index, index + 2);
    }

    // Calculate full Unicode code point
    return (
      secondCodeUnit -
      LOW_SURROGATE_MIN +
      ((firstCodeUnit - HIGH_SURROGATE_MIN) << HIGH_SURROGATE_SHIFT) +
      SURROGATE_OFFSET
    );
  };
}

const stringHelpers: StringHelpers = {
  codeAt: createStringAccessor(false) as (text: string, position: number) => number | undefined,
  charAt: createStringAccessor(true) as (text: string, position: number) => string
};

export { stringHelpers as default, StringHelpers };