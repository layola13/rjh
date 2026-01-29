/**
 * Performs a deep equality comparison between two values.
 * @param value1 - The first value to compare
 * @param value2 - The second value to compare
 * @param shallow - If true, only compares one level deep
 * @returns True if the values are deeply equal, false otherwise
 */
function deepEqual<T = unknown>(
  value1: T,
  value2: T,
  shallow: boolean = false
): boolean {
  const visited = new Set<unknown>();

  function compare(
    current: unknown,
    target: unknown,
    depth: number = 1
  ): boolean {
    const hasCircularReference = visited.has(current);

    if (hasCircularReference) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Warning: There may be circular references');
      }
      return false;
    }

    if (current === target) {
      return true;
    }

    if (shallow && depth > 1) {
      return false;
    }

    visited.add(current);
    const nextDepth = depth + 1;

    if (Array.isArray(current)) {
      if (!Array.isArray(target) || current.length !== target.length) {
        return false;
      }

      for (let index = 0; index < current.length; index++) {
        if (!compare(current[index], target[index], nextDepth)) {
          return false;
        }
      }

      return true;
    }

    if (
      current &&
      target &&
      typeof current === 'object' &&
      typeof target === 'object'
    ) {
      const currentKeys = Object.keys(current);
      const targetKeys = Object.keys(target);

      return (
        currentKeys.length === targetKeys.length &&
        currentKeys.every((key) => {
          return compare(
            (current as Record<string, unknown>)[key],
            (target as Record<string, unknown>)[key],
            nextDepth
          );
        })
      );
    }

    return false;
  }

  return compare(value1, value2);
}

export default deepEqual;