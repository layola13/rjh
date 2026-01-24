/**
 * Webpack asset module that exports the path to a finish icon SVG file.
 * This module represents a static asset reference that would be resolved
 * at build time by webpack's asset module system.
 */

/**
 * The public path to the finish icon SVG asset.
 * This path is constructed by webpack at build time, combining the
 * public path configuration with the hashed filename.
 * 
 * @example
 * // In a React/Vue component:
 * import finishIconPath from './finish-icon';
 * <img src={finishIconPath} alt="Finish" />
 */
declare const assetPath: string;

export default assetPath;