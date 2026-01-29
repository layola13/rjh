interface StateData {
  facade?: any;
  type?: string;
  [key: string]: any;
}

type WeakMapState = WeakMap<object, StateData>;

interface InternalState {
  set: (target: object, state: StateData) => StateData;
  get: (target: object) => StateData;
  has: (target: object) => boolean;
  enforce: (target: object) => StateData;
  getterFor: (type: string) => (target: any) => StateData;
}

import { getNativeWeakMap } from './native-weak-map';
import { global } from './global';
import { isObject } from './is-object';
import { createNonEnumerableProperty } from './create-non-enumerable-property';
import { hasOwnProperty } from './has-own-property';
import { sharedKey } from './shared-key';
import { hiddenKeys } from './hidden-keys';

const OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
const TypeError = global.TypeError;
const NativeWeakMap = global.WeakMap;

let set: (target: object, state: StateData) => StateData;
let get: (target: object) => StateData;
let has: (target: object) => boolean;

const supportsNativeWeakMap = getNativeWeakMap();
const stateStorage = supportsNativeWeakMap 
  ? (new NativeWeakMap() as WeakMapState)
  : undefined;

if (supportsNativeWeakMap && stateStorage) {
  const weakMapGet = stateStorage.get;
  const weakMapHas = stateStorage.has;
  const weakMapSet = stateStorage.set;

  set = (target: object, state: StateData): StateData => {
    if (weakMapHas.call(stateStorage, target)) {
      throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    }
    state.facade = target;
    weakMapSet.call(stateStorage, target, state);
    return state;
  };

  get = (target: object): StateData => {
    return weakMapGet.call(stateStorage, target) ?? {};
  };

  has = (target: object): boolean => {
    return weakMapHas.call(stateStorage, target);
  };
} else {
  const STATE_KEY = sharedKey('state');
  hiddenKeys[STATE_KEY] = true;

  set = (target: object, state: StateData): StateData => {
    if (hasOwnProperty(target, STATE_KEY)) {
      throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    }
    state.facade = target;
    createNonEnumerableProperty(target, STATE_KEY, state);
    return state;
  };

  get = (target: object): StateData => {
    return hasOwnProperty(target, STATE_KEY) 
      ? (target as any)[STATE_KEY] 
      : {};
  };

  has = (target: object): boolean => {
    return hasOwnProperty(target, STATE_KEY);
  };
}

const enforce = (target: object): StateData => {
  return has(target) ? get(target) : set(target, {});
};

const getterFor = (type: string) => {
  return (target: any): StateData => {
    let state: StateData;
    if (!isObject(target) || (state = get(target)).type !== type) {
      throw new TypeError(`Incompatible receiver, ${type} required`);
    }
    return state;
  };
};

export const internalState: InternalState = {
  set,
  get,
  has,
  enforce,
  getterFor
};