/**
 * Type definitions for VLabel component styles
 * @module VLabel
 * @description Style module for the VLabel component. This module handles the styling
 * of label components in the Vuetify framework.
 */

/**
 * VLabel style module
 * @description This module exports CSS styles for the VLabel component.
 * As a Sass/CSS module, it has side effects when imported (applies styles to the DOM)
 * but does not export any runtime JavaScript values.
 */
declare module '*/VLabel.sass' {
  /**
   * Default export is void as this is a style-only module
   * @description Importing this module will apply VLabel styles but provides no runtime exports
   */
  const styles: void;
  export default styles;
}

/**
 * Alternative module declaration for direct path import
 */
declare module './src/components/VLabel/VLabel.sass' {
  const styles: void;
  export default styles;
}

/**
 * Wildcard module declaration for any VLabel.sass imports
 * @description Allows importing VLabel.sass from any location in the project
 */
declare module '**/VLabel/VLabel.sass' {
  const styles: void;
  export default styles;
}