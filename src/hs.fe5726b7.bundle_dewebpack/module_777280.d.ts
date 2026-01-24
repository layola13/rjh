/**
 * Style loader module configuration and exports
 * Handles CSS module loading, injection, and locale management
 */

/**
 * CSS module locals type - represents exported class names from CSS modules
 */
export type CSSModuleLocals = Record<string, string> | undefined;

/**
 * Style loader configuration options
 */
export interface StyleLoaderOptions {
  /** Transform function to apply to style tags before insertion */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** DOM insertion function bound to target element */
  insert: (target: string) => void;
  
  /** DOM API manipulation functions */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * Style module content type
 */
export interface StyleModule {
  /** CSS module class name mappings */
  locals?: CSSModuleLocals;
  
  /** Additional module properties */
  [key: string]: unknown;
}

/**
 * Re-exported members from the style module
 * Excludes the 'default' export
 */
export * from './style-module';

/**
 * Default export: CSS module locals (class name mappings)
 * Returns the locals object if available, otherwise undefined
 */
declare const cssModuleLocals: CSSModuleLocals;
export default cssModuleLocals;