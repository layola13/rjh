/**
 * CSS Module Exports
 * 
 * This module exports CSS styles for an angle input gizmo component.
 * The styles define visual states including normal, move, focus, and error states.
 * 
 * @module AngleInputGizmoStyles
 */

/**
 * CSS module loader function type
 * @param shouldUseSourceMap - Whether to include source maps in the CSS output
 * @returns A CSS module with push method for adding style definitions
 */
type CSSModuleLoader = (shouldUseSourceMap: boolean) => CSSModule;

/**
 * CSS Module interface representing a collection of styles
 */
interface CSSModule {
  /**
   * Adds a CSS style definition to the module
   * @param styleDefinition - Tuple containing module ID and CSS string content
   */
  push(styleDefinition: [moduleId: string, cssContent: string]): void;
}

/**
 * Webpack module interface
 */
interface WebpackModule {
  /** Unique identifier for this module */
  id: string;
  /** Module exports object */
  exports: unknown;
}

/**
 * Module export function that loads and registers angle input gizmo CSS styles
 * 
 * Styles include:
 * - `.angle-input-gizmo-container`: Base container with absolute positioning
 * - `.angle-input-gizmo-suffix`: Degree symbol suffix styling
 * - `input`: Input field with centered text and rounded borders
 * - `.move`: Active drag/move state with blue accent color (#327DFF)
 * - `.focus`: Focused input state with blue accent color
 * - `.error`: Error state with red accent color (#ea3324)
 * 
 * @param module - The webpack module object containing id and exports
 * @param _exports - Module exports (unused parameter)
 * @param require - Webpack require function to load dependencies
 */
declare function loadAngleInputGizmoStyles(
  module: WebpackModule,
  _exports: unknown,
  require: (moduleId: number) => CSSModuleLoader
): void;

export default loadAngleInputGizmoStyles;

/**
 * CSS class names exported by this module
 */
export interface AngleInputGizmoStyles {
  /** Main container class for the angle input gizmo */
  'angle-input-gizmo-container': string;
  /** Suffix element class (degree symbol) */
  'angle-input-gizmo-suffix': string;
  /** Move/drag state modifier class */
  'move': string;
  /** Focus state modifier class */
  'focus': string;
  /** Error state modifier class */
  'error': string;
}