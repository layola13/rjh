/**
 * CSS Module Exports Declaration
 * Original Module ID: 71316
 * 
 * This module exports CSS styles for the right property bar's ceiling-related components.
 * The styles are processed through webpack's css-loader and injected into the application.
 */

/**
 * Webpack css-loader module export function type
 * @param sourceMap - Whether to include source maps in the CSS output
 * @returns CSS loader instance with push method for style registration
 */
type CssLoaderFunction = (sourceMap: boolean) => {
  /**
   * Registers CSS content with the style system
   * @param entry - Tuple containing module ID and CSS content string
   */
  push(entry: [string | number, string]): void;
};

/**
 * Module exports interface
 * Represents the structure of a webpack CSS module export
 */
interface CssModuleExports {
  /**
   * CSS loader function imported from the css-loader package
   * Module ID: 986380
   */
  (sourceMap: boolean): {
    push(entry: [string | number, string]): void;
  };
}

/**
 * Webpack module definition
 * @param exports - The module's exports object
 * @param module - The current module metadata
 * @param require - Webpack's require function for loading dependencies
 */
declare module 'module_71316' {
  /**
   * CSS content for right property bar ceiling components
   * 
   * Includes styles for:
   * - Ceiling circle checkbox input labels
   * - Ceiling molding checkbox and images
   * - Ceiling light slot components (inner/outer)
   * - Cornice type button image dividers
   * - Cascading ceiling molding dividers
   * - Ceiling molding cornice length input dividers
   * - Rotate button tooltips
   */
  const styles: string;
  export = styles;
}

/**
 * CSS class names available in this module
 */
declare namespace CeilingStyles {
  /** Right property bar container class */
  const rightpropertybar: string;
  
  /** Card container class */
  const card: string;
  
  /** Card item class */
  const carditem: string;
  
  /** Ceiling circle checkbox class */
  const ceilingCircleCheckbox: string;
  
  /** Input label class */
  const inputlabel: string;
  
  /** Ceiling molding checkbox class */
  const ceilingMoldingCheckbox: string;
  
  /** Ceiling molding circle image class */
  const ceilingMoldingCircleImage: string;
  
  /** Ceiling light slot checkbox class */
  const ceilingLightSlotCheckbox: string;
  
  /** Ceiling light slot circle image class */
  const ceilingLightSlotCircleImage: string;
  
  /** Ceiling outer light slot checkbox class */
  const ceilingOuterLightSlotCheckbox: string;
  
  /** Ceiling inner light slot checkbox class */
  const ceilingInnerLightSlotCheckbox: string;
  
  /** Cornice type button class */
  const corniceTypeButton: string;
  
  /** Image div class */
  const imgdiv: string;
  
  /** Cascading ceiling molding horizontal divider class */
  const cascadingCeilingMoldingHdivider: string;
  
  /** Ceiling molding cornice length input divider class */
  const ceilingMoldingCorniceLengthInputDivider: string;
  
  /** Rotate button with tooltip class */
  const rotateBtn: string;
  
  /** Tooltip class */
  const toolTip: string;
}

export = CeilingStyles;