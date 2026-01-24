/**
 * CSS Module Definition
 * 
 * This module exports CSS styles for a customized modeling snapping plane help tooltip component.
 * The styles define the appearance and layout of a tooltip that appears above an element,
 * including its positioning, background, and interactive elements.
 * 
 * @module CustomizedModelingSnappingPlaneHelp
 */

/**
 * Type definition for webpack css-loader module export function
 * 
 * @param sourceMap - Whether to include source maps in the CSS output
 * @returns A CSS loader instance with push method for adding CSS rules
 */
type CSSLoaderExport = (sourceMap: boolean) => {
  /**
   * Adds a CSS module entry to the exports
   * 
   * @param entry - Tuple containing module ID and CSS content
   *   - entry[0]: Module identifier
   *   - entry[1]: CSS string content
   */
  push(entry: [string | number, string]): void;
};

/**
 * Webpack module factory function
 * 
 * @param exports - Module exports object to be populated
 * @param module - Webpack module metadata
 * @param require - Webpack require function for loading dependencies
 */
declare function moduleFactory(
  exports: {
    /** CSS module exports */
    default?: unknown;
  },
  module: {
    /** Unique module identifier */
    id: string | number;
    /** Module exports object */
    exports: unknown;
  },
  require: (moduleId: number) => CSSLoaderExport
): void;

/**
 * CSS class name definitions for the snapping plane help tooltip component
 */
interface CustomizedModelingSnappingPlaneHelpStyles {
  /** Main container for the tooltip */
  '.plugin_customizedModeling_snapping_plane_help .tip-wrap': {
    /** Light gray background color */
    'background-color': '#fafafa';
    /** Ensures tooltip appears above other elements */
    'z-index': 1;
    /** Rounded corners */
    'border-radius': '4px';
    /** Internal spacing */
    padding: '7px';
    /** Absolute positioning for placement */
    position: 'absolute';
    /** Vertical offset above the trigger element */
    top: '-160px';
    /** Horizontal offset from the trigger element */
    left: '-89px';
    /** Fixed width constraint */
    width: '200px';
    /** Left-aligned text content */
    'text-align': 'left';
    /** Prevents cursor change to text selection */
    cursor: 'default';
    /** Gray text color */
    color: '#808080';
    /** Small font size for compact display */
    'font-size': '12px';
  };

  /** Header section of the tooltip */
  '.plugin_customizedModeling_snapping_plane_help .tip-wrap .tip-head': {
    /** Flexbox layout */
    display: 'flex';
    /** Align items to the start horizontally */
    'justify-content': 'flex-start';
    /** Center items vertically */
    'align-items': 'center';
    /** Internal spacing */
    padding: '5px';
    /** Text line height */
    'line-height': '18px';
  };

  /** Body content section of the tooltip */
  '.plugin_customizedModeling_snapping_plane_help .tip-wrap .tip-body': {
    /** Text line height */
    'line-height': '20px';
    /** Internal spacing with no bottom padding */
    padding: '3px 5px 0';
  };

  /** First child element in the body section */
  '.plugin_customizedModeling_snapping_plane_help .tip-wrap .tip-body > div:first-of-type': {
    /** Bottom spacing to separate content blocks */
    'margin-bottom': '10px';
  };

  /** Tooltip arrow pseudo-element pointing downward */
  '.plugin_customizedModeling_snapping_plane_help .tip-wrap::after': {
    /** Creates upward-pointing triangle */
    'border-top': '8px solid #fafafa';
    'border-left': '8px solid transparent';
    'border-right': '8px solid transparent';
    /** Zero dimensions for border-based shape */
    width: 0;
    height: 0;
    /** Required for pseudo-element rendering */
    content: '""';
    /** Block-level element */
    display: 'block';
    /** Absolute positioning for precise placement */
    position: 'absolute';
    /** Horizontal centering of arrow */
    left: '96px';
    /** Vertical position at bottom of tooltip */
    top: '148px';
  };

  /** Container for "don't show again" option */
  '.plugin_customizedModeling_snapping_plane_help .tip-wrap .nomore-show': {
    /** Full width of parent */
    width: '100%';
    /** Right-aligned content */
    'text-align': 'right';
    /** Bottom spacing */
    'padding-bottom': '9px';
    /** Text line height */
    'line-height': '12px';
  };

  /** Clickable text for "don't show again" */
  '.plugin_customizedModeling_snapping_plane_help .tip-wrap .nomore-show span': {
    /** Inline-block for sizing control */
    display: 'inline-block';
    /** Blue accent color for interactive element */
    color: '#4d9bd6';
    /** Center-aligned text */
    'text-align': 'center';
    /** Text line height */
    'line-height': '12px';
    /** Slight letter spacing for readability */
    'letter-spacing': '0.5px';
    /** Remove default margin */
    margin: 0;
    /** Pointer cursor to indicate interactivity */
    cursor: 'pointer';
  };

  /** Hover state for "don't show again" link */
  '.plugin_customizedModeling_snapping_plane_help .tip-wrap .nomore-show span:hover': {
    /** Underline on hover for visual feedback */
    'text-decoration': 'underline';
  };
}

export default moduleFactory;
export type { CustomizedModelingSnappingPlaneHelpStyles };