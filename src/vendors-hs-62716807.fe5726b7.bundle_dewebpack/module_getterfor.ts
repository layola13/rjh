interface InternalState {
  type: string;
  [key: string]: unknown;
}

type TypeError = Error;

function createGetterValidator(expectedType: string): (receiver: unknown) => InternalState {
  return function (receiver: unknown): InternalState {
    if (!isObject(receiver)) {
      throw new TypeError(`Incompatible receiver, ${expectedType} required`);
    }

    const state = getInternalState(receiver);
    
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
  // Implementation depends on the actual internal state mechanism
  // This could be a WeakMap lookup or property access
  throw new Error('getInternalState implementation required');
}