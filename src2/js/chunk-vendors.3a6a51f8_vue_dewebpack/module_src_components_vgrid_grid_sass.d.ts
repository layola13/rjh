/**
 * CSS Module: VGrid Grid Styles
 * 
 * This module represents the compiled CSS styles for the VGrid component's grid layout.
 * Since it's a SASS/CSS module, it doesn't export any runtime JavaScript functionality.
 * 
 * @module VGridStyles
 * @packageDocumentation
 */

/**
 * CSS Module exports type definition.
 * 
 * Represents the structure of CSS class names exported from the _grid.sass file.
 * In webpack, CSS modules typically export an object mapping local class names to generated global class names.
 * 
 * @remarks
 * This module contains no static exports as it only injects styles into the DOM.
 * The actual CSS classes are applied through the build process.
 */
declare const styles: Record<string, string>;

export default styles;

/**
 * Type alias for CSS class name mappings
 * 
 * @public
 */
export type VGridStylesModule = typeof styles;