/**
 * CSS Module type definitions
 * Represents a dynamically imported CSS module with local class names
 */

/**
 * CSS module locals object containing class name mappings
 * Maps CSS class names to their scoped/hashed equivalents
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style injection configuration options
 */
export interface StyleLoaderOptions {
  /** Function to transform and inject style tags into the DOM */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** Function to insert style elements into a specified DOM location */
  insert: (target: string) => void;
  
  /** DOM manipulation API for style injection */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS module export structure
 */
export interface CSSModule {
  /** Local class name mappings (if CSS Modules is enabled) */
  locals?: CSSModuleLocals;
  
  /** Additional CSS module properties */
  [key: string]: unknown;
}

/**
 * Default export: CSS module locals or undefined if no locals exist
 * This represents the class name mappings from the imported CSS module
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;

export default cssModuleLocals;

/**
 * Re-exported members from the underlying CSS module (excluding 'default')
 * Allows named imports of any additional exports from the CSS module
 */
export * from './css-module-source';