/**
 * Copies enumerable properties from source to target object using property descriptors.
 * This is a module export utility typically used by bundlers to merge exports.
 * 
 * @param target - The target object to receive properties
 * @param source - The source object containing properties to copy
 */
declare function copyProperties(
  target: Record<string, any>,
  source: Record<string, any>
): void;

export = copyProperties;