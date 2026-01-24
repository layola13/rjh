/**
 * CSS Module Declaration
 * 
 * This module exports CSS class names as a typed object.
 * Webpack uses this pattern to load CSS modules with style-loader.
 */

/**
 * CSS class names mapping exported by the CSS module
 * Keys are the class names defined in the source CSS file
 * Values are the transformed/scoped class names used at runtime
 */
declare const styles: Readonly<Record<string, string>>;

export default styles;

/**
 * Re-exported CSS module utilities (if any were present in module 531476)
 * These would be any named exports from the underlying CSS module
 */
export * from './module_531476';

/**
 * Type definition for CSS modules with locals
 * @internal
 */
export interface CSSModule {
  /** CSS class name mappings */
  locals?: Record<string, string>;
  /** CSS content as string */
  toString(): string;
  /** CSS source map (if available) */
  sourceMap?: unknown;
}