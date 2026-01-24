/**
 * CSS module type definition
 * Represents a dynamically imported CSS module with locally scoped class names
 */

/**
 * Style loader configuration object
 * Contains methods for injecting and managing CSS in the DOM
 */
interface StyleLoaderConfig {
  /** Transform function applied to style tags before insertion */
  styleTagTransform: () => void;
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  /** Function to insert style elements into the DOM */
  insert: (target: string) => void;
  /** DOM manipulation API for style handling */
  domAPI: () => void;
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module locals interface
 * Maps CSS class names to their scoped equivalents
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * CSS Module export structure
 */
interface CSSModule {
  /** Locally scoped class name mappings */
  locals?: CSSModuleLocals;
  [key: string]: unknown;
}

/**
 * Re-exported CSS module members (excluding 'default')
 * All named exports from the original CSS module are available
 */
export * from './original-css-module';

/**
 * Default export: CSS module locals object
 * Contains the scoped class name mappings, or undefined if not available
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;
export default cssModuleLocals;