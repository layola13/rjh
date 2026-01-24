/**
 * CommonJS module export wrapper
 * Exports a generic type T to maintain type safety
 * 
 * @template T - The type of the exported module value
 */
declare module 'module_336612' {
  /**
   * The main export of this module
   * Replace `unknown` with the actual type when known
   */
  const moduleExport: unknown;
  
  export = moduleExport;
}

/**
 * Alternative named export declaration
 * Use this if the module uses ES6 export syntax
 */
// declare module 'module_336612' {
//   /**
//    * Default export of the module
//    */
//   export default unknown;
// }