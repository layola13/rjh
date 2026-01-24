/**
 * VSheet component stylesheet module
 * 
 * This is a CSS/SASS module import that provides styles for the VSheet component.
 * In Vuetify, VSheet is a functional component used as a wrapper with color and elevation options.
 * 
 * @module VSheet.sass
 * @packageDocumentation
 */

/**
 * VSheet stylesheet module
 * 
 * This module contains no runtime exports as it's a pure CSS/SASS file.
 * The styles are automatically applied when the VSheet component is used.
 * 
 * @remarks
 * This is a side-effect import that injects styles into the document.
 * Webpack processes this SASS file and includes the compiled CSS in the bundle.
 */
declare module '*.sass' {
  /**
   * Default export for SASS modules
   * Typically empty or contains CSS module class name mappings
   */
  const content: Record<string, string>;
  export default content;
}

/**
 * VSheet component styles module
 * 
 * @remarks
 * Original source: ./src/components/VSheet/VSheet.sass
 * This declaration allows TypeScript to recognize SASS imports without type errors.
 */
declare module './src/components/VSheet/VSheet.sass' {
  const styles: Record<string, string>;
  export default styles;
}