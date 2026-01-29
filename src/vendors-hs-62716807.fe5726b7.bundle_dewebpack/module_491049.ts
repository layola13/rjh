import { toIndexedObject } from './to-indexed-object';
import { addToUnscopables } from './add-to-unscopables';
import { iterators } from './iterators';
import { internalState } from './internal-state';
import { defineProperty } from './object-define-property';
import { createIteratorConstructor } from './create-iterator-constructor';
import { createIterResultObject } from './create-iter-result-object';
import { isForced } from './is-forced';
import { descriptors } from './descriptors';

type IteratorKind = 'keys' | 'values' | 'entries';

interface ArrayIteratorState {
  type: string;
  target: unknown[] | null;
  index: number;
  kind: IteratorKind;
}

interface IteratorResult<T> {
  value: T;
  done: boolean;
}

const ARRAY_ITERATOR = 'Array Iterator';
const setState = internalState.set;
const getState = internalState.getterFor(ARRAY_ITERATOR);

export const ArrayIteratorModule = createIteratorConstructor(
  Array,
  'Array',
  function(target: unknown, kind: IteratorKind): void {
    setState(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject(target),
      index: 0,
      kind: kind
    });
  },
  function(this: object): IteratorResult<unknown> {
    const state = getState(this) as ArrayIteratorState;
    const target = state.target;
    const kind = state.kind;
    const currentIndex = state.index++;

    if (!target || currentIndex >= target.length) {
      state.target = null;
      return createIterResultObject(undefined, true);
    }

    if (kind === 'keys') {
      return createIterResultObject(currentIndex, false);
    }

    if (kind === 'values') {
      return createIterResultObject(target[currentIndex], false);
    }

    return createIterResultObject([currentIndex, target[currentIndex]], false);
  },
  'values'
);

const argumentsIterator = iterators.Arguments = iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

if (!isForced && descriptors && argumentsIterator.name !== 'values') {
  try {
    defineProperty(argumentsIterator, 'name', {
      value: 'values'
    });
  } catch (error) {
    // Silently ignore errors when trying to set the name property
  }
}