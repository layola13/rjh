import { getWellKnownSymbol } from './wellKnownSymbols';
import { createObject } from './objectCreation';
import { defineProperty } from './objectDefinition';

const unscopablesSymbol = getWellKnownSymbol('unscopables');
const arrayPrototype = Array.prototype;

if (arrayPrototype[unscopablesSymbol] == null) {
  defineProperty(arrayPrototype, unscopablesSymbol, {
    configurable: true,
    value: createObject(null)
  });
}

export function addToUnscopables(propertyName: string): void {
  arrayPrototype[unscopablesSymbol][propertyName] = true;
}