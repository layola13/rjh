/**
 * Asset path declaration for SVG arc graphic
 * 
 * This module exports the public URL path to the arc.svg asset.
 * The hash (0a9da7c2) is typically added during build for cache busting.
 */
declare module '*/assets/arc.0a9da7c2.svg' {
  /**
   * Public URL path to the arc SVG asset
   * @example
   * import arcAssetPath from './assets/arc.0a9da7c2.svg';
   * // arcAssetPath = "/assets/arc.0a9da7c2.svg"
   */
  const assetPath: string;
  export default assetPath;
}

/**
 * Generic declaration for SVG asset imports
 * Allows importing any SVG file as a string path
 */
declare module '*.svg' {
  /**
   * Public URL path to the SVG asset
   */
  const content: string;
  export default content;
}