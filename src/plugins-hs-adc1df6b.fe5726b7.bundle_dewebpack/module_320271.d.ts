/**
 * CSS module export type definition
 * Module ID: 320271
 * 
 * This module exports CSS styles for a property bar label radio input component.
 * The styles are processed through a CSS loader (module 986380).
 */

/**
 * CSS Module Export Function
 * 
 * @param exports - The module exports object
 * @param cssLoader - The CSS loader module (ID: 986380)
 * @param moduleLoader - The module loader function
 * @returns void
 */
declare module "module_320271" {
  /**
   * CSS class names for the property bar label radio input component
   */
  export interface PropertyBarLabelRadioInputStyles {
    /** Root container class - full width wrapper */
    "property-bar-tpzz-labelradioinput": string;
    
    /** Label element class - styled text label (color: #888, font-size: 12px) */
    "property-bar-tpzz-labelradioinput__label": string;
    
    /** Content container class - flexbox layout with space-between justification */
    "property-bar-tpzz-labelradioinput__content": string;
    
    /** Input wrapper class - flexbox container for input elements */
    "property-bar-tpzz-labelradioinput__input": string;
  }

  /**
   * CSS loader push array format
   * [moduleId, cssContent, sourceMap?]
   */
  type CSSLoaderPushArray = [
    /** Module identifier */
    moduleId: string | number,
    /** CSS content string */
    cssContent: string,
    /** Optional source map */
    sourceMap?: string | object | boolean
  ];

  /**
   * CSS Loader module interface
   */
  export interface CSSLoader {
    /**
     * Push CSS content to the loader
     * @param data - Array containing module ID, CSS content, and optional source map
     */
    push(data: CSSLoaderPushArray): void;
  }

  const styles: PropertyBarLabelRadioInputStyles;
  export default styles;
}