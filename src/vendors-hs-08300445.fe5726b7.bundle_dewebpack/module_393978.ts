export interface MergeOptions {
  deleteUndefined?: boolean;
}

type PathSegment = string | number;
type Path = PathSegment[];

function getValueAtPath(obj: any, path: Path): any {
  return path.reduce((current, key) => current?.[key], obj);
}

function cloneShallow<T>(value: T): T {
  if (Array.isArray(value)) {
    return [...value] as T;
  }
  return { ...value };
}

function isPlainObject(value: unknown): value is Record<string | number | symbol, any> {
  return (
    typeof value === 'object' &&
    value !== null &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}

function createEmptyContainer(value: unknown): Record<string | number | symbol, any> | any[] {
  return Array.isArray(value) ? [] : {};
}

const getOwnKeys: (obj: any) => (string | symbol)[] =
  typeof Reflect !== 'undefined' ? Reflect.ownKeys : Object.keys;

function setValueAtPath(
  target: any,
  path: Path,
  value: any,
  shouldDelete: boolean
): any {
  if (path.length === 0) {
    return value;
  }

  const [firstKey, ...restPath] = path;
  const isTargetArrayLike = target || typeof firstKey !== 'number';
  
  let result: any;
  if (isTargetArrayLike) {
    result = Array.isArray(target) ? [...target] : { ...target };
  } else {
    result = [];
  }

  if (shouldDelete && value === undefined && restPath.length === 1) {
    delete result[firstKey][restPath[0]];
  } else {
    result[firstKey] = setValueAtPath(result[firstKey], restPath, value, shouldDelete);
  }

  return result;
}

function setImmutable(
  target: any,
  path: Path,
  value: any,
  shouldDelete: boolean = false
): any {
  if (path.length && shouldDelete && value === undefined && !getValueAtPath(target, path.slice(0, -1))) {
    return target;
  }
  return setValueAtPath(target, path, value, shouldDelete);
}

export function merge<T extends Record<string | number | symbol, any>>(...sources: T[]): T {
  if (sources.length === 0) {
    return {} as T;
  }

  let result = createEmptyContainer(sources[0]);

  sources.forEach((source) => {
    function mergeRecursive(currentPath: Path, visited: Set<any> = new Set()): void {
      const sourceValue = getValueAtPath(source, currentPath);
      const isArray = Array.isArray(sourceValue);
      const isPlainObj = isPlainObject(sourceValue);

      if (isArray || isPlainObj) {
        if (!visited.has(sourceValue)) {
          visited.add(sourceValue);

          const resultValue = getValueAtPath(result, currentPath);

          if (isArray) {
            result = setImmutable(result, currentPath, []);
          } else if (!resultValue || typeof resultValue !== 'object') {
            result = setImmutable(result, currentPath, createEmptyContainer(sourceValue));
          }

          getOwnKeys(sourceValue).forEach((key) => {
            mergeRecursive([...currentPath, key], visited);
          });
        }
      } else {
        result = setImmutable(result, currentPath, sourceValue);
      }
    }

    mergeRecursive([]);
  });

  return result as T;
}

export default setImmutable;