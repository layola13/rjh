/**
 * Webpack asset module that exports the public URL path for an image asset.
 * This module provides the runtime URL for the CommercialHandle5 PNG image,
 * typically used in import statements like: import imgUrl from './CommercialHandle5.png'
 * 
 * @module CommercialHandle5Asset
 */

/**
 * The public URL path to the CommercialHandle5 image asset.
 * This string is constructed by concatenating the webpack public path with the hashed filename.
 * 
 * Format: {publicPath}/img/CommercialHandle5.{contentHash}.png
 * Example: "/static/img/CommercialHandle5.87e97800.png"
 */
declare const commercialHandle5ImageUrl: string;

export default commercialHandle5ImageUrl;