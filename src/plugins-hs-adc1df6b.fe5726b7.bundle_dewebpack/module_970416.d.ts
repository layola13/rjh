/**
 * Webpack CSS loader module type definition
 * Original Module ID: 970416
 * 
 * This module exports CSS styles for a property bar dropdown input component.
 * The CSS is processed through a CSS loader (module 986380) and injected into the bundle.
 */

/**
 * CSS Module Export Function
 * 
 * @param exports - The module exports object that will contain the processed CSS
 * @param module - The current module metadata object containing module.id
 * @param cssLoader - The CSS loader function (from module 986380) that processes CSS strings
 * 
 * @remarks
 * This function is typically invoked by Webpack's module system during bundle execution.
 * The CSS loader returns an array-like object with a push method to register the styles.
 * 
 * Styles defined:
 * - `.property-bar-dropdowninput` - Main container with flexbox layout
 * - `.dropdowninput-label` - Label text styling with ellipsis overflow
 * - `.dropdowninput-tooltip` - Tooltip icon styling
 * - `.dropdowninput-comp` - Dropdown component container
 * - `.tp-select` - Select element border customization
 * - `.tp-select-suffix` - Select suffix icon (arrow) styling
 * - `.property-bar-dropdowninpu-label-tooltip` - Tooltip width override (note: typo in class name)
 */
declare function cssModule(
  exports: Record<string, unknown>,
  module: { id: string | number },
  cssLoader: (sourceMap: boolean) => {
    push(entry: [string | number, string]): void;
  }
): void;

export = cssModule;