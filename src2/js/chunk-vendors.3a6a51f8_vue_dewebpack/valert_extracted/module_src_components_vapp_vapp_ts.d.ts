/**
 * VApp Component Type Definitions
 * 
 * The root application component that wraps all Vuetify components.
 * Provides theme context and handles RTL/LTR directionality.
 * 
 * @module VApp
 */

import Vue, { VNode, CreateElement } from 'vue';
import { VuetifyTheme } from 'vuetify/types/services/theme';

/**
 * Props interface for VApp component
 */
interface VAppProps {
  /**
   * Applies the dark theme variant
   * @default undefined (uses Vuetify global theme setting)
   */
  dark?: boolean;

  /**
   * The id attribute of the root application element
   * @default "app"
   */
  id?: string;

  /**
   * Applies the light theme variant
   * @default undefined (uses Vuetify global theme setting)
   */
  light?: boolean;
}

/**
 * Computed properties for VApp component
 */
interface VAppComputed {
  /**
   * Determines if dark theme is currently active
   * Reads from Vuetify's global theme configuration
   */
  isDark: boolean;

  /**
   * Theme classes applied to the component
   * Inherited from Themeable mixin
   */
  themeClasses: Record<string, boolean>;
}

/**
 * VApp Component Instance
 * 
 * The main application wrapper component that must wrap all Vuetify components.
 * Handles theme management, RTL/LTR support, and application-level styling.
 */
interface VApp extends Vue {
  /** Component props */
  readonly dark?: boolean;
  readonly id: string;
  readonly light?: boolean;

  /** Computed properties */
  readonly isDark: boolean;
  readonly themeClasses: Record<string, boolean>;

  /**
   * Lifecycle hook: Validates Vuetify initialization before component creation
   * @throws {Error} When Vuetify is not properly initialized
   */
  beforeCreate(): void;

  /**
   * Render function that generates the application wrapper structure
   * 
   * Creates a two-level structure:
   * - Outer div.v-application with theme and direction classes
   * - Inner div.v-application--wrap containing slot content
   * 
   * @param createElement - Vue's createElement function (h)
   * @returns Virtual DOM node
   */
  render(createElement: CreateElement): VNode;
}

/**
 * VApp Component Constructor
 */
declare const VApp: {
  new (): VApp;
};

export default VApp;

/**
 * VApp Component Options (for Vue.extend)
 */
export interface VAppOptions {
  /** Component name */
  name: 'v-app';

  /** Component props definition */
  props: {
    dark: {
      type: BooleanConstructor;
      default: undefined;
    };
    id: {
      type: StringConstructor;
      default: string;
    };
    light: {
      type: BooleanConstructor;
      default: undefined;
    };
  };

  /** Computed properties */
  computed: {
    isDark(this: VApp): boolean;
  };

  /** Lifecycle hooks */
  beforeCreate(this: VApp): void;

  /** Render function */
  render(this: VApp, createElement: CreateElement): VNode;
}