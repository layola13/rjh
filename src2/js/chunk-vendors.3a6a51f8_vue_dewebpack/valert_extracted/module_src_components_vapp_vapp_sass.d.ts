/**
 * VApp Component Styles
 * 
 * CSS module for the VApp component styling.
 * This module contains SASS-compiled styles for the Vuetify VApp component,
 * which typically serves as the root application wrapper.
 * 
 * @module VAppStyles
 * @packageDocumentation
 */

/**
 * VApp style module
 * 
 * This module exports CSS classes and style definitions for the VApp component.
 * Since this is a CSS/SASS module, it doesn't export runtime values but makes
 * styles available to the component system.
 * 
 * @remarks
 * This is a side-effect import that registers styles globally or with the CSS-in-JS system.
 * No runtime exports are provided as this is purely a stylesheet module.
 */
declare module '@/components/VApp/VApp.sass' {
  /**
   * Style module with no runtime exports
   * The module executes side effects to inject styles into the application
   */
  const styles: void;
  export default styles;
}

/**
 * Alternative module declaration for relative imports
 */
declare module './components/VApp/VApp.sass' {
  const styles: void;
  export default styles;
}

/**
 * Module augmentation for CSS Module typing (if used with CSS Modules)
 * Uncomment and extend if the SASS file exports class names as CSS Modules
 */
// declare module '*.sass' {
//   /**
//    * CSS Module class names mapping
//    */
//   interface CSSModuleClasses {
//     readonly [key: string]: string;
//   }
//   const classes: CSSModuleClasses;
//   export default classes;
// }