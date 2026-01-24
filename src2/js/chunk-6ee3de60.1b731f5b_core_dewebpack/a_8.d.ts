/**
 * TypeScript helper function for class inheritance.
 * Implements ES6 class extends functionality for ES5 targets.
 * 
 * @template TDerived - The derived (child) class type
 * @template TBase - The base (parent) class type
 * 
 * @param derivedClass - The constructor function of the derived class
 * @param baseClass - The constructor function of the base class
 * 
 * @remarks
 * This function:
 * 1. Sets up the prototype chain for inheritance
 * 2. Copies static properties from base to derived class
 * 3. Creates a proper constructor reference
 * 
 * @example
 *