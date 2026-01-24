/**
 * Grid styles module for VGrid component
 * 
 * This module imports SASS stylesheets for the VGrid component.
 * In production builds, styles are typically extracted to separate CSS files,
 * so this module has no runtime exports.
 * 
 * @module VGrid/grid
 */

/**
 * SASS style module - no runtime exports
 * Styles are processed by the build system and injected into the application
 */
declare module '*/components/VGrid/_grid.sass' {
  /**
   * Style modules typically export an empty object or CSS class mappings
   * when CSS modules are enabled
   */
  const styles: Record<string, never>;
  export default styles;
}