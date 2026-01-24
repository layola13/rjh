/**
 * Webpack CSS loader module for pricing iframe dialog styles
 * @module PricingIframeDialogStyles
 */

/**
 * CSS loader export function type
 * @param useSourceMap - Whether to include source maps in the CSS output
 * @returns CSS loader instance with push method
 */
type CssLoaderExport = (useSourceMap: boolean) => {
  /**
   * Pushes CSS content to the loader
   * @param entry - Tuple containing module ID and CSS string
   */
  push(entry: [string | number, string]): void;
};

/**
 * Module exports function for pricing iframe dialog CSS styles
 * @param exports - Module exports object to be populated
 * @param _module - Module metadata (unused)
 * @param require - Webpack require function for loading dependencies
 */
declare function module_444259(
  exports: { 
    /**
     * CSS loader instance with module styles
     */
    exports?: ReturnType<CssLoaderExport> 
  },
  _module: unknown,
  require: (moduleId: number) => CssLoaderExport
): void;

/**
 * CSS class names used in the pricing iframe dialog component
 */
declare namespace PricingIframeDialogStyles {
  /**
   * Main dialog container class
   */
  const PRICING_IFRAME_DIALOG: '.pricing-iframe-dialog';
  
  /**
   * Modifier class to hide the close button
   */
  const HIDE_CLOSE_BTN: '.hide-close-btn';
  
  /**
   * Wrapper class for the pricing iframe content
   */
  const EZHOME_PRICING_IFRAME_WRAPPER: '.ezhome-pricing-iframe-wrapper';
  
  /**
   * Iframe element class
   */
  const PRICING_IFRAME: '.pricing-iframe';
  
  /**
   * Loading spinner wrapper class
   */
  const PRICING_LOADING_WRAPPER: '.pricing-loading-wrapper';
}

/**
 * Style configuration constants
 */
declare namespace PricingIframeDialogConfig {
  /**
   * Default iframe height in pixels
   */
  const IFRAME_HEIGHT: 550;
  
  /**
   * Modal border radius in pixels
   */
  const BORDER_RADIUS: 10;
  
  /**
   * Close button size in pixels
   */
  const CLOSE_BUTTON_SIZE: 30;
  
  /**
   * Close button icon font size in pixels
   */
  const CLOSE_ICON_SIZE: 18;
  
  /**
   * Close button position from top in pixels
   */
  const CLOSE_BUTTON_TOP: 30;
  
  /**
   * Close button position from right in pixels
   */
  const CLOSE_BUTTON_RIGHT: 30;
  
  /**
   * Transition duration for width changes in milliseconds
   */
  const TRANSITION_DURATION: 200;
}

export { module_444259, PricingIframeDialogStyles, PricingIframeDialogConfig };