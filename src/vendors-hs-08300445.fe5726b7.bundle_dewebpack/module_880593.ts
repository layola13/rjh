export function getValue<T = unknown>(obj: unknown, path: PropertyKey[]): T {
  return get(obj, path);
}

export function setValue<T = unknown>(
  obj: T,
  path: PropertyKey[],
  value: unknown
): T {
  return set(obj, path, value);
}

export function getNamePath(path: PropertyKey | PropertyKey[]): PropertyKey[] {
  return toArray(path);
}

export function defaultGetValueFromEvent(
  valuePropName: string,
  event?: unknown
): unknown {
  const eventTarget = event as { target?: Record<string, unknown> };
  if (eventTarget?.target && valuePropName in eventTarget.target) {
    return eventTarget.target[valuePropName];
  }
  return event;
}

export function cloneByNamePathList<T extends Record<string, unknown>>(
  store: T,
  namePathList: PropertyKey[][]
): Partial<T> {
  let result: Record<string, unknown> = {};
  namePathList.forEach((namePath) => {
    const value = getValue(store, namePath);
    result = setValue(result, namePath, value);
  });
  return result as Partial<T>;
}

export function containsNamePath(
  namePathList: PropertyKey[][] | undefined,
  namePath: PropertyKey[]
): boolean {
  return namePathList?.some((path) => matchNamePath(path, namePath)) ?? false;
}

export function matchNamePath(
  namePath: PropertyKey[] | undefined,
  targetPath: PropertyKey[] | undefined
): boolean {
  if (!namePath || !targetPath || namePath.length !== targetPath.length) {
    return false;
  }
  return namePath.every((key, index) => targetPath[index] === key);
}

export function isSimilar(
  obj1: unknown,
  obj2: unknown
): boolean {
  if (obj1 === obj2) return true;
  if ((!obj1 && obj2) || (obj1 && !obj2)) return false;
  if (
    !obj1 ||
    !obj2 ||
    typeof obj1 !== "object" ||
    typeof obj2 !== "object"
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1 as object);
  const keys2 = Object.keys(obj2 as object);
  const allKeys = new Set([...keys1, ...keys2]);

  return [...allKeys].every((key) => {
    const value1 = (obj1 as Record<string, unknown>)[key];
    const value2 = (obj2 as Record<string, unknown>)[key];
    return (
      (typeof value1 === "function" && typeof value2 === "function") ||
      value1 === value2
    );
  });
}

export function move<T>(array: T[], from: number, to: number): T[] {
  const length = array.length;
  if (from < 0 || from >= length || to < 0 || to >= length) {
    return array;
  }

  const item = array[from];
  const diff = from - to;

  if (diff > 0) {
    return [
      ...array.slice(0, to),
      item,
      ...array.slice(to, from),
      ...array.slice(from + 1, length),
    ];
  }

  if (diff < 0) {
    return [
      ...array.slice(0, from),
      ...array.slice(from + 1, to + 1),
      item,
      ...array.slice(to + 1, length),
    ];
  }

  return array;
}

export function setValues<T extends Record<string, unknown>>(
  initialValue: T,
  ...updates: Partial<T>[]
): T {
  return updates.reduce((accumulator, update) => {
    return mergeObjects(accumulator, update);
  }, initialValue);
}

function get<T = unknown>(obj: unknown, path: PropertyKey[]): T {
  let current: unknown = obj;
  for (const key of path) {
    if (current == null) return undefined as T;
    current = (current as Record<PropertyKey, unknown>)[key];
  }
  return current as T;
}

function set<T>(obj: T, path: PropertyKey[], value: unknown): T {
  if (path.length === 0) return value as T;

  const [key, ...restPath] = path;
  const isArray = Array.isArray(obj);
  const result = (isArray ? [...(obj as unknown[])] : { ...obj }) as Record<
    PropertyKey,
    unknown
  >;

  if (restPath.length === 0) {
    result[key] = value;
  } else {
    result[key] = set(result[key] ?? {}, restPath, value);
  }

  return result as T;
}

function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}

function mergeObjects<T extends Record<string, unknown>>(
  target: T,
  source: Partial<T> | undefined
): T {
  const result: Record<string, unknown> = Array.isArray(target)
    ? [...target]
    : { ...target };

  if (!source) return result as T;

  Object.keys(source).forEach((key) => {
    const targetValue = result[key];
    const sourceValue = source[key as keyof typeof source];
    const shouldMerge = isPlainObject(targetValue) && isPlainObject(sourceValue);

    result[key] = shouldMerge
      ? mergeObjects(targetValue, sourceValue ?? {})
      : sourceValue;
  });

  return result as T;
}