import { getGlobalObject } from './81482';
import { WEB_COLLECTIONS } from './14623';
import { DOMTokenList } from './14805';
import { ArrayIteratorMethods } from './4155';
import { createNonEnumerableProperty } from './71154';
import { getWellKnownSymbol } from './46976';

const ITERATOR_SYMBOL = getWellKnownSymbol('iterator');
const TO_STRING_TAG_SYMBOL = getWellKnownSymbol('toStringTag');
const ARRAY_VALUES_METHOD = ArrayIteratorMethods.values;

interface IterablePrototype {
  [key: symbol]: unknown;
  [key: string]: unknown;
}

/**
 * Patches a prototype object to add iterator methods and toStringTag
 * @param prototype - The prototype object to patch
 * @param tag - The string tag name for the collection type
 */
function patchCollectionPrototype(
  prototype: IterablePrototype | null | undefined,
  tag: string
): void {
  if (!prototype) {
    return;
  }

  // Add iterator symbol if not already set to values method
  if (prototype[ITERATOR_SYMBOL] !== ARRAY_VALUES_METHOD) {
    try {
      createNonEnumerableProperty(prototype, ITERATOR_SYMBOL, ARRAY_VALUES_METHOD);
    } catch {
      prototype[ITERATOR_SYMBOL] = ARRAY_VALUES_METHOD;
    }
  }

  // Add toStringTag if not present
  if (!prototype[TO_STRING_TAG_SYMBOL]) {
    createNonEnumerableProperty(prototype, TO_STRING_TAG_SYMBOL, tag);
  }

  // Patch with all array iterator methods if this is a known web collection
  if (WEB_COLLECTIONS[tag]) {
    for (const methodName in ArrayIteratorMethods) {
      const arrayMethod = ArrayIteratorMethods[methodName];
      if (prototype[methodName] !== arrayMethod) {
        try {
          createNonEnumerableProperty(prototype, methodName, arrayMethod);
        } catch {
          prototype[methodName] = arrayMethod;
        }
      }
    }
  }
}

// Patch all known web collection prototypes
const globalObject = getGlobalObject();
for (const collectionName in WEB_COLLECTIONS) {
  const constructor = globalObject[collectionName];
  patchCollectionPrototype(constructor?.prototype, collectionName);
}

// Patch DOMTokenList specifically
patchCollectionPrototype(DOMTokenList, 'DOMTokenList');