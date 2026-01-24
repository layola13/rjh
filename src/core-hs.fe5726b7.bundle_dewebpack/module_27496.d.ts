/**
 * String/Number replacer function factory for JSON.stringify
 * Creates a replacer that filters object keys, keeping only string/number values
 * 
 * @param keys - Array of keys to include in serialization, or undefined to include all
 * @returns A replacer function compatible with JSON.stringify's second parameter
 */

type ReplacerKey = string | number;

interface ReplacerFunction {
  (this: unknown, key: string, value: unknown): unknown;
}

/**
 * Creates a JSON.stringify replacer that only includes specified keys
 * and filters values to only string/number types
 */
function createStringNumberReplacer(keys?: ReplacerKey[]): ReplacerFunction {
  // If keys is already an array, use it; otherwise return identity replacer
  if (!Array.isArray(keys)) {
    return (_key: string, value: unknown): unknown => value;
  }

  if (!Array.isArray(keys)) {
    return (_key: string, value: unknown): unknown => value;
  }

  // Normalize keys to strings
  const normalizedKeys: string[] = [];
  
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    
    if (typeof key === "string") {
      normalizedKeys.push(key);
    } else if (
      typeof key === "number" || 
      Object.prototype.toString.call(key) === "[object Number]" ||
      Object.prototype.toString.call(key) === "[object String]"
    ) {
      normalizedKeys.push(String(key));
    }
  }

  const keyCount = normalizedKeys.length;
  let isFirstCall = true;

  return function replacer(this: unknown, key: string, value: unknown): unknown {
    // First call: return the root value as-is
    if (isFirstCall) {
      isFirstCall = false;
      return value;
    }

    // Skip if called on an array
    if (Array.isArray(this)) {
      return value;
    }

    // Check if current key is in the allowed list
    for (let i = 0; i < keyCount; i++) {
      if (normalizedKeys[i] === key) {
        return value;
      }
    }

    // Key not found: omit from result
    return undefined;
  };
}

export default createStringNumberReplacer;