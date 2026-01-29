interface InternalState {
  facade?: any;
  type?: string;
  [key: string]: any;
}

interface StateManager {
  set: (target: object, state: InternalState) => InternalState;
  get: (target: object) => InternalState;
  has: (target: object) => boolean;
  enforce: (target: object) => InternalState;
  getterFor: (type: string) => (target: any) => InternalState;
}

import { NATIVE_WEAK_MAP } from './native-weak-map';
import { global } from './global';
import { isObject } from './is-object';
import { createNonEnumerableProperty } from './create-non-enumerable-property';
import { hasOwnProperty } from './has-own-property';
import { sharedStore } from './shared-store';
import { sharedKey } from './shared-key';
import { hiddenKeys } from './hidden-keys';

const OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
const TypeError = global.TypeError;
const WeakMap = global.WeakMap;

let set: (target: object, state: InternalState) => InternalState;
let get: (target: object) => InternalState;
let has: (target: object) => boolean;

if (NATIVE_WEAK_MAP || sharedStore.state) {
  const store = sharedStore.state || (sharedStore.state = new WeakMap<object, InternalState>());
  
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;

  set = (target: object, state: InternalState): InternalState => {
    if (store.has(target)) {
      throw TypeError(OBJECT_ALREADY_INITIALIZED);
    }
    state.facade = target;
    store.set(target, state);
    return state;
  };

  get = (target: object): InternalState => {
    return store.get(target) || {};
  };

  has = (target: object): boolean => {
    return store.has(target);
  };
} else {
  const STATE_KEY = sharedKey('state');
  hiddenKeys[STATE_KEY] = true;

  set = (target: object, state: InternalState): InternalState => {
    if (hasOwnProperty(target, STATE_KEY)) {
      throw TypeError(OBJECT_ALREADY_INITIALIZED);
    }
    state.facade = target;
    createNonEnumerableProperty(target, STATE_KEY, state);
    return state;
  };

  get = (target: object): InternalState => {
    return hasOwnProperty(target, STATE_KEY) ? (target as any)[STATE_KEY] : {};
  };

  has = (target: object): boolean => {
    return hasOwnProperty(target, STATE_KEY);
  };
}

const enforce = (target: object): InternalState => {
  return has(target) ? get(target) : set(target, {});
};

const getterFor = (type: string) => {
  return (target: any): InternalState => {
    let state: InternalState;
    if (!isObject(target) || (state = get(target)).type !== type) {
      throw TypeError(`Incompatible receiver, ${type} required`);
    }
    return state;
  };
};

export const internalState: StateManager = {
  set,
  get,
  has,
  enforce,
  getterFor
};