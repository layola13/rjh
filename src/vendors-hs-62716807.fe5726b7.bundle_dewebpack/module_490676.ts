import getBuiltIn from './module_738380';
import defineProperty from './module_602109';
import getWellKnownSymbol from './module_446898';
import isDescriptorSupported from './module_907253';

const SPECIES_SYMBOL = getWellKnownSymbol('species');

/**
 * Adds the @@species getter to a constructor if not already present.
 * This allows derived classes to override the species used in creation methods.
 * 
 * @param constructorName - The name of the built-in constructor to patch
 */
export default function addSpeciesGetter(constructorName: string): void {
  const Constructor = getBuiltIn(constructorName);
  
  if (isDescriptorSupported && Constructor && !Constructor[SPECIES_SYMBOL]) {
    defineProperty(Constructor, SPECIES_SYMBOL, {
      configurable: true,
      get: function() {
        return this;
      }
    });
  }
}