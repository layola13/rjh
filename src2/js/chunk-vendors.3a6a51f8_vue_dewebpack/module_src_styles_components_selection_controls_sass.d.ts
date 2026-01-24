/**
 * Stylesheet module for selection controls component styling.
 * Contains CSS/SASS definitions for checkboxes, radio buttons, and other selection UI elements.
 * 
 * @module SelectionControlsStyles
 * @description This module imports and applies selection control component styles.
 * Side-effect only import - no runtime exports.
 */

/**
 * Selection controls stylesheet module.
 * This is a side-effect import that injects CSS into the document.
 * No runtime values are exported from this module.
 * 
 * @remarks
 * Originally compiled from: ./src/styles/components/_selection-controls.sass
 * This module has no static exports as it only performs style injection.
 */
declare module '@/styles/components/selection-controls' {
  // No exports - side-effect only module
}

/**
 * Alternative module declaration for direct SASS file imports.
 * Allows importing the SASS file directly in TypeScript projects.
 */
declare module '*.sass' {
  const content: Record<string, string>;
  export default content;
}