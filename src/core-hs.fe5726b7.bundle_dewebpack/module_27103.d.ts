/**
 * Attempts to delete a property from an object and throws an error if the deletion fails.
 * This utility is typically used in environments where property deletion must succeed
 * (e.g., when dealing with non-configurable properties).
 * 
 * @param target - The object from which to delete the property
 * @param propertyKey - The key of the property to delete
 * @throws {TypeError} When the property cannot be deleted (e.g., non-configurable properties)
 * 
 * @example
 *