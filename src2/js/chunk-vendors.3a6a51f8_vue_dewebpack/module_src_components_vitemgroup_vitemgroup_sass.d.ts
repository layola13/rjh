/**
 * VItemGroup component styles module.
 * 
 * This module contains the compiled CSS styles for the VItemGroup component.
 * It's a side-effect only module that injects styles when imported.
 * 
 * @module VItemGroup.sass
 * @packageDocumentation
 */

/**
 * Style injection function for VItemGroup component.
 * 
 * This function is called automatically when the module is imported.
 * It handles the registration and injection of the component's styles
 * into the document.
 * 
 * @param module - The webpack module object containing module metadata
 * @param exports - The module's exports object (unused for style modules)
 * @param require - The webpack require function for loading dependencies
 * 
 * @remarks
 * This is a CSS/SASS module with no static exports. It only produces
 * side effects (style injection) when loaded.
 * 
 * @internal
 */
declare function injectVItemGroupStyles(
  module: NodeModule,
  exports: Record<string, never>,
  require: NodeRequire
): void;

export {};