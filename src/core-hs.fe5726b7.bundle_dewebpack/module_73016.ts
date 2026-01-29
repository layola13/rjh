import { default as isNativeSupported } from './module_63855';
import { default as hasError } from './module_87524';
import { default as createElement } from './module_50312';

/**
 * Checks if Object.defineProperty works correctly on DOM elements.
 * Tests whether the getter returns the expected value (7).
 */
const supportsDefinePropertyOnDOM: boolean = !isNativeSupported && !hasError(() => {
  const element = createElement('div');
  const descriptor: PropertyDescriptor = {
    get: function(): number {
      return 7;
    }
  };
  
  return Object.defineProperty(element, 'a', descriptor).a !== 7;
});

export default supportsDefinePropertyOnDOM;