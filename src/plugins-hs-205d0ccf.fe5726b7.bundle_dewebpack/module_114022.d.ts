/**
 * Webpack asset module that exports the URL path to the SVG file.
 * This module provides access to the "added_house_template" icon asset.
 * 
 * @module AssetModule
 * @description Returns the public URL path for the added_house_template.svg asset
 */

/**
 * The public URL path to the added_house_template SVG asset.
 * This path is typically resolved by the bundler and includes the content hash for cache busting.
 * 
 * @constant {string} addedHouseTemplateAssetUrl - The full public path to the SVG file
 * @example
 * // Usage in a component:
 * import addedHouseTemplateAssetUrl from './assets/added_house_template';
 * <img src={addedHouseTemplateAssetUrl} alt="Added House Template" />
 */
declare const addedHouseTemplateAssetUrl: string;

export default addedHouseTemplateAssetUrl;