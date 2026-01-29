interface WeakDataStore {
  entries: Array<[object, unknown]>;
}

interface InternalState {
  type: string;
  id: number;
  frozen: WeakDataStore | undefined;
}

interface ConstructorConfig<T> {
  that: T;
  AS_ENTRIES: boolean;
}

type GetWeakDataFn = (target: object, create: boolean) => WeakDataStore | true;
type IsObjectFn = (value: unknown) => value is object;
type IsNullishFn = (value: unknown) => value is null | undefined;
type ForEachFn = (
  iterable: Iterable<unknown>,
  callback: (value: unknown) => void,
  config: ConstructorConfig<unknown>
) => void;

const arraySlice = Array.prototype.splice;

let idCounter = 0;

function getFrozenStore(state: InternalState): WeakDataStore {
  return state.frozen || (state.frozen = new FrozenDataStore());
}

class FrozenDataStore implements WeakDataStore {
  entries: Array<[object, unknown]> = [];

  get(key: object): unknown {
    const entry = findEntry(this, key);
    if (entry) return entry[1];
  }

  has(key: object): boolean {
    return !!findEntry(this, key);
  }

  set(key: object, value: unknown): void {
    const entry = findEntry(this, key);
    if (entry) {
      entry[1] = value;
    } else {
      this.entries.push([key, value]);
    }
  }

  delete(key: object): boolean {
    const index = this.entries.findIndex((entry) => entry[0] === key);
    if (index !== -1) {
      arraySlice.call(this.entries, index, 1);
    }
    return index !== -1;
  }
}

function findEntry(
  store: WeakDataStore,
  key: object
): [object, unknown] | undefined {
  return store.entries.find((entry) => entry[0] === key);
}

export function getConstructor<T extends object>(
  wrapConstructor: (
    fn: (target: T, iterable?: Iterable<unknown>) => void
  ) => new (iterable?: Iterable<unknown>) => T,
  typeName: string,
  isEntriesMode: boolean,
  methodName: keyof T
): new (iterable?: Iterable<unknown>) => T {
  const validateInstance: (instance: unknown, prototype: object) => void =
    arguments[4];
  const setState: (target: object, state: InternalState) => void = arguments[5];
  const getState: (typeName: string) => (target: object) => InternalState =
    arguments[6];
  const getWeakData: GetWeakDataFn = arguments[7];
  const isObject: IsObjectFn = arguments[8];
  const isNullish: IsNullishFn = arguments[9];
  const forEach: ForEachFn = arguments[10];
  const hasOwnProperty = Object.prototype.hasOwnProperty;

  const Constructor = wrapConstructor(
    function (this: T, iterable?: Iterable<unknown>): void {
      validateInstance(this, prototype);
      setState(this, {
        type: typeName,
        id: idCounter++,
        frozen: undefined,
      });
      if (!isNullish(iterable)) {
        forEach(iterable, this[methodName] as (value: unknown) => void, {
          that: this,
          AS_ENTRIES: isEntriesMode,
        });
      }
    }
  );

  const prototype = Constructor.prototype;
  const stateGetter = getState(typeName);

  function setWeakValue(instance: T, key: object, value: unknown): T {
    const state = stateGetter(instance);
    const weakData = getWeakData(isObject(key) ? key : ({} as object), true);

    if (weakData === true) {
      getFrozenStore(state).set(key, value);
    } else {
      (weakData as Record<number, unknown>)[state.id] = value;
    }
    return instance;
  }

  const commonMethods = {
    delete(this: T, key: unknown): boolean {
      const state = stateGetter(this);
      if (!isObject(key)) return false;

      const weakData = getWeakData(key, false);
      if (weakData === true) {
        return getFrozenStore(state).delete(key);
      }
      return (
        weakData &&
        hasOwnProperty.call(weakData, state.id) &&
        delete (weakData as Record<number, unknown>)[state.id]
      );
    },

    has(this: T, key: unknown): boolean {
      const state = stateGetter(this);
      if (!isObject(key)) return false;

      const weakData = getWeakData(key, false);
      if (weakData === true) {
        return getFrozenStore(state).has(key);
      }
      return weakData && hasOwnProperty.call(weakData, state.id);
    },
  };

  const specificMethods = isEntriesMode
    ? {
        get(this: T, key: unknown): unknown {
          const state = stateGetter(this);
          if (isObject(key)) {
            const weakData = getWeakData(key, false);
            if (weakData === true) {
              return getFrozenStore(state).get(key);
            }
            return weakData
              ? (weakData as Record<number, unknown>)[state.id]
              : undefined;
          }
        },

        set(this: T, key: object, value: unknown): T {
          return setWeakValue(this, key, value);
        },
      }
    : {
        add(this: T, key: object): T {
          return setWeakValue(this, key, true);
        },
      };

  Object.assign(prototype, commonMethods, specificMethods);

  return Constructor;
}