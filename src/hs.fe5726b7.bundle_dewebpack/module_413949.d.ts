/**
 * Asset module declaration for cursor auxiliary line SVG
 * 
 * This module exports the public URL path to a cursor auxiliary line SVG asset.
 * The asset is typically used in drawing or design interfaces to provide visual
 * guidance for cursor positioning.
 * 
 * @module CursorAuxiliaryLineAsset
 * @example
 * import cursorAuxLineUrl from './cursor_fuzhuxian.svg';
 * // Use the URL in an img tag or as a CSS background
 * <img src={cursorAuxLineUrl} alt="Cursor auxiliary line" />
 */

/**
 * Public URL path to the cursor auxiliary line SVG asset.
 * 
 * The path is resolved at build time and points to the bundled asset location.
 * File hash (70e2929d) ensures cache busting when the asset content changes.
 * 
 * @constant
 * @type {string}
 * @default "assets/cursor_fuzhuxian.70e2929d.svg"
 */
declare const cursorAuxiliaryLineAssetUrl: string;

export default cursorAuxiliaryLineAssetUrl;