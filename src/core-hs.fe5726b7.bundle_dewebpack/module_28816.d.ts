/**
 * Sets the toStringTag symbol on an object's prototype to customize its toString behavior.
 * This utility is commonly used to define custom string representations for objects.
 * 
 * @param target - The target object or constructor function
 * @param tag - The string tag value (e.g., 'Map', 'Set', 'MyClass')
 * @param direct - If true, sets the tag directly on the object; otherwise sets on its prototype
 * 
 * @example
 *