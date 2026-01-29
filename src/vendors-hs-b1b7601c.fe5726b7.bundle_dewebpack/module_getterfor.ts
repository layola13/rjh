function getterFor<T>(expectedType: string) {
  return function(receiver: unknown): T {
    if (!isObject(receiver)) {
      throw new TypeError(`Incompatible receiver, ${expectedType} required`);
    }
    
    const state = getInternalState(receiver);
    
    if (state.type !== expectedType) {
      throw new TypeError(`Incompatible receiver, ${expectedType} required`);
    }
    
    return state as T;
  };
}

function isObject(value: unknown): value is object {
  return value !== null && (typeof value === 'object' || typeof value === 'function');
}

function getInternalState(target: object): { type: string; [key: string]: unknown } {
  // Placeholder implementation - actual implementation depends on your internal state mechanism
  throw new Error('getInternalState implementation required');
}