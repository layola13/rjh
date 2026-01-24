/**
 * Webpack asset module that exports a hashed image file path.
 * This represents a static asset (PNG image) that has been processed
 * by Webpack's asset/resource loader.
 * 
 * Original module ID: 8bb5
 * Asset: CommercialHandle8 image with content hash 8bf0b955
 */

/**
 * The public path prefix configured in Webpack for all emitted assets.
 * Typically points to the CDN URL or relative path where static assets are served.
 * 
 * @example "/assets/" or "https://cdn.example.com/static/"
 */
declare const WEBPACK_PUBLIC_PATH: string;

/**
 * Full URL or path to the CommercialHandle8 image asset.
 * The path includes content hash for cache busting.
 * 
 * Format: `${publicPath}img/CommercialHandle8.8bf0b955.png`
 */
export declare const commercialHandle8ImagePath: string;

export default commercialHandle8ImagePath;