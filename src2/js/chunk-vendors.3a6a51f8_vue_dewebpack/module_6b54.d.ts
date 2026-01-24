/**
 * RegExp.prototype.toString polyfill
 * 
 * Ensures RegExp.prototype.toString returns correct format "/source/flags"
 * and handles edge cases in older JavaScript environments.
 * 
 * @module RegExpToStringPolyfill
 * @dependencies
 *   - 2aba: Object property redefiner utility
 *   - 3846: Core polyfill initializer
 *   - cb7c: Object type checker/converter
 *   - 0bfb: RegExp flags getter
 *   - 9e1e: Descriptor support detector
 *   - 79e5: Feature detection/test runner
 */

/**
 * Object property redefiner - adds/redefines properties on objects
 */
import redefineProperty from '2aba';

/**
 * Core polyfill initialization
 */
import '3846';

/**
 * Converts value to object, throws if null/undefined
 */
import toObject from 'cb7c';

/**
 * Gets RegExp flags as string
 */
import getFlags from '0bfb';

/**
 * Checks if property descriptors are supported
 */
import hasDescriptorSupport from '9e1e';

/**
 * Runs feature detection test
 */
import fails from '79e5';

/** Method name constant */
const TO_STRING_METHOD = 'toString';

/** Native RegExp.prototype.toString reference */
const nativeRegExpToString = /./[TO_STRING_METHOD];

/**
 * Redefines RegExp.prototype.toString with provided implementation
 * 
 * @param implementation - The new toString implementation
 */
function redefineToString(implementation: () => string): void {
  redefineProperty(RegExp.prototype, TO_STRING_METHOD, implementation, true);
}

/**
 * Custom RegExp.prototype.toString implementation
 * Formats as "/source/flags" with proper flag handling
 * 
 * @this {RegExp} The RegExp instance
 * @returns Formatted string representation of the RegExp
 */
function customRegExpToString(this: RegExp): string {
  const regExpObject = toObject(this);
  
  return '/'.concat(
    regExpObject.source,
    '/',
    'flags' in regExpObject
      ? regExpObject.flags
      : (!hasDescriptorSupport && regExpObject instanceof RegExp)
        ? getFlags.call(regExpObject)
        : undefined as unknown as string
  );
}

/**
 * Wrapper that delegates to native toString
 * 
 * @this {RegExp} The RegExp instance
 * @returns Result of native toString call
 */
function nativeToStringWrapper(this: RegExp): string {
  return nativeRegExpToString.call(this);
}

// Test if native toString is broken (doesn't handle generic objects correctly)
const isNativeToStringBroken = fails((): boolean => {
  return '/a/b' !== nativeRegExpToString.call({
    source: 'a',
    flags: 'b'
  });
});

if (isNativeToStringBroken) {
  // Native implementation is broken, use custom implementation
  redefineToString(customRegExpToString);
} else if (nativeRegExpToString.name !== TO_STRING_METHOD) {
  // Native implementation exists but has wrong name, wrap it
  redefineToString(nativeToStringWrapper);
}