/**
 * CSS Module Declaration
 * 
 * This module handles style injection and exports CSS class name mappings.
 * Used with webpack style-loader for CSS Modules support.
 */

/**
 * Style injection configuration interface
 */
interface StyleLoaderConfig {
  /** Transform function for style tags */
  styleTagTransform: () => void;
  /** Set attributes on style elements */
  setAttributes: () => void;
  /** Insert style element into DOM */
  insert: (target: string) => void;
  /** DOM API utilities */
  domAPI: () => void;
  /** Create and insert style element */
  insertStyleElement: () => void;
}

/**
 * CSS Modules class name mapping
 * Maps logical class names to generated unique class names
 */
type CSSModuleClasses = Record<string, string> | undefined;

/**
 * Default export: CSS Module locals (class name mappings)
 * Returns undefined if no CSS Modules are present
 */
declare const cssModuleLocals: CSSModuleClasses;

export default cssModuleLocals;

/**
 * Re-exported utilities from style loader module (n(278937))
 * Exports all named exports except 'default'
 */
export * from './style-loader-module';