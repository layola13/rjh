/**
 * VTabs Component Styles
 * 
 * CSS/SASS module for the VTabs component styling.
 * This module contains no runtime exports as it only provides styles.
 * 
 * @module VTabs.sass
 * @packageDocumentation
 */

/**
 * Style module loader function (no-op at runtime)
 * 
 * This represents a webpack-loaded SASS module that has been processed
 * and injected into the document. The actual styles are applied via
 * style-loader or mini-css-extract-plugin at build time.
 * 
 * @param module - The webpack module object
 * @param exports - The module's exports object (empty for style modules)
 * @param require - The webpack require function for loading dependencies
 * @returns void - No return value, styles are side-effect only
 */
declare module '*.sass' {
  const styles: Record<string, never>;
  export default styles;
}

/**
 * VTabs SASS module declaration
 * 
 * Explicitly typed module for VTabs component styles.
 * Since this is a pure CSS module with no JS exports,
 * it provides no runtime values.
 */
declare module './src/components/VTabs/VTabs.sass' {
  const styles: Record<string, never>;
  export default styles;
}