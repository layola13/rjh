import { DESCRIPTORS } from './51545';
import { global } from './81482';
import { uncurryThis } from './61259';
import { defineBuiltIns } from './14890';
import { InternalState } from './1540';
import { defineBuiltIn } from './16257';
import { createCollectionConstructor } from './99622';
import { isObject } from './17029';
import { enforceInternalState } from './86812';
import { fails } from './87524';
import { NATIVE_WEAK_MAP } from './67711';

interface FrozenState {
  frozen?: WeakMap<object, unknown>;
}

const ObjectConstructor = Object;
const isArray = Array.isArray;
const isExtensible = ObjectConstructor.isExtensible;
const isFrozen = ObjectConstructor.isFrozen;
const isSealed = ObjectConstructor.isSealed;
const freeze = ObjectConstructor.freeze;
const seal = ObjectConstructor.seal;

const FROZEN_MARKER = {};
const SEALED_MARKER = {};

const hasActiveXObjectBug = !global.ActiveXObject && "ActiveXObject" in global;

const wrapper = <K extends object, V>(callback: (target: unknown, key: K | undefined) => WeakMap<K, V>) => {
  return function (this: WeakMap<K, V>, key?: K): WeakMap<K, V> {
    return callback(this, arguments.length ? key : undefined);
  };
};

const WeakMapConstructor = defineBuiltIn("WeakMap", wrapper, createCollectionConstructor);
const WeakMapPrototype = WeakMapConstructor.prototype;
const nativeSet = uncurryThis(WeakMapPrototype.set);

let fallbackWeakMap: typeof WeakMapConstructor | undefined;

if (NATIVE_WEAK_MAP) {
  if (hasActiveXObjectBug) {
    fallbackWeakMap = createCollectionConstructor.getConstructor(wrapper, "WeakMap", true);
    InternalState.enable();

    const nativeDelete = uncurryThis(WeakMapPrototype.delete);
    const nativeHas = uncurryThis(WeakMapPrototype.has);
    const nativeGet = uncurryThis(WeakMapPrototype.get);

    defineBuiltIns(WeakMapPrototype, {
      delete: function <K extends object>(key: K): boolean {
        if (isObject(key) && !isExtensible(key)) {
          const state = enforceInternalState<FrozenState>(this);
          if (!state.frozen) {
            state.frozen = new fallbackWeakMap!();
          }
          return nativeDelete(this, key) || state.frozen.delete(key);
        }
        return nativeDelete(this, key);
      },
      
      has: function <K extends object>(key: K): boolean {
        if (isObject(key) && !isExtensible(key)) {
          const state = enforceInternalState<FrozenState>(this);
          if (!state.frozen) {
            state.frozen = new fallbackWeakMap!();
          }
          return nativeHas(this, key) || state.frozen.has(key);
        }
        return nativeHas(this, key);
      },
      
      get: function <K extends object, V>(key: K): V | undefined {
        if (isObject(key) && !isExtensible(key)) {
          const state = enforceInternalState<FrozenState>(this);
          if (!state.frozen) {
            state.frozen = new fallbackWeakMap!();
          }
          return nativeHas(this, key) ? nativeGet(this, key) : state.frozen.get(key);
        }
        return nativeGet(this, key);
      },
      
      set: function <K extends object, V>(key: K, value: V): WeakMap<K, V> {
        if (isObject(key) && !isExtensible(key)) {
          const state = enforceInternalState<FrozenState>(this);
          if (!state.frozen) {
            state.frozen = new fallbackWeakMap!();
          }
          if (nativeHas(this, key)) {
            nativeSet(this, key, value);
          } else {
            state.frozen.set(key, value);
          }
        } else {
          nativeSet(this, key, value);
        }
        return this;
      }
    });
  } else if (DESCRIPTORS && fails(() => {
    const frozenArray = freeze([]);
    nativeSet(new WeakMapConstructor(), frozenArray, 1);
    return !isFrozen(frozenArray);
  })) {
    defineBuiltIns(WeakMapPrototype, {
      set: function <K extends object, V>(key: K, value: V): WeakMap<K, V> {
        let marker: object | undefined;
        
        if (isArray(key)) {
          if (isFrozen(key)) {
            marker = FROZEN_MARKER;
          } else if (isSealed(key)) {
            marker = SEALED_MARKER;
          }
        }
        
        nativeSet(this, key, value);
        
        if (marker === FROZEN_MARKER) {
          freeze(key);
        }
        if (marker === SEALED_MARKER) {
          seal(key);
        }
        
        return this;
      }
    });
  }
}