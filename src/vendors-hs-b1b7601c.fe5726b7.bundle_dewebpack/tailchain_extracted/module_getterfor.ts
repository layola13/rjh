function getterFor(expectedType: string) {
  return function(receiver: unknown): any {
    let state: any;
    
    if (!isObject(receiver) || (state = getInternalState(receiver)).type !== expectedType) {
      throw new TypeError(`Incompatible receiver, ${expectedType} required`);
    }
    
    return state;
  };
}

function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
}

function getInternalState(target: object): any {
  // Internal state getter implementation
  return (target as any).__internalState__;
}