/**
 * CSS module definition for property bar dropdown number component
 * @module PropertyBarDropdownNumberStyles
 */

/**
 * CSS module export function type
 * Webpack css-loader module that exports CSS styles
 */
declare module 'module_416653' {
  /**
   * Exports CSS styles through webpack css-loader
   * @param moduleExports - The module exports object
   * @param styleLoader - Webpack style loader instance from module 986380
   * @returns void
   */
  export default function(
    moduleExports: { id: string; exports: unknown },
    styleLoader: unknown,
    require: (moduleId: number) => CSSLoaderAPI
  ): void;

  /**
   * CSS Loader API interface
   */
  interface CSSLoaderAPI {
    /**
     * Creates a CSS module export
     * @param sourceMap - Whether to include source maps
     * @returns CSS module with push method
     */
    (sourceMap: boolean): CSSModule;
  }

  /**
   * CSS Module interface
   */
  interface CSSModule {
    /**
     * Pushes CSS content to the module
     * @param content - Tuple containing module ID and CSS string
     */
    push(content: [string, string]): void;
  }

  /**
   * CSS Classes exported by this module
   */
  export interface PropertyBarDropdownNumberStyles {
    /** Main container for property bar dropdown number component */
    'property-bar-dropdownnumber': string;
    
    /** Unit selector styling - hides dropdown icon */
    'property-bar-dropdownnumber-unit': string;
    
    /** Label text styling with negative margin adjustment */
    'dropdownnumber-label__text': string;
    
    /** Select list container with max height constraint */
    'tp-select-list-container': string;
    
    /** Dropdown icon styling (hidden in unit selector) */
    'tp-select-downicon': string;
  }
}