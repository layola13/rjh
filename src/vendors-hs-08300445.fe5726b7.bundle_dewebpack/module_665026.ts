export interface MeasureIndexResult {
  location: number;
  prefix: string;
}

export interface ReplaceWithMeasureOptions {
  measureLocation: number;
  prefix: string;
  targetText: string;
  selectionStart: number;
  split: string;
}

export interface ReplaceWithMeasureResult {
  text: string;
  selectionLocation: number;
}

export interface ValidateSearchOptions {
  split?: string;
}

export interface FilterOptionData {
  value?: string;
}

/**
 * Filter option based on search text
 */
export function filterOption(searchText: string, data: FilterOptionData): boolean {
  const value = data.value ?? "";
  const lowerSearchText = searchText.toLowerCase();
  return value.toLowerCase().indexOf(lowerSearchText) !== -1;
}

/**
 * Get text before current selection/cursor position
 */
export function getBeforeSelectionText(element: HTMLInputElement | HTMLTextAreaElement): string {
  const cursorPosition = element.selectionStart ?? 0;
  return element.value.slice(0, cursorPosition);
}

/**
 * Find the last occurrence of prefix(es) in text
 */
export function getLastMeasureIndex(
  text: string,
  prefixes: string | string[] = ""
): MeasureIndexResult {
  const prefixArray = Array.isArray(prefixes) ? prefixes : [prefixes];
  
  return prefixArray.reduce(
    (result, prefix) => {
      const lastIndex = text.lastIndexOf(prefix);
      return lastIndex > result.location
        ? { location: lastIndex, prefix }
        : result;
    },
    { location: -1, prefix: "" }
  );
}

/**
 * Replace text with measured content
 */
export function replaceWithMeasure(
  text: string,
  options: ReplaceWithMeasureOptions
): ReplaceWithMeasureResult {
  const { measureLocation, prefix, targetText, selectionStart, split } = options;
  
  let beforeText = text.slice(0, measureLocation);
  
  if (beforeText[beforeText.length - split.length] === split) {
    beforeText = beforeText.slice(0, beforeText.length - split.length);
  }
  
  if (beforeText) {
    beforeText = `${beforeText}${split}`;
  }
  
  const afterText = normalizeAfterText(
    text.slice(selectionStart),
    targetText.slice(selectionStart - measureLocation - prefix.length),
    split
  );
  
  const afterTextTrimmed = afterText.slice(0, split.length) === split
    ? afterText.slice(split.length)
    : afterText;
  
  const resultText = `${beforeText}${prefix}${targetText}${split}`;
  
  return {
    text: `${resultText}${afterTextTrimmed}`,
    selectionLocation: resultText.length
  };
}

/**
 * Set input cursor position
 */
export function setInputSelection(
  element: HTMLInputElement | HTMLTextAreaElement,
  position: number
): void {
  element.setSelectionRange(position, position);
  element.blur();
  element.focus();
}

/**
 * Validate search text against split character
 */
export function validateSearch(searchText: string, options: ValidateSearchOptions): boolean {
  const { split } = options;
  return !split || searchText.indexOf(split) === -1;
}

/**
 * Omit specified keys from object
 */
export function omit<T extends Record<string, any>>(
  source: T,
  ...keys: string[]
): Partial<T> {
  const result = { ...source };
  
  keys.forEach((key) => {
    delete result[key];
  });
  
  return result;
}

function toLowerCase(text: string | null | undefined): string {
  return (text ?? "").toLowerCase();
}

function normalizeAfterText(
  originalAfter: string,
  targetAfter: string,
  split: string
): string {
  const firstChar = originalAfter[0];
  
  if (!firstChar || firstChar === split) {
    return originalAfter;
  }
  
  let result = originalAfter;
  const targetLength = targetAfter.length;
  
  for (let i = 0; i < targetLength; i++) {
    if (toLowerCase(result[i]) !== toLowerCase(targetAfter[i])) {
      result = result.slice(i);
      break;
    }
    
    if (i === targetLength - 1) {
      result = result.slice(targetLength);
    }
  }
  
  return result;
}