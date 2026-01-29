import repeat from './repeat';
import stringSize from './stringSize';
import toInteger from './toInteger';
import toString from './toString';

/**
 * Pads string on the left side if it's shorter than length.
 * Padding characters are truncated if they exceed length.
 *
 * @param str - The string to pad
 * @param length - The padding length
 * @param chars - The string used as padding
 * @returns Returns the padded string
 */
export default function padStart(str: string, length: number, chars?: string): string {
  const strValue = toString(str);
  const targetLength = toInteger(length);
  const currentSize = targetLength ? stringSize(strValue) : 0;
  
  return targetLength && currentSize < targetLength
    ? repeat(targetLength - currentSize, chars) + strValue
    : strValue;
}