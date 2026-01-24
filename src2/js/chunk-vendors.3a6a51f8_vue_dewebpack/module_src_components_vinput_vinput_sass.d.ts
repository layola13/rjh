/**
 * CSS Module type definitions for VInput component styles
 * @module VInput.sass
 */

/**
 * CSS Module exports for VInput component
 * Represents the type-safe interface for imported Sass styles
 */
declare module '*.sass' {
  /**
   * CSS class name mappings from the VInput Sass module
   * Each property represents a CSS class defined in VInput.sass
   */
  interface IVInputStyles {
    readonly [className: string]: string;
  }

  const styles: IVInputStyles;
  export default styles;
}

/**
 * Specific type definition for VInput component styles
 * @module @/components/VInput/VInput.sass
 */
declare module '@/components/VInput/VInput.sass' {
  /**
   * VInput component CSS class mappings
   * Provides type-safe access to scoped CSS class names
   */
  interface IVInputClassNames {
    readonly [className: string]: string;
  }

  const classes: IVInputClassNames;
  export default classes;
}