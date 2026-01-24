/**
 * VBadge component styles module
 * 
 * This module imports and registers the styles for the VBadge component.
 * It's a side-effect only module that doesn't export any values.
 * 
 * @module VBadgeStyles
 * @packageDocumentation
 */

/**
 * Style module for VBadge component.
 * This file contains no runtime exports as it only registers CSS styles.
 * 
 * @remarks
 * This is a CSS/SASS module that gets processed during build time.
 * The webpack loader injects the styles into the document at runtime.
 * 
 * Original source: ./src/components/VBadge/VBadge.sass
 */
declare module './src/components/VBadge/VBadge.sass' {
  /**
   * No exports - this module only has side effects (style injection)
   */
  const styles: void;
  export default styles;
}

/**
 * Alternative module declaration for SASS files in the VBadge component directory
 */
declare module '*.sass' {
  const content: void;
  export default content;
}