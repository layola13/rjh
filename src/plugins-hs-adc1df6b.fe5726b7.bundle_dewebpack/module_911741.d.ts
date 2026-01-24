/**
 * CSS Module type definitions
 * Represents exported class names from a CSS/SCSS module
 */

/**
 * CSS Module class names mapping
 * Each key represents a local class name in the source CSS,
 * and its value is the transformed/hashed class name used in production
 */
interface CSSModuleClasses {
  readonly [key: string]: string;
}

/**
 * Style loader configuration object
 * Configures how CSS modules are injected and managed in the DOM
 */
interface StyleLoaderOptions {
  /** Transform function to apply to style tags before insertion */
  styleTagTransform?: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes?: () => void;
  
  /** DOM insertion strategy (typically bound to 'head' or 'body') */
  insert?: () => void;
  
  /** DOM API adapter for style manipulation */
  domAPI?: () => void;
  
  /** Factory function to create style elements */
  insertStyleElement?: () => void;
}

/**
 * CSS Module exports
 * Default export contains the local class name mappings,
 * or undefined if no locals are present
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * Re-exported members from the original CSS module
 * Allows named imports of specific CSS classes or utilities
 */
export * from './original-css-module';