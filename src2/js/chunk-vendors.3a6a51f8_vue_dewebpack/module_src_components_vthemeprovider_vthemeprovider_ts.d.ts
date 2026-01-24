/**
 * VThemeProvider Component
 * 
 * A component that provides theme context to its children.
 * Extends the Themeable mixin to inherit theme-related functionality.
 */

import Vue, { VNode } from 'vue';
import Themeable from '../../mixins/themeable';

/**
 * Props for VThemeProvider component
 */
interface VThemeProviderProps {
  /**
   * Whether this is the root theme provider.
   * When true, uses rootIsDark instead of inherited dark state.
   */
  root: boolean;
}

/**
 * VThemeProvider component definition
 * 
 * Provides theme configuration to descendant components.
 * Can act as a root provider or inherit from parent theme context.
 */
declare const VThemeProvider: Vue.ExtendedVue<
  Themeable,
  {},
  {},
  {
    /**
     * Computed property that determines if the current theme is dark.
     * 
     * @returns {boolean} True if dark theme is active
     * 
     * When `root` prop is true, returns `rootIsDark` value.
     * Otherwise, delegates to the Themeable mixin's isDark computation.
     */
    isDark(): boolean;
  },
  VThemeProviderProps
> & {
  /**
   * Render function that returns the first non-comment, non-whitespace slot content.
   * 
   * @returns {VNode | undefined} The first valid default slot VNode, or undefined if none exists
   */
  render(): VNode | undefined;
};

export default VThemeProvider;