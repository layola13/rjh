/**
 * CSS Module Exports
 * Type definitions for CSS module with style injection capabilities
 */

/**
 * CSS Module with locals (CSS class names mapping)
 */
interface CSSModule {
  /** CSS content as string */
  toString(): string;
  /** CSS class names mapping */
  locals?: Record<string, string>;
}

/**
 * Style loader API options
 */
interface StyleLoaderOptions {
  /** Function to transform and inject style tags into DOM */
  styleTagTransform: () => void;
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  /** Function to insert style element into specified location */
  insert: (target: string) => void;
  /** DOM API utilities for style manipulation */
  domAPI: () => void;
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * Re-exported CSS module members (excluding 'default')
 * All named exports from the original CSS module are re-exported here
 */
export * from './original-css-module';

/**
 * Default export: CSS class names mapping
 * Returns the locals object containing CSS class name mappings,
 * or undefined if no locals are defined
 */
declare const cssModuleLocals: Record<string, string> | undefined;

export default cssModuleLocals;