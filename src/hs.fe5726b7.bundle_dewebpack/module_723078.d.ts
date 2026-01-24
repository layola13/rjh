/**
 * CSS Module loader type definitions
 * Represents a webpack-processed CSS module with style injection capabilities
 */

/**
 * CSS module class name mappings
 * Maps local class names to their hashed/scoped equivalents
 */
export type CSSModuleClasses = Record<string, string>;

/**
 * Style injection configuration
 */
interface StyleLoaderOptions {
  /**
   * Transform function to manipulate style tags before insertion
   */
  styleTagTransform: () => (css: string, styleElement: HTMLStyleElement) => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => (element: HTMLElement) => void;
  
  /**
   * DOM insertion strategy
   * @param target - The target selector or element to insert styles into
   */
  insert: (target: string) => (element: HTMLElement) => void;
  
  /**
   * DOM manipulation API
   */
  domAPI: () => {
    update: (obj: { css: string; media?: string; sourceMap?: unknown }) => void;
    remove: () => void;
  };
  
  /**
   * Factory function to create style elements
   */
  insertStyleElement: () => (options: { css: string }) => HTMLStyleElement;
}

/**
 * CSS module export structure
 */
interface CSSModule {
  /**
   * Local class name mappings (if CSS Modules are enabled)
   */
  locals?: CSSModuleClasses;
  
  /**
   * Raw CSS content
   */
  toString(): string;
  
  /**
   * Module identifier
   */
  i?(modules: unknown[], mediaQuery?: string, dedupe?: boolean): void;
}

/**
 * Re-exported CSS module named exports
 * All named exports from the original CSS module (excluding 'default')
 */
export * from './original-css-module';

/**
 * Default export: CSS module class mappings or undefined
 * Contains the local class name mappings if CSS Modules are enabled,
 * otherwise undefined for plain CSS files
 */
declare const cssModuleExports: CSSModuleClasses | undefined;
export default cssModuleExports;