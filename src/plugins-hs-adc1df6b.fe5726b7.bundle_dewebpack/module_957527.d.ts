/**
 * Webpack asset module - exports a URL path to an image asset.
 * This module represents a PNG image file that gets processed by Webpack's asset loader.
 * The image is copied to the output directory with a content hash in the filename.
 * 
 * Original Module ID: 957527
 * Asset: hs_zhanshi_pro_gray.1b8b4304.png
 */

/**
 * The public URL path to the processed image asset.
 * This is typically the public path configured in Webpack + the hashed filename.
 * 
 * @example
 * // Usage in a component:
 * import imageUrl from './hs_zhanshi_pro_gray.png';
 * <img src={imageUrl} alt="展示专业灰色图标" />
 */
declare const imageAssetUrl: string;

export default imageAssetUrl;