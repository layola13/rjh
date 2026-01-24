/**
 * Module: Main entry point
 * Original ID: ./src/index.ts
 */

import { Component } from 'vue';
import { DirectiveOptions } from 'vue';

/**
 * Component registry interface
 */
interface ComponentRegistry {
  [key: string]: Component;
}

/**
 * Directive registry interface
 */
interface DirectiveRegistry {
  [key: string]: DirectiveOptions;
}

/**
 * Plugin installation options
 */
interface InstallOptions {
  /** Components to be registered globally */
  components?: ComponentRegistry;
  /** Directives to be registered globally */
  directives?: DirectiveRegistry;
  /** Additional custom options */
  [key: string]: any;
}

/**
 * Vue plugin interface with install method
 */
interface VuePlugin {
  /**
   * Install the plugin into Vue instance
   * @param app - Vue application instance
   * @param options - Installation configuration options
   */
  install(app: any, options?: InstallOptions): void;
}

/**
 * Window interface extension for global Vue
 */
declare global {
  interface Window {
    /** Global Vue constructor */
    Vue?: any;
  }
}

/**
 * Default framework plugin export
 */
declare const _default: VuePlugin;

export default _default;