/**
 * Utility functions for query string parsing and encoding
 */

interface PlainObjectsOption {
  plainObjects?: boolean;
  allowPrototypes?: boolean;
}

interface CompactItem {
  obj: Record<string, any>;
  prop: string;
}

enum RFC {
  RFC1738 = 'RFC1738',
  RFC3986 = 'RFC3986'
}

/**
 * Pre-computed percent-encoded hex values for all byte values (0-255)
 */
const hexTable: string[] = (() => {
  const table: string[] = [];
  for (let i = 0; i < 256; ++i) {
    table.push("%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
  }
  return table;
})();

const CHUNK_SIZE = 1024;

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Convert an array to an object, preserving indices as keys
 */
function arrayToObject<T>(
  array: T[],
  options?: PlainObjectsOption
): Record<number, T> {
  const obj: Record<number, T> = options?.plainObjects
    ? { __proto__: null } as Record<number, T>
    : {};

  for (let i = 0; i < array.length; ++i) {
    if (array[i] !== undefined) {
      obj[i] = array[i];
    }
  }

  return obj;
}

/**
 * Assign properties from source to target object
 */
function assign<T extends Record<string, any>, U extends Record<string, any>>(
  target: T,
  source: U
): T & U {
  return Object.keys(source).reduce((result, key) => {
    result[key] = source[key];
    return result;
  }, target as any);
}

/**
 * Combine two arrays or values into a single array
 */
function combine<T>(first: T | T[], second: T | T[]): T[] {
  return ([] as T[]).concat(first as any, second as any);
}

/**
 * Remove undefined values from nested objects and arrays
 */
function compact<T>(value: T): T {
  const stack: CompactItem[] = [
    {
      obj: { o: value },
      prop: "o"
    }
  ];
  const refs: any[] = [];

  for (let i = 0; i < stack.length; ++i) {
    const item = stack[i];
    const obj = item.obj[item.prop];
    const keys = Object.keys(obj);

    for (let j = 0; j < keys.length; ++j) {
      const key = keys[j];
      const val = obj[key];

      if (typeof val === "object" && val !== null && refs.indexOf(val) === -1) {
        stack.push({
          obj: obj,
          prop: key
        });
        refs.push(val);
      }
    }
  }

  compactQueue(stack);
  return value;
}

/**
 * Helper to compact arrays in the stack
 */
function compactQueue(stack: CompactItem[]): void {
  while (stack.length > 1) {
    const item = stack.pop()!;
    const obj = item.obj[item.prop];

    if (Array.isArray(obj)) {
      const compacted: any[] = [];
      for (let k = 0; k < obj.length; ++k) {
        if (obj[k] !== undefined) {
          compacted.push(obj[k]);
        }
      }
      item.obj[item.prop] = compacted;
    }
  }
}

/**
 * Decode a URI component with charset support
 */
function decode(
  str: string,
  _decoder?: any,
  charset?: string
): string {
  const strWithoutPlus = str.replace(/\+/g, " ");

  if (charset === "iso-8859-1") {
    return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
  }

  try {
    return decodeURIComponent(strWithoutPlus);
  } catch (e) {
    return strWithoutPlus;
  }
}

/**
 * Encode a string with charset and RFC format support
 */
function encode(
  str: string | symbol,
  _defaultEncoder?: any,
  charset?: string,
  _kind?: any,
  format?: RFC
): string {
  if (str === null || str === undefined || (typeof str === 'string' && str.length === 0)) {
    return '';
  }

  let string: string;
  if (typeof str === "symbol") {
    string = Symbol.prototype.toString.call(str);
  } else if (typeof str !== "string") {
    string = String(str);
  } else {
    string = str;
  }

  if (charset === "iso-8859-1") {
    return escape(string).replace(/%u[0-9a-f]{4}/gi, (match) => {
      return "%26%23" + parseInt(match.slice(2), 16) + "%3B";
    });
  }

  let out = "";

  for (let i = 0; i < string.length; i += CHUNK_SIZE) {
    const chunk = string.length >= CHUNK_SIZE ? string.slice(i, i + CHUNK_SIZE) : string;
    const encoded: string[] = [];

    for (let j = 0; j < chunk.length; ++j) {
      const charCode = chunk.charCodeAt(j);

      if (
        charCode === 0x2D || // -
        charCode === 0x2E || // .
        charCode === 0x5F || // _
        charCode === 0x7E || // ~
        (charCode >= 0x30 && charCode <= 0x39) || // 0-9
        (charCode >= 0x41 && charCode <= 0x5A) || // A-Z
        (charCode >= 0x61 && charCode <= 0x7A) || // a-z
        (format === RFC.RFC1738 && (charCode === 0x28 || charCode === 0x29)) // ()
      ) {
        encoded[encoded.length] = chunk.charAt(j);
      } else if (charCode < 0x80) {
        encoded[encoded.length] = hexTable[charCode];
      } else if (charCode < 0x800) {
        encoded[encoded.length] = hexTable[0xC0 | (charCode >> 6)] + hexTable[0x80 | (charCode & 0x3F)];
      } else if (charCode < 0xD800 || charCode >= 0xE000) {
        encoded[encoded.length] =
          hexTable[0xE0 | (charCode >> 12)] +
          hexTable[0x80 | ((charCode >> 6) & 0x3F)] +
          hexTable[0x80 | (charCode & 0x3F)];
      } else {
        j += 1;
        const surrogatePair = 0x10000 + (((charCode & 0x3FF) << 10) | (chunk.charCodeAt(j) & 0x3FF));
        encoded[encoded.length] =
          hexTable[0xF0 | (surrogatePair >> 18)] +
          hexTable[0x80 | ((surrogatePair >> 12) & 0x3F)] +
          hexTable[0x80 | ((surrogatePair >> 6) & 0x3F)] +
          hexTable[0x80 | (surrogatePair & 0x3F)];
      }
    }

    out += encoded.join("");
  }

  return out;
}

/**
 * Check if value is a Buffer
 */
function isBuffer(obj: any): obj is Buffer {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  return !!(obj.constructor?.isBuffer?.(obj));
}

/**
 * Check if value is a RegExp
 */
function isRegExp(obj: any): obj is RegExp {
  return Object.prototype.toString.call(obj) === "[object RegExp]";
}

/**
 * Apply a function to each element if array, otherwise apply to value directly
 */
function maybeMap<T, R>(val: T | T[], fn: (item: T) => R): R | R[] {
  if (Array.isArray(val)) {
    const mapped: R[] = [];
    for (let i = 0; i < val.length; i += 1) {
      mapped.push(fn(val[i]));
    }
    return mapped;
  }
  return fn(val);
}

/**
 * Deep merge two values with special handling for arrays and objects
 */
function merge<T>(target: T, source: any, options?: PlainObjectsOption): T {
  if (!source) {
    return target;
  }

  if (typeof source !== "object" && typeof source !== "function") {
    if (Array.isArray(target)) {
      target.push(source);
    } else {
      if (!target || typeof target !== "object") {
        return [target, source] as any;
      }

      if (
        (options?.plainObjects || options?.allowPrototypes) ||
        !hasOwnProperty.call(Object.prototype, source)
      ) {
        (target as any)[source] = true;
      }
    }
    return target;
  }

  if (!target || typeof target !== "object") {
    return [target].concat(source) as any;
  }

  let mergeTarget = target;
  if (Array.isArray(target) && !Array.isArray(source)) {
    mergeTarget = arrayToObject(target, options) as any;
  }

  if (Array.isArray(target) && Array.isArray(source)) {
    source.forEach((item, index) => {
      if (hasOwnProperty.call(target, index)) {
        const targetItem = (target as any)[index];
        if (targetItem && typeof targetItem === "object" && item && typeof item === "object") {
          (target as any)[index] = merge(targetItem, item, options);
        } else {
          (target as any).push(item);
        }
      } else {
        (target as any)[index] = item;
      }
    });
    return target;
  }

  return Object.keys(source).reduce((acc, key) => {
    const value = source[key];
    if (hasOwnProperty.call(acc, key)) {
      (acc as any)[key] = merge((acc as any)[key], value, options);
    } else {
      (acc as any)[key] = value;
    }
    return acc;
  }, mergeTarget);
}

export {
  arrayToObject,
  assign,
  combine,
  compact,
  decode,
  encode,
  isBuffer,
  isRegExp,
  maybeMap,
  merge
};