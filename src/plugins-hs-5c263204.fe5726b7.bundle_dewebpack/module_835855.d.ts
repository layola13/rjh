/**
 * CSS Module Export Type Definition
 * 
 * This module exports CSS styles for a beginner tutorial iframe wrapper component.
 * The styles support both fullscreen and mini modal display modes.
 * 
 * @module BeginnerIframeStyles
 */

/**
 * CSS module loader function signature
 * 
 * @param sourcemap - Whether to include source maps in the CSS output
 * @returns CSS loader instance with push method for adding style rules
 */
type CSSLoaderFunction = (sourcemap: boolean) => CSSLoader;

/**
 * CSS loader interface for managing style rules
 */
interface CSSLoader {
  /**
   * Adds a CSS rule to the loader
   * 
   * @param rule - Tuple containing module ID and CSS content string
   */
  push(rule: [string, string]): void;
}

/**
 * Webpack module exports interface
 */
interface ModuleExports {
  /** CSS loader instance containing beginner iframe wrapper styles */
  exports: CSSLoader;
  /** Unique module identifier */
  id: string;
}

/**
 * CSS class definitions for beginner iframe wrapper component
 * 
 * Includes styles for:
 * - `.beginner-iframe-wrapper` - Full-screen overlay container (z-index: 5000)
 * - `.beginner-iframe-wrapper.mini` - Modal overlay with semi-transparent backdrop
 * - `.beginner-iframe-wrapper.mini .beginner-iframe` - Centered modal iframe (900x600px)
 * - `.beginner-iframe-wrapper .beginner-loading-wrapper` - Centered loading indicator
 * - `.beginner-iframe-wrapper .beginner-iframe` - Full-size iframe element
 */
declare const styles: string;

export default styles;

/**
 * CSS Content:
 * 
 * .beginner-iframe-wrapper - Fixed fullscreen white overlay
 * .beginner-iframe-wrapper.mini - Semi-transparent modal backdrop
 * .beginner-iframe-wrapper.mini .beginner-iframe - Centered 900x600 modal with border radius
 * .beginner-iframe-wrapper .beginner-loading-wrapper - Absolutely centered loading spinner
 * .beginner-iframe-wrapper .beginner-iframe - Full width/height iframe
 */