/**
 * Vuetify installation plugin for Vue.js
 * Provides global registration of components, directives, and framework initialization
 */

import { VueConstructor } from 'vue';

/**
 * Vuetify plugin installation options
 */
export interface VuetifyInstallOptions {
  /**
   * Map of component names to component definitions
   * Components will be registered globally on the Vue instance
   */
  components?: Record<string, VuetifyComponent>;

  /**
   * Map of directive names to directive definitions
   * Directives will be registered globally on the Vue instance
   */
  directives?: Record<string, VuetifyDirective>;

  /**
   * Vuetify framework instance configuration
   */
  vuetify?: VuetifyInstance;
}

/**
 * Vuetify component definition with optional sub-components
 */
interface VuetifyComponent {
  /**
   * Nested sub-components that should also be registered
   */
  $_vuetify_subcomponents?: Record<string, VuetifyComponent>;
  
  [key: string]: any;
}

/**
 * Vue directive definition
 */
interface VuetifyDirective {
  bind?: Function;
  inserted?: Function;
  update?: Function;
  componentUpdated?: Function;
  unbind?: Function;
}

/**
 * Vuetify framework instance
 */
interface VuetifyInstance {
  /**
   * Initialize the Vuetify framework
   */
  init(vm: any, ssrContext?: any): void;
  
  /**
   * Observable framework object
   */
  framework: VuetifyFramework;
}

/**
 * Vuetify framework observable state
 */
interface VuetifyFramework {
  /**
   * Indicates if the app is currently hydrating from SSR
   */
  isHydrating?: boolean;
  
  /**
   * Breakpoint service for responsive utilities
   */
  breakpoint: {
    update(ssr?: boolean): void;
  };
}

/**
 * Extended Vue constructor with Vuetify-specific properties
 */
interface VuetifyVue extends VueConstructor {
  /**
   * Flag to track if Vuetify has been installed
   */
  $_vuetify_installed?: boolean;
}

/**
 * Install Vuetify plugin into Vue
 * 
 * @param Vue - Vue constructor to install the plugin into
 * @param options - Installation options including components and directives
 * 
 * @example
 *