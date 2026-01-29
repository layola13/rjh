/**
 * Webpack asset module export
 * Exports the public URL path for a static asset (PNG image)
 */

/**
 * The public URL path to the design asset image.
 * This path is resolved by the bundler and points to the optimized asset in the distribution folder.
 * 
 * @example
 * import designImageUrl from './assets/design.png';
 * // designImageUrl === '/assets/design.b8db7387.png'
 */
declare const assetUrl: string;

export default assetUrl;