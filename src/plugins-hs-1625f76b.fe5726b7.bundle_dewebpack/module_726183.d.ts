/**
 * CSS Module exports type definition
 * Represents a CSS module that may export class name mappings
 */

/**
 * CSS module class name mappings.
 * Maps logical names to actual CSS class names (possibly hashed).
 */
export type CSSModuleClasses = Record<string, string> | undefined;

/**
 * Style injection configuration for CSS modules.
 * Contains functions to handle style tag creation, attribute setting, and DOM manipulation.
 */
interface StyleLoaderAPI {
  /** Transform and insert style content into a style tag */
  styleTagTransform: () => void;
  
  /** Set attributes on the style element */
  setAttributes: () => void;
  
  /** Insert the style element into the DOM at the specified location */
  insert: (target: string) => void;
  
  /** DOM manipulation API for style injection */
  domAPI: () => void;
  
  /** Create and insert the style element */
  insertStyleElement: () => void;
}

/**
 * CSS Module content structure.
 * Contains the actual CSS content and optional local class name mappings.
 */
interface CSSModuleContent {
  /** Local class name mappings exported by the CSS module */
  locals?: Record<string, string>;
  
  /** CSS content as string or array */
  [key: string]: unknown;
}

/**
 * Default export: CSS module class name mappings.
 * Returns an object mapping logical class names to their actual (possibly hashed) class names,
 * or undefined if the module has no exports.
 */
declare const cssModuleExports: CSSModuleClasses;

export default cssModuleExports;

/**
 * Re-exports all named exports from the underlying CSS module content,
 * excluding the 'default' export.
 */
export * from './css-module-content';