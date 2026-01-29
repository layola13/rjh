function getSpeciesConstructor<T>(instance: T, defaultConstructor: Function): Function {
  const instanceConstructor = toObject(instance).constructor;
  
  if (instanceConstructor === undefined || instanceConstructor === null) {
    return defaultConstructor;
  }
  
  const speciesSymbol = Symbol.species;
  const species = toObject(instanceConstructor)[speciesSymbol];
  
  if (species === undefined || species === null) {
    return defaultConstructor;
  }
  
  return assertFunction(species);
}

function toObject<T>(value: T): any {
  if (value === null || value === undefined) {
    throw new TypeError('Cannot convert null or undefined to object');
  }
  return Object(value);
}

function assertFunction(value: unknown): Function {
  if (typeof value !== 'function') {
    throw new TypeError('Value is not a function');
  }
  return value as Function;
}

export { getSpeciesConstructor as default };