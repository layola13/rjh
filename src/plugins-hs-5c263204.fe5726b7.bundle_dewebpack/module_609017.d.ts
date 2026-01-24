/**
 * CSS styles for feedback list row reply and description components
 * Defines layout, typography, and theming for feedback UI elements
 */

/**
 * CSS module export type definition
 * Represents a webpack CSS loader module that exports style definitions
 */
declare module 'module_609017' {
  /**
   * CSS content string containing all style rules for feedback components
   * 
   * Includes styles for:
   * - `.feedback-list-row-reply` - Main reply container with flex layout
   * - `.feedback-list-row-description` - Description container with same layout
   * - `.feedback-list-row-reply-header` - Header section with title and timestamp
   * - `.feedback-list-row-reply-title` - Reply title text (12px, bold, dark gray)
   * - `.feedback-list-divider` - Vertical divider line between header elements
   * - `.feedback-list-row-reply-time` - Timestamp text (10px, semi-transparent)
   * - `.feedback-list-row-reply-content` - Main content text with word-break and user-select
   * - `.feedback-list-row-reply-images` - Image gallery container (flex layout)
   * - `.feedback-list-row-reply-image` - Individual image wrapper (33% width, rounded corners)
   * - `.feedback-list-row-reply-image-mask` - Overlay mask for image count indicator
   * - `.feedback-list-row-reply-image-mask-count` - Count number display (26px, bold)
   * - `.feedback-black` - Dark theme variant with white text colors
   */
  const styles: string;
  
  export = styles;
}

/**
 * Type definition for the CSS loader function signature
 * @param shouldUseSourceMap - Whether to include source maps in the output
 * @returns Array containing module metadata and CSS content
 */
type CSSLoaderFunction = (shouldUseSourceMap: boolean) => Array<[string, string]>;

/**
 * Module metadata interface
 */
interface CSSModule {
  /** Unique module identifier */
  id: string | number;
  
  /** Module exports - typically a CSS loader utility function */
  exports: CSSLoaderFunction;
}

/**
 * Webpack require function type
 * @param moduleId - The numeric ID of the module to load
 * @returns The CSS loader function
 */
type WebpackRequire = (moduleId: number) => CSSLoaderFunction;