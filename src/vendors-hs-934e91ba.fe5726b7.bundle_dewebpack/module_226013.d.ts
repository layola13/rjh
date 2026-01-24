/**
 * Ladda Button Loading Indicator - Type Definitions
 * 
 * Ladda is a UI library that provides buttons with built-in loading indicators.
 * This module exports CSS styles for the Ladda button component.
 * 
 * @see http://lab.hakim.se/ladda
 * @license MIT
 * @copyright (C) 2016 Hakim El Hattab, http://hakim.se
 */

/**
 * CSS module loader function type
 * Typically provided by webpack's css-loader
 */
declare function cssLoader(sourceMap: boolean): {
  push: (entry: [string, string, string]) => void;
};

/**
 * Ladda button animation styles
 * 
 * Supported animation styles:
 * - expand-right: Expands button to the right during loading
 * - expand-left: Expands button to the left during loading
 * - expand-up: Expands button upward during loading
 * - expand-down: Expands button downward during loading
 * - slide-left: Slides label left and spinner in from right
 * - slide-right: Slides label right and spinner in from left
 * - slide-up: Slides label up and spinner in from bottom
 * - slide-down: Slides label down and spinner in from top
 * - zoom-in: Zooms in the spinner while zooming out the label
 * - zoom-out: Zooms out the spinner while zooming in the label
 * - contract: Contracts button into a circle
 * - contract-overlay: Contracts button with overlay effect
 */
type LaddaAnimationStyle =
  | 'expand-right'
  | 'expand-left'
  | 'expand-up'
  | 'expand-down'
  | 'slide-left'
  | 'slide-right'
  | 'slide-up'
  | 'slide-down'
  | 'zoom-in'
  | 'zoom-out'
  | 'contract'
  | 'contract-overlay';

/**
 * Ladda button color themes
 */
type LaddaColor = 'green' | 'blue' | 'red' | 'purple' | 'mint';

/**
 * Ladda button sizes
 */
type LaddaSize = 'xs' | 's' | 'l' | 'xl';

/**
 * Ladda button HTML attributes (for reference)
 */
interface LaddaButtonAttributes {
  /** Animation style for the loading state */
  'data-style'?: LaddaAnimationStyle;
  
  /** Color theme for the button */
  'data-color'?: LaddaColor;
  
  /** Button size variant */
  'data-size'?: LaddaSize;
  
  /** Loading state indicator (presence of attribute indicates loading) */
  'data-loading'?: boolean;
}

/**
 * Module exports the CSS content as a webpack module
 * 
 * @param moduleExports - The module.exports object
 * @param require - Webpack require function
 * @param cssLoaderFactory - CSS loader factory function (module 986380)
 */
declare module 'ladda-styles' {
  const content: string;
  export default content;
}

/**
 * Webpack module definition
 * 
 * @param moduleExports - Module exports object
 * @param require - Webpack require function  
 * @param cssLoaderFactory - Factory function for CSS loader (ID: 986380)
 */
export default function (
  moduleExports: { exports: unknown; id: string },
  require: (moduleId: number) => typeof cssLoader,
  cssLoaderFactory: (moduleId: number) => typeof cssLoader
): void;