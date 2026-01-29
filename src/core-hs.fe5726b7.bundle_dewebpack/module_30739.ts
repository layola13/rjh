interface StringPrototypeDescriptor {
  writable?: boolean;
}

const isNativeStartsWithNonWritable = (() => {
  const descriptor = Object.getOwnPropertyDescriptor(String.prototype, 'startsWith');
  return descriptor && !descriptor.writable;
})();

const isStartsWithBuggy = false; // Placeholder for polyfill detection logic

const shouldPolyfill = !isNativeStartsWithNonWritable && !isStartsWithBuggy;

if (shouldPolyfill) {
  const nativeStartsWith = String.prototype.startsWith;
  const stringSlice = String.prototype.slice;
  
  /**
   * Polyfill for String.prototype.startsWith
   * Determines whether a string begins with the characters of a specified string.
   * @param searchString - The characters to be searched for at the start of this string
   * @param position - The position in this string at which to begin searching (default: 0)
   * @returns true if the string starts with the searchString, false otherwise
   */
  String.prototype.startsWith = function (
    searchString: string,
    position?: number
  ): boolean {
    if (this == null) {
      throw new TypeError('String.prototype.startsWith called on null or undefined');
    }
    
    if (searchString instanceof RegExp) {
      throw new TypeError('First argument to String.prototype.startsWith must not be a regular expression');
    }
    
    const str = String(this);
    const search = String(searchString);
    const startPosition = Math.min(
      Math.max(position ?? 0, 0),
      str.length
    );
    
    if (nativeStartsWith) {
      return nativeStartsWith.call(str, search, startPosition);
    }
    
    return stringSlice.call(str, startPosition, startPosition + search.length) === search;
  };
}