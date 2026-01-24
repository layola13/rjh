/**
 * Babel helper function for class constructor validation.
 * Ensures that a class is called with the 'new' keyword.
 * 
 * @param instance - The instance being created
 * @param Constructor - The constructor function that should be called with 'new'
 * @throws {TypeError} When a class constructor is called without 'new'
 * 
 * @example
 *