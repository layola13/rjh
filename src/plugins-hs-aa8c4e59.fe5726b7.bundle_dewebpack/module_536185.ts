interface Instance {
  id: string | number;
}

interface SeekableItem {
  seekId: string | number;
}

interface ObjectWithInstance {
  instance: Instance;
  [key: string]: unknown;
}

type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
type JsonObject = { [key: string]: JsonValue };
type JsonArray = JsonValue[];

/**
 * Formats a JSON object with proper indentation and sorting
 * @param value - The value to format
 * @returns Formatted JSON string with 2-space indentation
 */
export function formatJson(value: unknown): string {
  const cloned = cloneObject(value);
  return JSON.stringify(cloned, null, " ");
}

/**
 * Deep clone and normalize an object, sorting keys and arrays
 * @param value - The value to clone
 * @returns A deep cloned and normalized version of the input
 */
function cloneObject(value: unknown): unknown {
  if (!isComplexType(value)) {
    return value;
  }

  if (isArray(value)) {
    const mappedArray = value.map((item) => cloneObject(item));

    if (isArrayOfInstanceObjects(value)) {
      mappedArray.sort((a, b) => 
        Number((a as ObjectWithInstance).instance.id > (b as ObjectWithInstance).instance.id)
      );
    } else if (isArrayOfSeekableItems(value)) {
      mappedArray.sort((a, b) => 
        Number((a as SeekableItem).seekId > (b as SeekableItem).seekId)
      );
    }

    return mappedArray;
  }

  const result: Record<string, unknown> = {};
  const sortedKeys = Object.keys(value as object).sort();

  for (const key of sortedKeys) {
    result[key] = cloneObject((value as Record<string, unknown>)[key]);
  }

  return result;
}

function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    value !== null &&
    typeof value === "object" &&
    Object.prototype.toString.call(value).toLowerCase() === "[object object]"
  );
}

function isComplexType(value: unknown): value is unknown[] | Record<string, unknown> {
  return isArray(value) || isPlainObject(value);
}

function isArrayOfInstanceObjects(value: unknown[]): value is ObjectWithInstance[] {
  return value.every(
    (item): item is ObjectWithInstance =>
      isPlainObject(item) &&
      "instance" in item &&
      isPlainObject(item.instance) &&
      "id" in item.instance
  );
}

function isArrayOfSeekableItems(value: unknown[]): value is SeekableItem[] {
  return value.every(
    (item): item is SeekableItem =>
      isPlainObject(item) && "seekId" in item
  );
}

declare global {
  interface Window {
    __DEBUG__FUN__?: {
      cloneObject: typeof cloneObject;
      formatJson: typeof formatJson;
    };
  }
}

if (!window.__DEBUG__FUN__) {
  window.__DEBUG__FUN__ = {
    cloneObject,
    formatJson,
  };
}