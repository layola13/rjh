/**
 * Cross-environment polyfill for Function.prototype.apply
 * 
 * Provides a consistent way to call functions with a given `this` context and arguments array.
 * Uses native Reflect.apply when available, otherwise falls back to Function.prototype.call/apply.
 * 
 * @module FunctionApply
 * @returns A function that applies another function with specified context and arguments
 * 
 * @example
 *