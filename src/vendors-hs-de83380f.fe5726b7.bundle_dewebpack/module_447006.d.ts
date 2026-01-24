/**
 * TypeScript class decorator helper
 * 
 * Applies property descriptors to a class constructor's prototype and static members,
 * then freezes the prototype to prevent further modifications.
 * 
 * @param constructor - The class constructor function
 * @param prototypeDescriptors - Array of property descriptors to apply to the prototype
 * @param staticDescriptors - Array of property descriptors to apply to the constructor itself
 * @returns The modified constructor function
 * 
 * @example
 *