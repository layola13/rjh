/**
 * Module re-export declaration
 * 
 * This module re-exports all content from module 280.
 * Original module ID: 120
 * Target module ID: 280
 * 
 * @module module_120
 */

/**
 * Re-exports all declarations from the target module.
 * This is a barrel export pattern commonly used to simplify import paths.
 */
export * from './module_280';

/**
 * Alternative: If the target module has a default export
 */
export { default } from './module_280';