import baseTimes from './baseTimes';
import isArguments from './isArguments';
import isArray from './isArray';
import isBuffer from './isBuffer';
import isIndex from './isIndex';
import isTypedArray from './isTypedArray';

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @param value - The value to query.
 * @param inherited - Specify returning inherited property names.
 * @returns Returns the array of property names.
 */
export default function arrayLikeKeys<T>(value: ArrayLike<T> | Record<string, unknown>, inherited: boolean): string[] {
  const isArr = isArray(value);
  const isArgs = !isArr && isArguments(value);
  const isBuff = !isArr && !isArgs && isBuffer(value);
  const isTyped = !isArr && !isArgs && !isBuff && isTypedArray(value);
  const skipIndexes = isArr || isArgs || isBuff || isTyped;
  const result = skipIndexes ? baseTimes(value.length, String) : [];
  const length = result.length;

  for (const key in value) {
    const shouldSkip = !inherited && !hasOwnProperty.call(value, key);
    const isLengthProperty = key === 'length';
    const isBufferProperty = isBuff && (key === 'offset' || key === 'parent');
    const isTypedArrayProperty = isTyped && (key === 'buffer' || key === 'byteLength' || key === 'byteOffset');
    const isIndexKey = isIndex(key, length);
    const shouldSkipIndexes = skipIndexes && (isLengthProperty || isBufferProperty || isTypedArrayProperty || isIndexKey);

    if (!shouldSkip && !shouldSkipIndexes) {
      result.push(key);
    }
  }

  return result;
}