type SideChannelKey = object | Function;
type SideChannelValue = unknown;

interface SideChannel {
  assert(key: SideChannelKey): void;
  delete(key: SideChannelKey): boolean;
  get(key: SideChannelKey): SideChannelValue | undefined;
  has(key: SideChannelKey): boolean;
  set(key: SideChannelKey, value: SideChannelValue): void;
}

type SideChannelFactory = () => SideChannel;
type FallbackMapFactory = () => Map<SideChannelKey, SideChannelValue>;

import typeOf from './type-of';
import getIntrinsic from './get-intrinsic';
import getMethod from './get-method';
import inspect from './inspect';
import assertError from './assert-error';
import fallbackMapFactory from './fallback-map-factory';

const WeakMapConstructor = getIntrinsic<WeakMapConstructor | undefined>('%WeakMap%', true);
const weakMapGet = getMethod<(map: WeakMap<SideChannelKey, SideChannelValue>, key: SideChannelKey) => SideChannelValue | undefined>('WeakMap.prototype.get', true);
const weakMapSet = getMethod<(map: WeakMap<SideChannelKey, SideChannelValue>, key: SideChannelKey, value: SideChannelValue) => void>('WeakMap.prototype.set', true);
const weakMapHas = getMethod<(map: WeakMap<SideChannelKey, SideChannelValue>, key: SideChannelKey) => boolean>('WeakMap.prototype.has', true);
const weakMapDelete = getMethod<(map: WeakMap<SideChannelKey, SideChannelValue>, key: SideChannelKey) => boolean>('WeakMap.prototype.delete', true);

const createSideChannel: SideChannelFactory | FallbackMapFactory = WeakMapConstructor
  ? function createWeakMapSideChannel(): SideChannel {
      let weakMap: WeakMap<SideChannelKey, SideChannelValue> | undefined;
      let fallbackMap: Map<SideChannelKey, SideChannelValue> | undefined;

      const sideChannel: SideChannel = {
        assert(key: SideChannelKey): void {
          if (!sideChannel.has(key)) {
            throw new assertError(`Side channel does not contain ${inspect(key)}`);
          }
        },

        delete(key: SideChannelKey): boolean {
          if (WeakMapConstructor && key && (typeof key === 'object' || typeof key === 'function')) {
            if (weakMap) {
              return weakMapDelete(weakMap, key);
            }
          } else if (fallbackMapFactory && fallbackMap) {
            return fallbackMap.delete(key);
          }
          return false;
        },

        get(key: SideChannelKey): SideChannelValue | undefined {
          if (WeakMapConstructor && key && (typeof key === 'object' || typeof key === 'function') && weakMap) {
            return weakMapGet(weakMap, key);
          }
          return fallbackMap?.get(key);
        },

        has(key: SideChannelKey): boolean {
          if (WeakMapConstructor && key && (typeof key === 'object' || typeof key === 'function') && weakMap) {
            return weakMapHas(weakMap, key);
          }
          return fallbackMap ? fallbackMap.has(key) : false;
        },

        set(key: SideChannelKey, value: SideChannelValue): void {
          if (WeakMapConstructor && key && (typeof key === 'object' || typeof key === 'function')) {
            if (!weakMap) {
              weakMap = new WeakMapConstructor();
            }
            weakMapSet(weakMap, key, value);
          } else if (fallbackMapFactory) {
            if (!fallbackMap) {
              fallbackMap = fallbackMapFactory();
            }
            fallbackMap.set(key, value);
          }
        }
      };

      return sideChannel;
    }
  : fallbackMapFactory;

export default createSideChannel;