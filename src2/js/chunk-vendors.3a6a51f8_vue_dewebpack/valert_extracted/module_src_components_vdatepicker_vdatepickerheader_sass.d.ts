/**
 * VDatePicker Header Styles Module
 * 
 * This module represents the compiled SASS styles for the VDatePicker header component.
 * In a TypeScript environment, SASS/CSS modules are typically imported for side effects
 * (style injection) and may export CSS class name mappings if CSS Modules are enabled.
 */

/**
 * CSS Module exports interface.
 * If CSS Modules are enabled, this interface defines the shape of exported class names.
 * If not using CSS Modules, this will be an empty object.
 */
export interface VDatePickerHeaderStyles {
  /** Class names exported from the SASS module (if CSS Modules are enabled) */
  [className: string]: string;
}

/**
 * Default export representing the style module.
 * - With CSS Modules: exports an object mapping local class names to hashed class names
 * - Without CSS Modules: exports an empty object (styles are injected globally)
 */
declare const styles: VDatePickerHeaderStyles;

export default styles;