function getStringLength(str: string): number {
  let length = 0;
  for (const char of str) {
    length += char.codePointAt(0)! > 0xFFFF ? 2 : 1;
  }
  return length;
}

function repeatString(str: string, times: number): string {
  return str.repeat(times);
}

function splitStringByCodePoint(str: string): string[] {
  return Array.from(str);
}

function sliceString(chars: string[], start: number, end: number): string[] {
  let currentLength = 0;
  const result: string[] = [];
  
  for (const char of chars) {
    if (currentLength >= end) break;
    if (currentLength >= start) {
      result.push(char);
    }
    currentLength += char.codePointAt(0)! > 0xFFFF ? 2 : 1;
  }
  
  return result;
}

function hasUnicodeCharacters(str: string): boolean {
  return /[^\x00-\x7F]/.test(str);
}

/**
 * Pads a string to a target length by repeating a fill string
 * @param targetLength - The desired length of the padded string
 * @param fillString - The string to use for padding (defaults to space)
 * @returns The padded string
 */
export default function padString(targetLength: number, fillString: string = " "): string {
  const fillLength = fillString.length;
  
  if (fillLength < 2) {
    return fillLength ? repeatString(fillString, targetLength) : fillString;
  }
  
  const repeatedFill = repeatString(fillString, Math.ceil(targetLength / getStringLength(fillString)));
  
  if (hasUnicodeCharacters(fillString)) {
    const chars = splitStringByCodePoint(repeatedFill);
    return sliceString(chars, 0, targetLength).join("");
  }
  
  return repeatedFill.slice(0, targetLength);
}