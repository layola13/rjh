/**
 * VMain component styles module
 * 
 * This module contains the CSS styles for the VMain component.
 * It's typically imported for side effects only (style injection).
 * 
 * @module VMain/styles
 * @packageDocumentation
 */

/**
 * Style module for VMain component.
 * This is a side-effect import that injects styles into the document.
 * No runtime exports are provided.
 */
declare module '*.sass' {
  /**
   * Default export is void as SASS/SCSS modules are imported for side effects.
   * The styles are automatically injected into the DOM when this module is imported.
   */
  const content: void;
  export default content;
}

/**
 * Specific declaration for VMain component styles
 */
declare module '@/components/VMain/VMain.sass' {
  /**
   * VMain component stylesheet.
   * Import this module to apply VMain component styles.
   * 
   * @example
   *