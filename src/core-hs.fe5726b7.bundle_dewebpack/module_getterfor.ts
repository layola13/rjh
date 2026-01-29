interface InternalState {
  type: string;
  [key: string]: unknown;
}

type StateValidator = (target: unknown) => InternalState;

function createGetterFor(expectedType: string): StateValidator {
  return function (target: unknown): InternalState {
    if (!isObject(target)) {
      throw new TypeError(`Incompatible receiver, ${expectedType} required`);
    }

    const state = getInternalState(target);

    if (state.type !== expectedType) {
      throw new TypeError(`Incompatible receiver, ${expectedType} required`);
    }

    return state;
  };
}

function isObject(value: unknown): value is object {
  return value !== null && (typeof value === 'object' || typeof value === 'function');
}

function getInternalState(target: object): InternalState {
  // Implementation depends on your internal state management strategy
  // This is a placeholder that should be replaced with actual logic
  const state = (target as { __internalState?: InternalState }).__internalState;
  
  if (!state) {
    throw new TypeError('Internal state not found');
  }
  
  return state;
}