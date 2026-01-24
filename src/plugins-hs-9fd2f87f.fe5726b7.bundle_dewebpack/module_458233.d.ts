/**
 * CSS module loader type definition
 * @module module_458233
 * @description Emergency notice component styles - defines CSS classes for draggable modal notifications with custom styling
 */

/**
 * Webpack CSS loader module function signature
 * @param e - Module exports object
 * @param t - Module metadata (unused in this CSS module)
 * @param n - Webpack require function for loading dependencies
 */
declare function cssModuleLoader(
  e: { 
    /** Module exports object */
    exports: any; 
    /** Module identifier */
    id: string | number; 
  },
  t: any,
  n: (moduleId: number) => any
): void;

/**
 * CSS content array structure returned by css-loader
 * Format: [moduleId, cssContent, sourceMap?]
 */
type CSSLoaderOutput = Array<[string | number, string, string?]>;

/**
 * css-loader factory function interface
 * @param sourceMap - Whether to include source maps
 * @returns Object with push method for adding CSS modules
 */
interface CSSLoader {
  /**
   * Adds CSS content to the module exports
   * @param content - Tuple containing module ID, CSS string, and optional source map
   */
  push(content: [string | number, string, string?]): void;
}

/**
 * Emergency notice component CSS classes
 * @description Styles for the draggable emergency notice modal with custom theming
 */
interface EmergencyNoticeStyles {
  /** Root container class for emergency notice component */
  'emergency-notice-root': string;
  
  /** Draggable modal container from homestyler-ui-components */
  'draggable-modal-container': string;
  
  /** Zoom box container with background styling */
  'zoom-box': string;
  
  /** Vertical zoom content layout with grid columns */
  'zoom-content-vertical': string;
  
  /** Icon element within zoom content */
  'zoom-icon': string;
  
  /** Title section of zoom modal (30px height) */
  'zoom-title': string;
  
  /** Body content area with padding */
  'zoom-body': string;
  
  /** Draggable title bar with flex layout */
  'drag-title': string;
  
  /** Text content within drag title */
  'text': string;
  
  /** Main notice content container with border */
  'notice-content': string;
  
  /** Notice text with ellipsis overflow and line clamping */
  'notice-text': string;
  
  /** Footer section with right-aligned content */
  'notice-footer': string;
  
  /** Detail link styled as button */
  'detail-link': string;
}

export = cssModuleLoader;
export { EmergencyNoticeStyles };