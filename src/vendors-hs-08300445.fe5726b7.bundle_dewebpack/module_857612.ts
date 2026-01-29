export interface RemoveLastEnabledResult<T> {
  values: T[];
  removedValue: T | null;
}

export interface LabeledValue<T = unknown> {
  key?: T;
  value?: T;
  label?: React.ReactNode;
}

export interface ToInnerValueOptions {
  labelInValue: boolean;
  combobox: boolean;
}

export interface ToOuterValuesOptions<T> {
  optionLabelProp: string;
  labelInValue: boolean;
  prevValueMap: Map<T, LabeledValue<T>>;
  options: unknown[];
  getLabeledValue: (
    value: T,
    context: {
      options: unknown[];
      prevValueMap: Map<T, LabeledValue<T>>;
      labelInValue: boolean;
      optionLabelProp: string;
    }
  ) => LabeledValue<T>;
}

export const isClient =
  typeof window !== 'undefined' &&
  window.document &&
  window.document.documentElement;

export const isBrowserClient = isClient;

let uuidCounter = 0;

/**
 * Generates a unique identifier for component instances
 */
export function getUUID(): number | string {
  if (isBrowserClient) {
    const currentId = uuidCounter;
    uuidCounter += 1;
    return currentId;
  }
  return 'TEST_OR_SSR';
}

/**
 * Converts a value to an array
 */
export function toArray<T>(value: T | T[] | undefined): T[] {
  if (Array.isArray(value)) {
    return value;
  }
  return value !== undefined ? [value] : [];
}

/**
 * Converts outer values to inner representation with optional labeled value handling
 */
export function toInnerValue<T>(
  value: T | T[] | undefined,
  options: ToInnerValueOptions
): [T[], Map<T, LabeledValue<T>>] {
  const { labelInValue, combobox } = options;
  const labeledValueMap = new Map<T, LabeledValue<T>>();

  if (value === undefined || (value === '' && combobox)) {
    return [[], labeledValueMap];
  }

  const valueArray = Array.isArray(value) ? value : [value];
  let innerValues = valueArray;

  if (labelInValue) {
    innerValues = valueArray
      .filter((item) => item !== null)
      .map((item) => {
        const labeledItem = item as unknown as LabeledValue<T>;
        const { key, value: val } = labeledItem;
        const actualValue = (val !== undefined ? val : key) as T;
        labeledValueMap.set(actualValue, labeledItem);
        return actualValue;
      });
  }

  return [innerValues, labeledValueMap];
}

/**
 * Converts inner values to outer representation with labeled value support
 */
export function toOuterValues<T>(
  values: T[],
  options: ToOuterValuesOptions<T>
): Array<T | LabeledValue<T>> {
  const { optionLabelProp, labelInValue, prevValueMap, options: selectOptions, getLabeledValue } = options;
  let outerValues: Array<T | LabeledValue<T>> = values;

  if (labelInValue) {
    outerValues = values.map((value) =>
      getLabeledValue(value, {
        options: selectOptions,
        prevValueMap,
        labelInValue,
        optionLabelProp,
      })
    );
  }

  return outerValues;
}

/**
 * Removes the last enabled value from an array of items with disabled state
 */
export function removeLastEnabledValue<T extends { disabled?: boolean }>(
  items: T[],
  cloneArray: (arr: T[]) => T[]
): RemoveLastEnabledResult<T> {
  const clonedValues = cloneArray(items);
  let lastEnabledIndex = -1;

  for (lastEnabledIndex = items.length - 1; lastEnabledIndex >= 0 && items[lastEnabledIndex].disabled; lastEnabledIndex -= 1);

  let removedValue: T | null = null;

  if (lastEnabledIndex !== -1) {
    removedValue = clonedValues[lastEnabledIndex];
    clonedValues.splice(lastEnabledIndex, 1);
  }

  return {
    values: clonedValues,
    removedValue,
  };
}