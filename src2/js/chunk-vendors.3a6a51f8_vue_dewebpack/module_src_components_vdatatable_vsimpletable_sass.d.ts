/**
 * VSimpleTable Sass Module
 * 
 * This module contains the stylesheet definitions for the VSimpleTable component.
 * It's a side-effect only module that injects styles into the application.
 * 
 * @module VSimpleTable.sass
 * @packageDocumentation
 */

/**
 * Sass module loader function signature
 * 
 * This function is called by the module system to load and apply styles.
 * It has no exports as it only performs side effects (style injection).
 * 
 * @param module - The module object provided by the bundler
 * @param exports - The exports object (unused, no static exports)
 * @param require - The require function for loading dependencies
 * @returns void - This module has no return value
 */
declare function loadVSimpleTableStyles(
  module: NodeModule,
  exports: Record<string, never>,
  require: NodeRequire
): void;

export {};