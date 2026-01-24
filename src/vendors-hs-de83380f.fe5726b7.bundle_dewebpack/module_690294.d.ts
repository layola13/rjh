/**
 * Sets up prototype chain inheritance between a subclass and superclass.
 * This is a TypeScript/Babel helper for class inheritance.
 * 
 * @param subClass - The child class that will inherit from the superclass
 * @param superClass - The parent class to inherit from (must be a function or null)
 * @throws {TypeError} When superClass is neither a function nor null
 * 
 * @example
 *