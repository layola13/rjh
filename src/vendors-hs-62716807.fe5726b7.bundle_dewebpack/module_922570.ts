import createSymbol from './module_446898';
import createObject from './module_594225';
import { f as defineProperty } from './module_656378';

const unscopablesSymbol = createSymbol('unscopables');
const arrayPrototype = Array.prototype;

if (arrayPrototype[unscopablesSymbol] == null) {
  defineProperty(arrayPrototype, unscopablesSymbol, {
    configurable: true,
    value: createObject(null)
  });
}

export default function addToUnscopables(propertyName: string): void {
  arrayPrototype[unscopablesSymbol][propertyName] = true;
}