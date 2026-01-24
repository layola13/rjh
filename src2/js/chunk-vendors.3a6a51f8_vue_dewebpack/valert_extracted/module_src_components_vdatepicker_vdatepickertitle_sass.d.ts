/**
 * VDatePicker Title Component Styles
 * 
 * This module contains the styling definitions for the VDatePicker title component.
 * It's a side-effect only module that imports SASS styles into the application.
 * 
 * @module VDatePickerTitle.styles
 * @packageDocumentation
 */

/**
 * Style imports for VDatePickerTitle component.
 * This declaration represents a SASS/CSS module that has no runtime exports.
 * The styles are injected into the DOM when this module is imported.
 * 
 * @remarks
 * This is a side-effect import - it modifies the global stylesheet
 * but doesn't export any JavaScript values.
 */
declare module './VDatePickerTitle.sass' {
  /**
   * No exports - this module only has side effects (style injection)
   */
  const styles: void;
  export default styles;
}

/**
 * Alternative ambient module declaration for SASS files
 * Allows TypeScript to recognize .sass file imports without errors
 */
declare module '*.sass' {
  const content: Record<string, string>;
  export default content;
}