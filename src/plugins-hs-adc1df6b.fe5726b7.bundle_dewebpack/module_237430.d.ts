/**
 * CSS Module declaration for property bar switch schematic diagram styles
 * @module PropertyBarSwitchSchematicDiagram
 */

/**
 * Webpack module exports type definition
 * This module exports CSS styles for the property bar switch schematic diagram component
 */
declare module '*.css' {
  /**
   * CSS content array exported by the module
   * Format: [moduleId, cssContent, sourceMap]
   */
  const content: [string, string, string];
  export default content;
}

/**
 * Style class names available in this CSS module
 */
export interface PropertyBarSwitchSchematicDiagramStyles {
  /**
   * Main container class for property bar switch schematic diagram
   * Applies fixed height of 100px
   */
  'property-bar-switch-schematic-diagram': string;
}

/**
 * CSS Module exports
 */
declare const styles: PropertyBarSwitchSchematicDiagramStyles;
export default styles;