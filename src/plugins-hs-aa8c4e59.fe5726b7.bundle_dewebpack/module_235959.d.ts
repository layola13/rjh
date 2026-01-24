/**
 * CSS Module Loader Type Definition
 * 
 * This module exports CSS styles for auto-recommend live hint buttons and feedback notice components.
 * The styles are loaded through a webpack css-loader pipeline.
 * 
 * @module AutoRecommendLiveHintStyles
 */

/**
 * Webpack module context containing module metadata
 */
interface WebpackModuleContext {
  /** Unique module identifier */
  id: string | number;
  /** Module exports object */
  exports: CSSModuleExports;
}

/**
 * CSS Module exports interface
 * Represents the return value from the css-loader
 */
interface CSSModuleExports {
  /**
   * Pushes CSS content to the style accumulator
   * @param content - Tuple containing module ID and CSS string
   */
  push(content: [string | number, string]): void;
}

/**
 * CSS Loader factory function signature
 * @param sourceMap - Whether to generate source maps for the CSS
 * @returns CSS module exports object with push method
 */
type CSSLoaderFactory = (sourceMap: boolean) => CSSModuleExports;

/**
 * Webpack module definition function for CSS styles
 * 
 * This module contains styles for:
 * - `.action.auto-recommend-live-hint-button` - Base button styles
 * - `.auto-recommend-live-hint-normal-button` - Normal state button (gray background)
 * - `.auto-recommend-live-hint-active-button` - Active state button (blue background)
 * - `.homestyler-ui-components .feedback-notice-wrapper` - Notice component padding
 * 
 * @param moduleContext - Webpack module context object
 * @param exports - Module exports object (unused in this CSS module)
 * @param cssLoaderRequire - Require function to load the css-loader (module 986380)
 */
declare function cssModuleDefinition(
  moduleContext: WebpackModuleContext,
  exports: unknown,
  cssLoaderRequire: (moduleId: number) => CSSLoaderFactory
): void;

export default cssModuleDefinition;

/**
 * CSS Classes exported by this module
 */
export interface AutoRecommendLiveHintClasses {
  /** Base button class with flexbox layout and border-radius */
  'action auto-recommend-live-hint-button': string;
  
  /** Normal state: gray background (#f2f2f2), dark text (#33353B) */
  'auto-recommend-live-hint-normal-button': string;
  
  /** Active state: blue background (#396EFE), white text */
  'auto-recommend-live-hint-active-button': string;
  
  /** Feedback notice wrapper with adjusted padding */
  'feedback-notice-wrapper': string;
}

/**
 * Style specifications for the auto-recommend live hint button component
 */
export interface ButtonStyleSpec {
  /** Button dimensions */
  dimensions: {
    width: '100px';
    height: '30px';
    borderRadius: '15px';
  };
  
  /** Normal state colors */
  normalState: {
    background: '#f2f2f2';
    color: '#33353B';
    hoverBackground: '#E9E9E9';
    hoverColor: '#396EFE';
  };
  
  /** Active state colors */
  activeState: {
    background: '#396EFE';
    color: '#ffffff';
    hoverBackground: '#305DD7';
  };
}