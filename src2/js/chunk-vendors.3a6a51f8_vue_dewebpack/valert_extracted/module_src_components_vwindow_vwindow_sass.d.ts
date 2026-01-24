/**
 * VWindow component styles module
 * 
 * This module contains the SASS styles for the VWindow component.
 * Webpack processes this file but doesn't export any JavaScript values.
 * 
 * @module VWindow.sass
 * @packageDocumentation
 */

/**
 * Style module for VWindow component
 * 
 * This is a side-effect-only module that injects CSS into the page.
 * No runtime exports are provided as this is a pure stylesheet import.
 * 
 * @remarks
 * When imported, this module applies VWindow component styles to the DOM.
 * The actual CSS is extracted by Webpack loaders and injected at runtime.
 */
declare module '*.sass' {
  /**
   * SASS module with no exports
   * Side effects only - applies styles when imported
   */
  const styles: void;
  export default styles;
}

declare module './src/components/VWindow/VWindow.sass' {
  /**
   * VWindow component stylesheet
   * No runtime exports - CSS is injected as side effect
   */
  const VWindowStyles: void;
  export default VWindowStyles;
}