const getBuiltIn = require('./module_13270');
const defineProperty = require('./module_18347');
const wellKnownSymbol = require('./module_46976');
const descriptors = require('./module_63855');

const SPECIES = wellKnownSymbol('species');

interface Constructor {
  [key: symbol]: unknown;
}

/**
 * Sets the @@species property on a constructor to return itself.
 * This enables subclass instances to create new instances of the same subclass.
 */
function setSpecies(constructorName: string): void {
  const Constructor = getBuiltIn(constructorName) as Constructor;
  
  if (descriptors && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get(this: Constructor): Constructor {
        return this;
      }
    });
  }
}

export default setSpecies;