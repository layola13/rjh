import { polyfill } from './polyfill-registry';
import { arrayIncludes } from './array-includes-implementation';
import { addToUnscopables } from './add-to-unscopables';

interface ArrayIncludesOptions {
  target: string;
  proto: boolean;
  forced: boolean;
}

/**
 * Polyfill for Array.prototype.includes
 * Adds the includes method to Array prototype if not natively supported
 */
function shouldForcePolyfill(): boolean {
  return !Array(1).includes();
}

polyfill<ArrayIncludesOptions>({
  target: "Array",
  proto: true,
  forced: shouldForcePolyfill()
}, {
  includes: function<T>(this: T[], searchElement: T, fromIndex?: number): boolean {
    return arrayIncludes(
      this, 
      searchElement, 
      arguments.length > 1 ? fromIndex : undefined
    );
  }
});

addToUnscopables("includes");