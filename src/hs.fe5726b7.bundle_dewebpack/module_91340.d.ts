/**
 * Asset module that exports the path to the iconfont TTF file.
 * This module provides access to the iconfont typeface used throughout the application.
 * 
 * @module IconFontAsset
 * @version 1.0.0
 * @since 2018-11-08 (timestamp: 1541672292289)
 */

/**
 * The relative URL path to the iconfont TTF (TrueType Font) file.
 * This path is resolved relative to the application's public path.
 * 
 * @constant
 * @type {string}
 * @example
 * // Usage in CSS or style loader
 * @font-face {
 *   font-family: 'IconFont';
 *   src: url('./assets/iconfont.98f48352.ttf?t=1541672292289');
 * }
 */
declare const iconFontPath: string;

export default iconFontPath;