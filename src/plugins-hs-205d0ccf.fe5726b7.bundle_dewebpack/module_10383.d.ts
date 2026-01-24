/**
 * CSS module exports type definition
 * Original Module ID: 10383
 * 
 * This module exports CSS styles for a queueing card component.
 * The styles include positioning for card labels and hover masks with semi-transparent overlays.
 */

/**
 * CSS loader function signature
 * @param insertAtTop - Whether to insert styles at the top of the document head (false = append at bottom)
 * @returns A CSS loader instance with a push method for registering style rules
 */
declare function cssLoader(insertAtTop: boolean): CSSLoaderInstance;

/**
 * CSS loader instance interface
 * Provides methods to register and manage CSS style rules
 */
interface CSSLoaderInstance {
  /**
   * Registers a CSS rule with the loader
   * @param rule - Tuple containing module identifier and CSS content
   */
  push(rule: [moduleId: string | number, cssContent: string]): void;
}

/**
 * Module exports interface
 * Represents the structure of a webpack CSS module export
 */
interface CSSModuleExports {
  /** Module identifier */
  id: string | number;
  
  /** CSS loader instance for managing styles */
  exports: CSSLoaderInstance;
}

/**
 * Webpack module factory function type
 * @param exports - The module's exports object
 * @param module - The module metadata object
 * @param require - Webpack's require function for loading dependencies
 */
declare type WebpackModuleFactory = (
  exports: CSSModuleExports,
  module: CSSModuleExports,
  require: (moduleId: number) => CSSLoaderInstance
) => void;

/**
 * CSS content for queueing card component
 * 
 * Styles include:
 * - .queueing-card .card-label: Absolutely positioned label with centered white text
 * - .queueing-card .hover-mask: Semi-transparent black overlay for hover effects
 */
declare const moduleFactory: WebpackModuleFactory;

export default moduleFactory;