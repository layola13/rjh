/**
 * Type definitions for VChip component styles
 * @module VChip/VChip.sass
 * @description Style module for the VChip component. This module contains CSS/SASS styles
 * that are imported as a side effect and don't export any JavaScript values.
 */

/**
 * VChip style module interface
 * @remarks
 * This is a CSS/SASS module with no runtime exports. It's imported for side effects only
 * to inject styles into the application. The module is processed by webpack's style-loader
 * or similar tooling during the build process.
 */
declare module '*/VChip/VChip.sass' {
  /**
   * Empty export to make this a valid module declaration
   * @remarks
   * SASS/CSS modules typically don't export any values in production builds
   */
  const styles: void;
  export default styles;
}

declare module './src/components/VChip/VChip.sass' {
  const styles: void;
  export default styles;
}