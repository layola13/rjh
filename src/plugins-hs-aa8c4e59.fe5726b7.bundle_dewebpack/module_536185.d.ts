/**
 * JSON formatting utilities with deep cloning and sorting capabilities
 */

interface DebugFunctions {
  cloneObject: <T>(obj: T) => T;
  formatJson: (obj: unknown) => string;
}

declare global {
  interface Window {
    __DEBUG__FUN__?: DebugFunctions;
  }
}

/**
 * Checks if a value is an array
 */
function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

/**
 * Checks if a value is a plain object
 */
function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    value !== null &&
    typeof value === "object" &&
    Object.prototype.toString.call(value).toLowerCase() === "[object object]"
  );
}

/**
 * Checks if value is neither array nor plain object
 */
function isPrimitive(value: unknown): boolean {
  return !(isArray(value) || isPlainObject(value));
}

interface InstanceObject {
  instance: {
    id: string | number;
  };
  [key: string]: unknown;
}

interface SeekIdObject {
  seekId: string | number;
  [key: string]: unknown;
}

/**
 * Checks if array contains objects with instance.id property
 */
function isInstanceArray(value: unknown): value is InstanceObject[] {
  return (
    isArray(value) &&
    value.every(
      (item): item is InstanceObject =>
        isPlainObject(item) &&
        "instance" in item &&
        isPlainObject(item.instance) &&
        "id" in item.instance
    )
  );
}

/**
 * Checks if array contains objects with seekId property
 */
function isSeekIdArray(value: unknown): value is SeekIdObject[] {
  return (
    isArray(value) &&
    value.every(
      (item): item is SeekIdObject =>
        isPlainObject(item) && "seekId" in item
    )
  );
}

/**
 * Deep clones and sorts object properties and arrays
 * - Sorts object keys alphabetically
 * - Sorts arrays with instance.id by id
 * - Sorts arrays with seekId by seekId
 */
function cloneObject<T>(value: T): T {
  // Return primitives as-is
  if (isPrimitive(value)) {
    return value;
  }

  // Handle arrays
  if (isArray(value)) {
    const clonedArray = value.map((item) => cloneObject(item));

    // Sort by instance.id if applicable
    if (isInstanceArray(value)) {
      return clonedArray.sort((a, b) =>
        Number(a.instance.id > b.instance.id)
      ) as T;
    }

    // Sort by seekId if applicable
    if (isSeekIdArray(value)) {
      return clonedArray.sort((a, b) => Number(a.seekId > b.seekId)) as T;
    }

    return clonedArray as T;
  }

  // Handle plain objects
  const result: Record<string, unknown> = {};
  const sortedKeys = Object.keys(value as Record<string, unknown>).sort();

  for (const key of sortedKeys) {
    result[key] = cloneObject((value as Record<string, unknown>)[key]);
  }

  return result as T;
}

/**
 * Formats a value as pretty-printed JSON string with 2-space indentation
 * Automatically sorts object keys and special arrays before stringification
 */
export function formatJson(value: unknown): string {
  const cloned = cloneObject(value);
  return JSON.stringify(cloned, null, 2);
}

// Attach debug utilities to window if not already present
if (!window.__DEBUG__FUN__) {
  window.__DEBUG__FUN__ = {
    cloneObject,
    formatJson,
  };
}