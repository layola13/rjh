type Operation = 'replace' | 'add' | 'remove';

interface Patch {
  path: (string | number)[];
  op: Operation;
  value?: unknown;
}

type CollectionType = 0 | 1 | 2 | 3;

const ARRAY_TYPE: CollectionType = 1;
const MAP_TYPE: CollectionType = 2;
const SET_TYPE: CollectionType = 3;

function applyPatches<T>(target: T, patches: Patch[]): T {
  patches.forEach((patch) => {
    const { path, op, value } = patch;
    let current: any = target;

    for (let i = 0; i < path.length - 1; i++) {
      const containerType = getCollectionType(current);
      let key = path[i];

      if (typeof key !== 'string' && typeof key !== 'number') {
        key = String(key);
      }

      if (
        (containerType === 0 || containerType === 1) &&
        (key === '__proto__' || key === 'constructor')
      ) {
        throw new Error('Cannot modify __proto__ or constructor');
      }

      if (typeof current === 'function' && key === 'prototype') {
        throw new Error('Cannot modify function prototype');
      }

      current = getProperty(current, key);

      if (typeof current !== 'object') {
        throw new Error(`Invalid path: ${path.join('/')}`);
      }
    }

    const containerType = getCollectionType(current);
    const clonedValue = cloneValue(value);
    const lastKey = path[path.length - 1];

    switch (op) {
      case 'replace':
        switch (containerType) {
          case MAP_TYPE:
            return current.set(lastKey, clonedValue);
          case SET_TYPE:
            throw new Error('Cannot replace in Set');
          default:
            return (current[lastKey] = clonedValue);
        }

      case 'add':
        switch (containerType) {
          case ARRAY_TYPE:
            return lastKey === '-'
              ? current.push(clonedValue)
              : current.splice(lastKey as number, 0, clonedValue);
          case MAP_TYPE:
            return current.set(lastKey, clonedValue);
          case SET_TYPE:
            return current.add(clonedValue);
          default:
            return (current[lastKey] = clonedValue);
        }

      case 'remove':
        switch (containerType) {
          case ARRAY_TYPE:
            return current.splice(lastKey as number, 1);
          case MAP_TYPE:
            return current.delete(lastKey);
          case SET_TYPE:
            return current.delete(value);
          default:
            return delete current[lastKey];
        }

      default:
        throw new Error(`Unknown operation: ${op}`);
    }
  });

  return target;
}

function getCollectionType(obj: unknown): CollectionType {
  if (Array.isArray(obj)) return ARRAY_TYPE;
  if (obj instanceof Map) return MAP_TYPE;
  if (obj instanceof Set) return SET_TYPE;
  return 0;
}

function getProperty(obj: any, key: string | number): unknown {
  return obj[key];
}

function cloneValue<T>(value: T): T {
  return value;
}