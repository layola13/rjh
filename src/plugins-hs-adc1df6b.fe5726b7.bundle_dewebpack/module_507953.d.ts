/**
 * CSS module loader function for property bar button styles
 * Module ID: 507953
 * 
 * This module exports CSS styles for the property bar button component,
 * including default button styles, VIP icons, free trial badges, and hover states.
 */

/**
 * Webpack module loader function signature
 * 
 * @param e - Module exports object that will contain the compiled CSS
 * @param t - Module dependencies/requires (unused in this CSS module)
 * @param n - Webpack require function used to load the CSS loader utility
 * 
 * @remarks
 * This is a CSS module that uses css-loader (module 986380) to process
 * the stylesheet and push it to the exports array with sourcemap disabled.
 * 
 * Key CSS classes defined:
 * - `.property-bar-button` - Main button container with centered text and margin
 * - `.property-bar-button .homestyler-ui-components.ant-btn` - Full-width Ant Design button override
 * - `.property-bar-button.btn-enter-env` - Enter environment button variant with custom icon sizing
 * - `.property-bar-button.show-vip-icon` - VIP icon display variant with increased top margin
 * - `.property-bar-button .freeTrialItem` - Free trial badge with custom background image
 * - `.property-bar-button .vipIcon` - VIP icon badge positioned absolutely
 * - `.propertybar-container .property-bar-button .ant-btn-*` - Various button state styles (focus, hover, disabled)
 */
declare function loadPropertyBarButtonStyles(
  e: { id: string; exports: any },
  t: Record<string, any>,
  n: (moduleId: number) => (sourceMap: boolean) => { push: (entry: [string, string]) => void }
): void;

export = loadPropertyBarButtonStyles;