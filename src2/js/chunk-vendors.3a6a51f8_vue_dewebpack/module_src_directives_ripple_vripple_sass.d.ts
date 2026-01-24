/**
 * VRipple directive stylesheet module
 * 
 * This module contains the styles for the Vuetify ripple effect directive.
 * It provides visual feedback when elements are interacted with (clicked/touched).
 * 
 * @module VRippleStyles
 * @see {@link https://vuetifyjs.com/components/ripples/}
 */

/**
 * Side-effect module that injects ripple effect styles into the document.
 * This module has no exports as it only performs style injection.
 * 
 * @remarks
 * This is a CSS/SASS module that gets processed by webpack loaders.
 * The actual styles are injected at runtime and don't expose a JavaScript API.
 */
declare module '@/directives/ripple/VRipple.sass' {
  /**
   * No exports - this module only provides side effects (style injection)
   */
  const styles: void;
  export default styles;
}