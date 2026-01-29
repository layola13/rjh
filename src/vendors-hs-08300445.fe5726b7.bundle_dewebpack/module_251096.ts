export const defaultNamespace = "/";

interface ActionMap {
  [key: string]: any;
}

interface ActionCreators {
  [key: string]: Function | ActionCreators;
}

function isPlainObject(value: unknown): boolean {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}

function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function flattenActionMap(
  actionMap: ActionMap,
  namespace: string = defaultNamespace,
  result: ActionMap = {},
  prefix: string = ""
): ActionMap {
  Object.getOwnPropertyNames(actionMap).forEach((key) => {
    const fullKey = prefix ? `${prefix}${namespace}${key}` : key;
    const value = actionMap[key];

    if (isPlainObject(value)) {
      flattenActionMap(value, namespace, result, fullKey);
    } else {
      result[fullKey] = value;
    }
  });

  return result;
}

export function unflattenActionCreators(
  actionCreators: ActionCreators,
  namespace: string = defaultNamespace
): ActionCreators {
  function buildNestedStructure(
    key: string,
    target: ActionCreators = {},
    pathSegments: string[] = []
  ): void {
    const capitalizedSegment = capitalize(pathSegments.shift() ?? "");

    if (pathSegments.length > 0) {
      if (!target[capitalizedSegment]) {
        target[capitalizedSegment] = {};
      }
      buildNestedStructure(key, target[capitalizedSegment] as ActionCreators, pathSegments);
    } else {
      target[capitalizedSegment] = actionCreators[key];
    }
  }

  const result: ActionCreators = {};

  Object.getOwnPropertyNames(actionCreators).forEach((key) => {
    buildNestedStructure(key, result, key.split(namespace));
  });

  return result;
}