/**
 * VSnackbar component styles module
 * 
 * This module contains the compiled SASS styles for the Vuetify VSnackbar component.
 * It is automatically imported and injected into the DOM at runtime.
 * 
 * @module VSnackbarStyles
 * @see {@link https://vuetifyjs.com/components/snackbars Vuetify VSnackbar Documentation}
 */

/**
 * Style module for VSnackbar component.
 * This module has no exports as styles are side-effect imports that inject CSS into the page.
 * 
 * @remarks
 * - Webpack processes this SASS file and injects the resulting CSS
 * - No JavaScript exports are available from this module
 * - Import this module for side effects only: `import './VSnackbar.sass'`
 */
declare module './VSnackbar.sass' {
  /**
   * This module contains only CSS styles and has no runtime exports.
   * Importing this module will inject the VSnackbar styles into the document.
   */
  const styles: void;
  export default styles;
}

/**
 * Alternative module declaration for src-relative imports
 */
declare module '@/components/VSnackbar/VSnackbar.sass' {
  const styles: void;
  export default styles;
}

/**
 * Alternative module declaration for full path imports
 */
declare module 'vuetify/src/components/VSnackbar/VSnackbar.sass' {
  const styles: void;
  export default styles;
}