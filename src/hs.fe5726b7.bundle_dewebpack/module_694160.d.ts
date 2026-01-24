/**
 * Default thumbnail asset path when no thumbnail is available.
 * This module exports the webpack-generated asset URL for the "no thumbnail" SVG image.
 * 
 * @module NoThumbnailAsset
 * @remarks
 * This asset is typically used as a fallback when media content lacks a preview image.
 * The hash in the filename (2ba32daa) ensures cache-busting when the asset changes.
 */

/**
 * The relative URL path to the "no thumbnail" SVG asset.
 * Typically resolves to a path like "/assets/nothumnail.2ba32daa.svg"
 * 
 * @public
 */
declare const noThumbnailAssetPath: string;

export default noThumbnailAssetPath;