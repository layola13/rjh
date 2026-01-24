/**
 * Asset module that exports the path to the north-south resize cursor SVG.
 * This cursor is typically used for vertical resizing operations in UI components.
 * 
 * @module nsResize_cursor
 * @example
 * import cursorPath from './nsResize_cursor';
 * element.style.cursor = `url(${cursorPath}), ns-resize`;
 */

/**
 * The public path to the north-south resize cursor SVG asset.
 * The path is resolved at build time and includes a content hash for cache busting.
 */
declare const cursorAssetPath: string;

export default cursorAssetPath;