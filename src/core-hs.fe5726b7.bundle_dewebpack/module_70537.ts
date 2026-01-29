import { call } from './47730';
import { create } from './50179';
import { defineProperty } from './71154';
import { createNonEnumerableProperty } from './14890';
import { wellKnownSymbol } from './46976';
import { createInternalState } from './86812';
import { getMethod } from './9087';
import { IteratorPrototype } from './30036';
import { createIterResultObject } from './1190';
import { iteratorClose } from './50002';

const TO_STRING_TAG = wellKnownSymbol('toStringTag');
const ITERATOR_HELPER = 'IteratorHelper';
const WRAP_FOR_VALID_ITERATOR = 'WrapForValidIterator';
const setInternalState = createInternalState.set;

interface IteratorHelperState {
  iterator: Iterator<unknown>;
  next: () => IteratorResult<unknown>;
  type: string;
  nextHandler: () => unknown;
  counter: number;
  done: boolean;
  inner?: {
    iterator: Iterator<unknown>;
  };
}

type NextHandler = () => unknown;

const createIteratorHelperPrototype = (isWrapForValidIterator: boolean) => {
  const getState = createInternalState.getterFor<IteratorHelperState>(
    isWrapForValidIterator ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER
  );

  return createNonEnumerableProperty(create(IteratorPrototype), {
    next: function (this: object): IteratorResult<unknown> {
      const state = getState(this);

      if (isWrapForValidIterator) {
        return state.nextHandler() as IteratorResult<unknown>;
      }

      try {
        const value = state.done ? undefined : state.nextHandler();
        return createIterResultObject(value, state.done);
      } catch (error) {
        state.done = true;
        throw error;
      }
    },

    return: function (this: object): IteratorResult<undefined> {
      const state = getState(this);
      const iterator = state.iterator;
      state.done = true;

      if (isWrapForValidIterator) {
        const returnMethod = getMethod(iterator, 'return');
        return returnMethod
          ? call(returnMethod, iterator)
          : createIterResultObject(undefined, true);
      }

      if (state.inner) {
        try {
          iteratorClose(state.inner.iterator, 'normal');
        } catch (error) {
          return iteratorClose(iterator, 'throw', error);
        }
      }

      iteratorClose(iterator, 'normal');
      return createIterResultObject(undefined, true);
    }
  });
};

const wrapForValidIteratorPrototype = createIteratorHelperPrototype(true);
const iteratorHelperPrototype = createIteratorHelperPrototype(false);

defineProperty(iteratorHelperPrototype, TO_STRING_TAG, 'Iterator Helper');

export default function createIteratorHelper(
  nextHandler: NextHandler,
  isWrapForValidIterator: boolean
): new (iterator: Iterator<unknown>, state?: IteratorHelperState) => object {
  const IteratorHelperConstructor = function (
    this: object,
    iterator: Iterator<unknown>,
    state?: IteratorHelperState
  ): void {
    let internalState: IteratorHelperState;

    if (state) {
      state.iterator = iterator.iterator;
      state.next = iterator.next;
      internalState = state;
    } else {
      internalState = iterator as unknown as IteratorHelperState;
    }

    internalState.type = isWrapForValidIterator ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER;
    internalState.nextHandler = nextHandler;
    internalState.counter = 0;
    internalState.done = false;

    setInternalState(this, internalState);
  };

  IteratorHelperConstructor.prototype = isWrapForValidIterator
    ? wrapForValidIteratorPrototype
    : iteratorHelperPrototype;

  return IteratorHelperConstructor as any;
}