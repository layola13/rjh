import { exportFunction } from './utils/export';
import { arrayMethod } from './utils/array';
import { hiddenKeys } from './utils/hidden-keys';
import { isObject } from './utils/is-object';
import { hasOwnProperty } from './utils/has-own-property';
import { defineProperty } from './utils/define-property';
import { getOwnPropertyNames } from './utils/get-own-property-names';
import { getOwnPropertyNamesExt } from './utils/get-own-property-names-ext';
import { isExtensible } from './utils/is-extensible';
import { uid } from './utils/uid';
import { freezeSupport } from './utils/freeze-support';

interface MetaData {
  objectID: string;
  weakData: Record<string, unknown>;
}

interface InternalMeta {
  enable: () => void;
  fastKey: (target: unknown, create: boolean) => string | symbol | boolean;
  getWeakData: (target: unknown, create: boolean) => Record<string, unknown> | boolean;
  onFreeze: <T>(target: T) => T;
}

let metadataEnabled = false;
const META_KEY = uid('meta');
let objectIDCounter = 0;

const addMetadata = (target: object): void => {
  defineProperty(target, META_KEY, {
    value: {
      objectID: `O${objectIDCounter++}`,
      weakData: {}
    }
  });
};

export const internalMetadata: InternalMeta = {
  enable(): void {
    internalMetadata.enable = function (): void {};
    metadataEnabled = true;

    const originalGetOwnPropertyNames = getOwnPropertyNames.f;
    const splice = arrayMethod([].splice);
    const testObject: Record<symbol, number> = {};
    testObject[META_KEY] = 1;

    if (originalGetOwnPropertyNames(testObject).length) {
      getOwnPropertyNames.f = function (target: object): PropertyKey[] {
        const properties = originalGetOwnPropertyNames(target);
        
        for (let index = 0, length = properties.length; index < length; index++) {
          if (properties[index] === META_KEY) {
            splice(properties, index, 1);
            break;
          }
        }
        
        return properties;
      };

      exportFunction({
        target: 'Object',
        stat: true,
        forced: true
      }, {
        getOwnPropertyNames: getOwnPropertyNamesExt.f
      });
    }
  },

  fastKey(target: unknown, create: boolean): string | symbol | boolean {
    if (!isObject(target)) {
      return typeof target === 'symbol' 
        ? target 
        : (typeof target === 'string' ? 'S' : 'P') + target;
    }

    if (!hasOwnProperty(target, META_KEY)) {
      if (!isExtensible(target)) return 'F';
      if (!create) return 'E';
      addMetadata(target);
    }

    return (target as Record<symbol, MetaData>)[META_KEY].objectID;
  },

  getWeakData(target: unknown, create: boolean): Record<string, unknown> | boolean {
    if (!hasOwnProperty(target, META_KEY)) {
      if (!isExtensible(target)) return true;
      if (!create) return false;
      addMetadata(target as object);
    }

    return (target as Record<symbol, MetaData>)[META_KEY].weakData;
  },

  onFreeze<T>(target: T): T {
    if (
      freezeSupport && 
      metadataEnabled && 
      isExtensible(target) && 
      !hasOwnProperty(target, META_KEY)
    ) {
      addMetadata(target as object);
    }
    
    return target;
  }
};

hiddenKeys[META_KEY] = true;