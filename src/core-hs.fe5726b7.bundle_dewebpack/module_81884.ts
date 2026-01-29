/**
 * Converts an object with circular references into a JSON-serializable structure
 * by replacing circular references with path references.
 * 
 * @param obj - The object to decycle
 * @param replacer - Optional function to transform values during decycling
 * @returns A decycled object safe for JSON serialization
 */
export function JSONDecycle<T = unknown>(
  obj: T,
  replacer?: (value: unknown) => unknown
): unknown {
  const paths = new WeakMap<object, string>();

  function decycle(value: unknown, path: string): unknown {
    if (replacer !== undefined) {
      value = replacer(value);
    }

    if (
      typeof value !== "object" ||
      value === null ||
      value instanceof Boolean ||
      value instanceof Date ||
      value instanceof Number ||
      value instanceof RegExp ||
      value instanceof String
    ) {
      return value;
    }

    const existingPath = paths.get(value as object);
    if (existingPath !== undefined) {
      return { $ref: existingPath };
    }

    paths.set(value as object, path);

    if (Array.isArray(value)) {
      const result: unknown[] = [];
      value.forEach((item, index) => {
        result[index] = decycle(item, `${path}[${index}]`);
      });
      return result;
    }

    const result: Record<string, unknown> = {};
    Object.keys(value).forEach((key) => {
      let propertyValue: unknown;
      try {
        propertyValue = (value as Record<string, unknown>)[key];
      } catch (error) {
        console.error(
          `JSONDecycle: exception thrown on property '${key}': ${error}`
        );
        return;
      }
      result[key] = decycle(propertyValue, `${path}[${JSON.stringify(key)}]`);
    });
    return result;
  }

  return decycle(obj, "$");
}

/**
 * Restores an object that was decycled by JSONDecycle, reconstructing
 * circular references from path references.
 * 
 * @param obj - The decycled object to restore
 * @returns The restored object with circular references
 */
export function JSONRetrocycle<T = unknown>(obj: T): T {
  const pathPattern = /^\$(?:\[(?:\d+|"(?:[^\\"\u0000-\u001f]|\\(?:[\\"\/bfnrt]|u[0-9a-zA-Z]{4}))*")\])*$/;

  function retrocycle(value: unknown): void {
    if (!value || typeof value !== "object") {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((element, index) => {
        if (typeof element === "object" && element !== null) {
          const ref = (element as { $ref?: string }).$ref;
          if (typeof ref === "string" && pathPattern.test(ref)) {
            value[index] = eval(ref);
          } else {
            retrocycle(element);
          }
        }
      });
    } else {
      Object.keys(value).forEach((name) => {
        const item = (value as Record<string, unknown>)[name];
        if (typeof item === "object" && item !== null) {
          const ref = (item as { $ref?: string }).$ref;
          if (typeof ref === "string" && pathPattern.test(ref)) {
            (value as Record<string, unknown>)[name] = eval(ref);
          } else {
            retrocycle(item);
          }
        }
      });
    }
  }

  retrocycle(obj);
  return obj;
}