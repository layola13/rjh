/**
 * External module wrapper
 * 
 * This is a webpack external module that references a dependency
 * provided at runtime. The actual implementation is supplied by
 * the consuming application's build configuration.
 * 
 * @module module_49608
 * @external __WEBPACK_EXTERNAL_MODULE__49608__
 */

/**
 * The external module's exported value.
 * Type is unknown as it depends on the external dependency configuration.
 * 
 * To use this properly, you should:
 * 1. Identify what library this module ID corresponds to in your webpack config
 * 2. Replace this with the actual type from that library
 */
declare const externalModule: unknown;

export = externalModule;