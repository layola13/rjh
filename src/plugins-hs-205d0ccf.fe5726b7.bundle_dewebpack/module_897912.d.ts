/**
 * Asset module declaration for flipX SVG icon
 * Exports the public URL path to the flipX.svg asset
 */
declare module '*/assets/flipX.*.svg' {
  /**
   * The public URL path to the flipX SVG asset
   * @example "assets/flipX.9c2806e7.svg"
   */
  const assetPath: string;
  export default assetPath;
}

/**
 * FlipX SVG asset URL
 * Contains the hashed filename for cache busting
 */
export declare const flipXAssetUrl: string;

/**
 * Type definition for SVG asset modules
 */
export type SvgAssetModule = string;