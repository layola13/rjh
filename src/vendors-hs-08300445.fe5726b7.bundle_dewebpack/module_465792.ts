export interface DataAttributes {
  [key: string]: unknown;
}

export function tuple<T extends unknown[]>(...args: T): T {
  return args;
}

export function getValue<T>(arr: T[] | null | undefined, index: number): T | null {
  return arr ? arr[index] : null;
}

export function leftPad(value: string | number, length: number, padChar: string = "0"): string {
  let result = String(value);
  while (result.length < length) {
    result = `${padChar}${value}`;
  }
  return result;
}

export function toArray<T>(value: T | T[] | null | undefined): T[] {
  if (value == null) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}

export function updateValues<T>(
  arr: [T | null, T | null] | null | undefined,
  updater: T | ((prev: T | null) => T),
  index: number
): [T | null, T | null] | null {
  const values: [T | null, T | null] = [
    getValue(arr, 0),
    getValue(arr, 1)
  ];
  
  values[index] = typeof updater === "function" 
    ? (updater as (prev: T | null) => T)(values[index])
    : updater;
  
  if (!values[0] && !values[1]) {
    return null;
  }
  
  return values;
}

export default function filterDataAttributes(props: Record<string, unknown>): DataAttributes {
  const result: DataAttributes = {};
  
  Object.keys(props).forEach((key: string) => {
    const isDataAttr = key.substr(0, 5) === "data-";
    const isAriaAttr = key.substr(0, 5) === "aria-";
    const isRoleAttr = key === "role";
    const isNameAttr = key === "name";
    const isPrivateData = key.substr(0, 7) === "data-__";
    
    if ((isDataAttr || isAriaAttr || isRoleAttr || isNameAttr) && !isPrivateData) {
      result[key] = props[key];
    }
  });
  
  return result;
}