/**
 * CSS Modules style loader configuration and exports
 * @module StyleLoader
 */

/**
 * Style injection configuration options
 */
interface StyleLoaderOptions {
  /** Transform function for style tag manipulation */
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
 * CSS Modules locals object containing class name mappings
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style loader module exports
 * Contains all exported members from the CSS module
 */
declare const moduleExports: Record<string, unknown>;

/**
 * Default export - CSS Modules class name mappings
 * @default undefined when no locals are available
 */
declare const defaultExport: CSSModuleLocals | undefined;

export { moduleExports };
export default defaultExport;