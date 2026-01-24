/**
 * CSS module declarations for image wrapper component
 * Contains styles for image container, loading state, and image element
 */

declare module '*.css' {
  const content: string;
  export default content;
}

/**
 * Image wrapper CSS module interface
 * Defines the structure and styling for an image container component
 */
export interface ImageWrapperStyles {
  /**
   * Main container wrapper for images
   * - Dimensions: 100% width × 138px height
   * - Layout: Flexbox with centered content
   * - Overflow: Hidden to clip overflowing content
   */
  'image-wrapper': string;

  /**
   * Loading indicator overlay
   * Positioned absolutely within the wrapper
   */
  'image-wrapper-loading': string;

  /**
   * Actual image element styles
   * - Dimensions: 246px × 137px
   * - Border radius: 8px for rounded corners
   */
  'image-wrapper-image': string;
}

/**
 * CSS content string containing image wrapper styles
 * Includes responsive container, loading state, and image element styling
 */
declare const styles: string;

export default styles;