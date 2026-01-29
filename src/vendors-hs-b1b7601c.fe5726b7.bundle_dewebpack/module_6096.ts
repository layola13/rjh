interface EqualityComparer {
  (valueA: unknown, valueB: unknown, bitmask: number, customizer?: EqualityCustomizer, stack?: Map<unknown, unknown>): boolean;
}

interface EqualityCustomizer {
  (valueA: unknown, valueB: unknown, key: string | number | symbol, objectA: unknown, objectB: unknown, stack: Map<unknown, unknown>): boolean | undefined;
}

interface GetKeysFunction {
  (object: object): Array<string | symbol>;
}

function equalObjects(
  objectA: object,
  objectB: object,
  bitmask: number,
  customizer: EqualityCustomizer | undefined,
  equalFunc: EqualityComparer,
  stack: Map<unknown, unknown>,
  getKeys: GetKeysFunction
): boolean {
  const COMPARE_PARTIAL_FLAG = 1;
  const isPartial = (bitmask & COMPARE_PARTIAL_FLAG) !== 0;
  
  const keysA = getKeys(objectA);
  const keysLength = keysA.length;
  
  if (keysLength !== getKeys(objectB).length && !isPartial) {
    return false;
  }
  
  let index = keysLength;
  while (index--) {
    const key = keysA[index];
    if (!(isPartial ? key in objectB : Object.prototype.hasOwnProperty.call(objectB, key))) {
      return false;
    }
  }
  
  const stackedA = stack.get(objectA);
  const stackedB = stack.get(objectB);
  
  if (stackedA && stackedB) {
    return stackedA === objectB && stackedB === objectA;
  }
  
  let result = true;
  stack.set(objectA, objectB);
  stack.set(objectB, objectA);
  
  let skipConstructor = isPartial;
  index = -1;
  
  while (++index < keysLength) {
    const key = keysA[index];
    const valueA = (objectA as Record<string | symbol, unknown>)[key];
    const valueB = (objectB as Record<string | symbol, unknown>)[key];
    
    let compared: boolean | undefined;
    if (customizer) {
      compared = isPartial
        ? customizer(valueB, valueA, key, objectB, objectA, stack)
        : customizer(valueA, valueB, key, objectA, objectB, stack);
    }
    
    if (!(compared === undefined ? valueA === valueB || equalFunc(valueA, valueB, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }
    skipConstructor ||= (key === 'constructor');
  }
  
  if (result && !skipConstructor) {
    const constructorA = (objectA as Record<string, unknown>).constructor;
    const constructorB = (objectB as Record<string, unknown>).constructor;
    
    if (
      constructorA !== constructorB &&
      ('constructor' in objectA) &&
      ('constructor' in objectB) &&
      !(typeof constructorA === 'function' && constructorA instanceof constructorA &&
        typeof constructorB === 'function' && constructorB instanceof constructorB)
    ) {
      result = false;
    }
  }
  
  stack.delete(objectA);
  stack.delete(objectB);
  
  return result;
}

export default equalObjects;