/**
 * ES Module Exports Configuration
 * 
 * This module configures the exports object to be treated as an ES module
 * by setting the __esModule property to true. This is commonly used by
 * transpilers (TypeScript/Babel) to mark modules that have been converted
 * from ES6 to CommonJS format.
 */

/**
 * Marks this module as having ES module semantics when used in a CommonJS environment.
 * This allows proper interoperability between ES modules and CommonJS modules.
 * 
 * @remarks
 * When Babel or TypeScript transpiles ES6 `export` statements to CommonJS,
 * it sets this flag so that import statements can correctly distinguish
 * between default exports and named exports.
 */
export {};