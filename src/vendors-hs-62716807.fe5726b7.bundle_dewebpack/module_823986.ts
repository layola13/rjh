interface PropertyDescriptor {
  configurable?: boolean;
  enumerable?: boolean;
  value?: any;
  writable?: boolean;
  get?(): any;
  set?(v: any): void;
}

interface DefinePropertyFunction {
  (target: object, propertyKey: PropertyKey, descriptor: PropertyDescriptor): void;
}

interface HasOwnPropertyFunction {
  (target: object, propertyKey: PropertyKey): boolean;
}

interface WellKnownSymbolFunction {
  (name: string): symbol;
}

import { f as defineProperty } from './656378';
import hasOwnProperty from './791914';
import getWellKnownSymbol from './446898';

const TO_STRING_TAG = 'toStringTag';

/**
 * Sets the toStringTag symbol on the target object if it doesn't already exist.
 * 
 * @param target - The target object or constructor function
 * @param tagValue - The string tag value to set
 * @param usePrototype - Whether to use the target's prototype instead of the target itself
 */
export default function setToStringTag(
  target: any,
  tagValue: string,
  usePrototype: boolean = false
): void {
  let targetObject = target;

  if (targetObject && !usePrototype) {
    targetObject = targetObject.prototype;
  }

  if (targetObject && !hasOwnProperty(targetObject, getWellKnownSymbol(TO_STRING_TAG))) {
    defineProperty(targetObject, getWellKnownSymbol(TO_STRING_TAG), {
      configurable: true,
      value: tagValue
    });
  }
}