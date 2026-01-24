/**
 * Module entry point for the UI framework
 * Provides default export with auto-installation for Vue
 */

import components from './components/index';
import directives from './directives/index';
import Framework from './framework';

/**
 * Configuration options for framework installation
 */
export interface InstallOptions {
  /** Component registry to be installed */
  components?: Record<string, any>;
  /** Directive registry to be installed */
  directives?: Record<string, any>;
  /** Additional custom options */
  [key: string]: any;
}

/**
 * Vue plugin installation function
 * @param app - Vue application instance
 * @param options - Installation configuration options
 */
export type InstallFunction = (app: any, options?: InstallOptions) => void;

/**
 * Framework instance with enhanced install method
 */
export interface FrameworkWithInstall extends typeof Framework {
  /** Vue plugin install method */
  install: InstallFunction;
}

declare const _default: FrameworkWithInstall;

export default _default;

/**
 * Auto-install when used via script tag in browser
 * Automatically registers with global Vue if available
 */
declare global {
  interface Window {
    Vue?: any;
  }
}