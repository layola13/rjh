import baseGetTag from './baseGetTag';
import toSource from './toSource';

const mapTag = '[object Map]';
const promiseTag = '[object Promise]';
const setTag = '[object Set]';
const weakMapTag = '[object WeakMap]';
const dataViewTag = '[object DataView]';

interface Constructor {
  new (...args: any[]): any;
}

interface TaggableValue {
  constructor?: Constructor;
}

/**
 * Gets the `toStringTag` of `value`.
 * Falls back to checking constructor source when native tags are inconsistent.
 * 
 * @param value - The value to query
 * @returns The resolved tag string
 */
function getTag(value: unknown): string {
  return baseGetTag(value);
}

// Fallback for environments where native toStringTag is unreliable
let resolvedGetTag = getTag;

// Check if we need the enhanced tag resolution
const needsFallback = (
  (typeof DataView !== 'undefined' && baseGetTag(new DataView(new ArrayBuffer(1))) !== dataViewTag) ||
  (typeof Map !== 'undefined' && baseGetTag(new Map()) !== mapTag) ||
  (typeof Promise !== 'undefined' && baseGetTag(Promise.resolve()) !== promiseTag) ||
  (typeof Set !== 'undefined' && baseGetTag(new Set()) !== setTag) ||
  (typeof WeakMap !== 'undefined' && baseGetTag(new WeakMap()) !== weakMapTag)
);

if (needsFallback) {
  const dataViewSource = typeof DataView !== 'undefined' ? toSource(DataView) : '';
  const mapSource = typeof Map !== 'undefined' ? toSource(Map) : '';
  const promiseSource = typeof Promise !== 'undefined' ? toSource(Promise) : '';
  const setSource = typeof Set !== 'undefined' ? toSource(Set) : '';
  const weakMapSource = typeof WeakMap !== 'undefined' ? toSource(WeakMap) : '';

  resolvedGetTag = function(value: unknown): string {
    const baseTag = baseGetTag(value);
    
    if (baseTag === '[object Object]' && value !== null && typeof value === 'object') {
      const typedValue = value as TaggableValue;
      const constructor = typedValue.constructor;
      
      if (constructor !== undefined) {
        const constructorSource = toSource(constructor);
        
        if (constructorSource) {
          switch (constructorSource) {
            case dataViewSource:
              return dataViewTag;
            case mapSource:
              return mapTag;
            case promiseSource:
              return promiseTag;
            case setSource:
              return setTag;
            case weakMapSource:
              return weakMapTag;
          }
        }
      }
    }
    
    return baseTag;
  };
}

export default resolvedGetTag;