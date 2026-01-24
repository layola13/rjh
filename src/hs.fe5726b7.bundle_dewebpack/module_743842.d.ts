/**
 * CSS Module Declaration
 * 
 * This module represents a dynamically loaded CSS module with local class names.
 * The module uses style-loader infrastructure to inject styles into the DOM.
 */

/**
 * CSS Module Locals
 * 
 * An object containing the locally scoped class names exported by this CSS module.
 * Each key represents a class name defined in the source CSS file,
 * and the value is the transformed/hashed class name used in production.
 * 
 * @example
 * // If the CSS module defines .button and .container
 * import styles from './module';
 * console.log(styles.button); // 'button_a1b2c3'
 * console.log(styles.container); // 'container_d4e5f6'
 */
export type CSSModuleLocals = Record<string, string> | undefined;

/**
 * Style Loader Configuration
 * 
 * Configuration object used by style-loader to manage CSS injection.
 */
interface StyleLoaderConfiguration {
  /**
   * Transforms and applies the style tag to the DOM
   */
  styleTagTransform: () => void;
  
  /**
   * Sets attributes on the injected style elements
   */
  setAttributes: () => void;
  
  /**
   * Inserts the style element into the specified DOM location
   * @param target - The DOM location where styles should be injected (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM manipulation API used by the loader
   */
  domAPI: () => void;
  
  /**
   * Creates and configures style elements before insertion
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module Export
 * 
 * The default export represents the processed CSS module's local class names.
 * Returns undefined if the module has no local exports.
 */
declare const cssModuleExport: CSSModuleLocals;

export default cssModuleExport;

/**
 * Re-exported members from the underlying CSS processing module (n(108087))
 * 
 * All named exports from the base module are re-exported here,
 * excluding the 'default' export which is handled separately.
 */
export * from './underlying-css-module';