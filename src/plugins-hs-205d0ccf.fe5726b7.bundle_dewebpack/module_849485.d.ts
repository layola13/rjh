/**
 * CSS Module for balloon tip component styling
 * Provides styles for tooltip-like balloon tips with light/dark themes
 */

/**
 * Webpack CSS loader module export function
 * @param exports - Module exports object
 * @param cssLoader - CSS loader function from webpack
 * @param cssLoaderFactory - Factory function that creates CSS loader with source map configuration
 */
declare module 'module_849485' {
  /**
   * Balloon tip theme variants
   */
  export type BalloonTipTheme = 'teaching-light' | 'teaching-black';

  /**
   * CSS class names exported by this module
   */
  export interface BalloonTipStyles {
    /** Main wrapper container for balloon tip (max-width: 280px, rounded corners) */
    'ballon-tip-wrapper': string;
    
    /** Content container with padding (12px) */
    'ballon-tip-content': string;
    
    /** Text content area with right margin and custom font (AlibabaPuHuiTi-Bold) */
    'ballon-tip-word': string;
    
    /** Close button positioned at top-right corner */
    'ballon-tip-close': string;
    
    /** "Do not remind again" checkbox/label area with top margin */
    'ballon-not-remind': string;
    
    /** Light theme variant (dark background #1c1c1c, white text) */
    'teaching-light': string;
    
    /** Dark theme variant (white background, black text) */
    'teaching-black': string;
    
    /** Arrow element for light theme balloon tips */
    'ballon-tips-arrow': string;
  }

  /**
   * CSS module exports
   * Contains style definitions for balloon tooltip component with theme support
   * 
   * Features:
   * - Responsive max-width (280px)
   * - Rounded corners (8px border-radius)
   * - Two theme variants (light/dark)
   * - Hover effects with underline
   * - Absolute positioned close button
   * - Custom font family support (AlibabaPuHuiTi-Bold)
   */
  const styles: BalloonTipStyles;
  
  export default styles;
}

/**
 * Raw CSS content exported by the module
 * This string contains all compiled CSS rules for balloon tip components
 */
export type CSSModuleContent = string;

/**
 * Webpack module loader signature
 * @param module - Module object containing id and exports
 * @param exports - Module exports object
 * @param require - Webpack require function for loading dependencies
 */
export type WebpackModuleLoader = (
  module: { id: string | number; exports: any },
  exports: any,
  require: (moduleId: number) => any
) => void;