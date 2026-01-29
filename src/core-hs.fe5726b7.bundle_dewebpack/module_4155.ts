import { toIndexedObject } from './toIndexedObject';
import { addToUnscopables } from './addToUnscopables';
import { Arguments } from './iterators';
import { InternalStateModule } from './internalState';
import { defineProperty } from './objectDefineProperty';
import { defineIterator } from './defineIterator';
import { createIterResultObject } from './createIterResultObject';
import { IS_PURE } from './env';
import { DESCRIPTORS } from './descriptors';

interface ArrayIteratorState {
  type: 'Array Iterator';
  target: any[];
  index: number;
  kind: 'keys' | 'values' | 'entries';
}

const ARRAY_ITERATOR = 'Array Iterator';
const setInternalState = InternalStateModule.set;
const getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

defineIterator(
  Array,
  'Array',
  function(this: any, target: any, kind: 'keys' | 'values' | 'entries'): void {
    setInternalState(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject(target),
      index: 0,
      kind: kind
    });
  },
  function(this: any): IteratorResult<any> {
    const state = getInternalState(this) as ArrayIteratorState;
    const target = state.target;
    const kind = state.kind;
    const index = state.index++;

    if (!target || index >= target.length) {
      state.target = undefined;
      return createIterResultObject(undefined, true);
    }

    if (kind === 'keys') {
      return createIterResultObject(index, false);
    }
    if (kind === 'values') {
      return createIterResultObject(target[index], false);
    }
    return createIterResultObject([index, target[index]], false);
  },
  'values'
);

const ArrayPrototypeIterator = Arguments;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

if (!IS_PURE && DESCRIPTORS && ArrayPrototypeIterator.name !== 'values') {
  try {
    defineProperty(ArrayPrototypeIterator, 'name', {
      value: 'values'
    });
  } catch (error) {
    // Ignore errors when trying to set the name property
  }
}

export {};