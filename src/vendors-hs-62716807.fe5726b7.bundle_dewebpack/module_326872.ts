/**
 * Converts a value to an object, with special handling for strings.
 * If the native Object constructor doesn't properly handle string enumeration,
 * this splits the string into an array of characters.
 * 
 * @param value - The value to convert to an object
 * @returns An object representation of the value
 */
function toIndexedObject(value: unknown): object | string[] {
  const OBJECT_CONSTRUCTOR = Object;
  const STRING_TYPE = "String";
  
  /**
   * Checks if the native Object constructor properly handles string property enumeration.
   * Tests whether Object("z").propertyIsEnumerable(0) returns true.
   */
  const hasStringEnumerationBug = (() => {
    try {
      return !OBJECT_CONSTRUCTOR("z").propertyIsEnumerable(0);
    } catch {
      return true;
    }
  })();

  /**
   * Gets the internal class type of a value.
   * @param val - The value to check
   * @returns The type string (e.g., "String", "Object", "Array")
   */
  const getClassType = (val: unknown): string => {
    return Object.prototype.toString.call(val).slice(8, -1);
  };

  if (hasStringEnumerationBug) {
    return getClassType(value) === STRING_TYPE 
      ? (value as string).split("") 
      : OBJECT_CONSTRUCTOR(value);
  }
  
  return OBJECT_CONSTRUCTOR(value);
}

export default toIndexedObject;