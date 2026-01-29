/**
 * Default preview image asset path
 * This module exports the public URL path to the default preview image asset.
 * The image is typically used as a fallback when no preview image is available.
 */
declare module '*/assets/default_preview_image.09dc72ba.png' {
  /**
   * Public URL path to the default preview image asset
   * @example
   * import defaultPreviewImage from './assets/default_preview_image.09dc72ba.png';
   * // Returns: "/assets/default_preview_image.09dc72ba.png"
   */
  const assetPath: string;
  export default assetPath;
}

/**
 * Re-export for direct usage
 * The asset path points to the default preview image used throughout the application
 */
export const DEFAULT_PREVIEW_IMAGE_PATH: string;
export default DEFAULT_PREVIEW_IMAGE_PATH;