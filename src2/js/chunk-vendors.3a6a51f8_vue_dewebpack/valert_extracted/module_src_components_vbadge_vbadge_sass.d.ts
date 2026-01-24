/**
 * VBadge component styles module
 * 
 * This module contains the compiled CSS styles for the VBadge component.
 * In Webpack builds, SASS/CSS files are typically imported for side effects only,
 * causing styles to be injected into the DOM at runtime.
 * 
 * @module VBadgeStyles
 * @see {@link https://vuetifyjs.com/components/badges/ Vuetify VBadge Documentation}
 */

/**
 * Style injection function for VBadge component
 * 
 * This function is called by Webpack's style-loader to inject the compiled
 * CSS from VBadge.sass into the document's <head> element.
 * 
 * @remarks
 * This is a side-effect only import - it has no exports and is executed
 * solely to register styles with the style system.
 * 
 * @internal
 * @deprecated Use native CSS imports or CSS modules in modern build systems
 */
declare module './src/components/VBadge/VBadge.sass' {
  /**
   * No runtime exports - this module only injects styles as a side effect
   */
  const styles: void;
  export default styles;
}

/**
 * Alternative module declaration for Sass/SCSS files
 * Provides type safety when importing style files in TypeScript projects
 */
declare module '*.sass' {
  /**
   * Sass files imported in Webpack are processed by sass-loader and style-loader
   * They do not export any values, only inject styles into the DOM
   */
  const content: void;
  export default content;
}