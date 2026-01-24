/**
 * Asset module that exports the path to the Pinhua guideline SVG asset.
 * This module provides a reference to a static SVG file used for guideline display.
 * 
 * @module PinhuaGuidelineAsset
 */

/**
 * The public path to the Pinhua guideline SVG asset.
 * This path is resolved relative to the application's public URL and points
 * to the static SVG file with content hash for cache busting.
 * 
 * @type {string}
 * @example
 * // Usage in component
 * import guidelineAssetPath from './PinhuaGuidelineAsset';
 * <img src={guidelineAssetPath} alt="Pinhua Guideline" />
 */
declare const pinhuaGuidelineAssetPath: string;

export default pinhuaGuidelineAssetPath;

/**
 * Asset metadata for type checking and documentation purposes
 */
export interface AssetMetadata {
  /** The original filename without hash */
  readonly originalName: 'Pinhua_guideline_01.svg';
  /** The hashed filename for cache busting */
  readonly hashedName: 'Pinhua_guideline_01.4d8924ec.svg';
  /** The asset type */
  readonly type: 'image/svg+xml';
  /** The relative path from the assets directory */
  readonly relativePath: 'assets/Pinhua_guideline_01.4d8924ec.svg';
}