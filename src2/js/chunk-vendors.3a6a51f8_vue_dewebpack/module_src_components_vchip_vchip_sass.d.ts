/**
 * VChip component style module
 * 
 * This module contains the compiled CSS styles for the VChip component.
 * It's a side-effect only module that injects styles into the DOM when imported.
 * 
 * @module VChipStyles
 * @packageDocumentation
 */

/**
 * Style module export
 * 
 * This module has no runtime exports as it only contains CSS side effects.
 * The module is imported for its side effects (style injection) rather than any exported values.
 * 
 * @remarks
 * - Original source: ./src/components/VChip/VChip.sass
 * - This is typically processed by webpack's css-loader and style-loader
 * - No static exports are provided by this module
 */
declare module './src/components/VChip/VChip.sass' {
  /**
   * Default export is void as this is a side-effect only module
   */
  const styles: void;
  export default styles;
}

/**
 * Alternative module declaration for shorter import paths
 */
declare module '@/components/VChip/VChip.sass' {
  const styles: void;
  export default styles;
}