/**
 * Type definitions for webpack bundle modules
 * 
 * This file provides TypeScript declarations for a modular bundle system
 * supporting various module formats and utilities.
 */

/**
 * CommonJS module format support
 * Provides traditional Node.js-style module.exports and require() functionality
 */
export * from './module_commonjs';

/**
 * UMD (Universal Module Definition) format support
 * Compatible with AMD, CommonJS, and global variable patterns
 */
export * from './module_umd';

/**
 * Literal module exports
 * Direct value exports without module wrapper overhead
 */
export * from './module_literal';

/**
 * Top-level module utilities
 * Core functionality exposed at the bundle's root level
 */
export * from './module_top';

/**
 * AMD (Asynchronous Module Definition) format support
 * RequireJS-compatible module loading system
 */
export * from './module_amd';

/**
 * Other module format utilities
 * Support for non-standard or custom module patterns
 */
export * from './module_other';

/**
 * Pop operation utilities
 * Stack-like data structure operations for removing elements
 */
export * from './module_pop';

/**
 * Index module
 * Main entry point and aggregation of core functionality
 */
export * from './module_index';

/**
 * Bare module imports
 * Minimal imports without side effects or wrappers
 */
export * from './module_bare';

/**
 * Push operation utilities
 * Stack-like data structure operations for adding elements
 */
export * from './module_push';

/**
 * Generic type utilities
 * Flexible type handling and type-agnostic operations
 */
export * from './module_any';

/**
 * End module utilities
 * Finalization, cleanup, and termination helpers
 */
export * from './module_end';

/**
 * Class utilities and definitions
 * Object-oriented programming constructs and class-based patterns
 */
export * from './module_class';

/**
 * Global variable management
 * Browser globals, window object, and cross-environment compatibility
 */
export * from './module_globals';