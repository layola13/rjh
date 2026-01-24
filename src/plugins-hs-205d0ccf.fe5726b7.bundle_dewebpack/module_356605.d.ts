/**
 * CSS Module type definitions
 * 
 * This module exports CSS class names from a CSS/SCSS module file.
 * It uses webpack's css-loader with CSS Modules enabled to generate
 * locally scoped class names that are exported as a typed object.
 */

/**
 * CSS Module export interface
 * Represents the mapping of CSS class names to their scoped identifiers
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Default export containing the CSS Module class mappings
 * 
 * @example
 *