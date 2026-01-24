/**
 * VThemeProvider component type definitions
 * Provides theme context to child components
 */

import Vue from 'vue';
import { VNode } from 'vue/types/vnode';

/**
 * Props for VThemeProvider component
 */
export interface VThemeProviderProps {
  /**
   * Determines if this provider is the root theme provider
   * When true, uses rootIsDark instead of inherited dark mode
   */
  root?: boolean;

  /**
   * Inherited from Themeable mixin
   * Explicitly sets dark mode state
   */
  dark?: boolean;

  /**
   * Inherited from Themeable mixin
   * Explicitly sets light mode state
   */
  light?: boolean;
}

/**
 * Computed properties for VThemeProvider
 */
export interface VThemeProviderComputed {
  /**
   * Determines if dark theme is active
   * Uses rootIsDark when root prop is true, otherwise inherits from parent
   */
  isDark: boolean;

  /**
   * Inherited from Themeable mixin
   * Determines root dark mode state
   */
  rootIsDark: boolean;
}

/**
 * VThemeProvider component instance
 */
export interface VThemeProvider extends Vue {
  readonly $props: VThemeProviderProps;

  /**
   * Determines if dark theme is active
   */
  isDark: boolean;

  /**
   * Renders the first non-comment, non-whitespace child slot
   * @returns The default slot content
   */
  render(): VNode | undefined;
}

/**
 * VThemeProvider component definition
 * Provides theme inheritance for child components
 */
declare const VThemeProvider: {
  new (): VThemeProvider;
};

export default VThemeProvider;