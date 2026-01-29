/**
 * CSS Module Definition - Feedback Network Result Component Styles
 * 
 * This module exports CSS styles for feedback network detection and status display components.
 * Includes styles for network result indicators, modal dialogs, and status lists with theme support.
 * 
 * @module FeedbackNetworkStyles
 */

/**
 * CSS module export function signature
 * @param exports - Module exports object
 * @param module - Module metadata object containing id and other properties
 * @param cssLoaderFunction - CSS loader function from webpack (module 986380)
 */
declare module 'module_750157' {
  /**
   * CSS class names available in this module
   */
  export interface FeedbackNetworkStylesClasses {
    /** Main container for feedback network result indicator */
    'feedback-network-result': string;
    /** Text label within result indicator */
    'text': string;
    /** Icon container with iconfont-view */
    'icon': string;
    /** Arrow icon for expandable sections */
    'arrow-icon': string;
    /** Network detection status icon */
    'detect-icon': string;
    /** Modal dialog container for feedback list */
    'feedback-list-modal': string;
    /** Main wrapper for feedback list content */
    'feedback-list-wrapper': string;
    /** Network status section container */
    'feedback-network': string;
    /** Header section with detection results */
    'feedback-network-header': string;
    /** Result text display */
    'result': string;
    /** Scrollable body containing status items */
    'feedback-network-body': string;
    /** Individual status item row */
    'status-item': string;
    /** Status item name/title */
    'name': string;
    /** Status item subtitle/description */
    'subTitle': string;
    /** Footer section with actions */
    'feedback-network-footer': string;
    /** Action buttons container */
    'feedback-network-footer-actions': string;
    /** Empty state container */
    'feedback-network-empty': string;
    /** Empty state icon */
    'feedback-network-empty-icon': string;
    /** Empty state text */
    'feedback-network-empty-text': string;
    /** Dark theme variant modifier */
    'feedback-black': string;
  }

  /**
   * Webpack CSS module export structure
   */
  export interface CSSModuleExport {
    /** Module identifier */
    id: string | number;
    /** CSS content as string */
    toString(): string;
    /** Module dependencies */
    i(modules: unknown[], mediaQuery?: string): void;
  }

  /**
   * The default export is a CSS module array compatible with css-loader
   * Format: [moduleId, cssContent, sourceMap?, media?]
   */
  const styles: CSSModuleExport;
  export default styles;
}

/**
 * CSS Content Summary:
 * 
 * Component Hierarchy:
 * - `.feedback-network-result`: Rounded badge-style indicator (28px height)
 *   - `.text`: Label text positioned relative
 *   - `.icon`: Icon container with inline-block display
 *   - `.arrow-icon`: Expandable arrow indicator
 *   - `.detect-icon`: 28x28px detection status icon
 * 
 * Modal Structure:
 * - `.feedback-list-modal`: 900px wide modal dialog
 *   - `.feedback-network-header`: Centered header with 88x88px image, 14px result text
 *   - `.feedback-network-body`: 260px scrollable area with status items
 *     - `.status-item`: 40px height rows with shadow and border-radius
 *   - `.feedback-network-footer`: Action buttons (46px height, 18px font)
 *   - `.feedback-network-empty`: 410px centered empty state with 80px icon
 * 
 * Theme Support:
 * - `.feedback-black`: Dark theme variant (#343538 background, white text)
 * 
 * Typography:
 * - Font families: PingFangSC-Regular, PingFangSC-Medium, PingFangSC-Semibold
 * - Sizes: 12px (body), 14px (titles), 18px (buttons)
 * - Colors: Light theme (#33353B, #999999), Dark theme (#fff, #d6d1d1)
 */