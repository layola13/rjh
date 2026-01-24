/**
 * Babel helper: _assertThisInitialized
 * 
 * Validates that `this` has been initialized in a class constructor.
 * Throws an error if called before super() in a derived class.
 * 
 * @template T - The type of the value being checked
 * @param self - The value to check (typically `this` context)
 * @returns The validated value
 * @throws {ReferenceError} If the value is undefined (super() not called)
 * 
 * @example
 *