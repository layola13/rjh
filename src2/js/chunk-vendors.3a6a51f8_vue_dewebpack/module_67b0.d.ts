/**
 * Vue plugin for dynamic script loading and unloading
 * Provides $loadScript and $unloadScript methods to Vue instances
 */

/**
 * Script element with data-loaded attribute
 */
interface LoadedScriptElement extends HTMLScriptElement {
  /** Indicates whether the script has been successfully loaded */
  'data-loaded'?: string;
}

/**
 * Vue instance with script loading methods
 */
interface VueWithScriptLoader {
  /**
   * Dynamically load an external script
   * @param src - The URL of the script to load
   * @returns Promise that resolves when script is loaded
   */
  $loadScript(src: string): Promise<HTMLScriptElement>;
  
  /**
   * Unload a previously loaded script
   * @param src - The URL of the script to unload
   * @returns Promise that resolves when script is removed
   */
  $unloadScript(src: string): Promise<void>;
}

/**
 * Vue constructor with static script loading methods
 */
interface VueConstructor {
  /**
   * Dynamically load an external script (static method)
   * @param src - The URL of the script to load
   * @returns Promise that resolves when script is loaded
   */
  loadScript(src: string): Promise<HTMLScriptElement>;
  
  /**
   * Unload a previously loaded script (static method)
   * @param src - The URL of the script to unload
   * @returns Promise that resolves when script is removed
   */
  unloadScript(src: string): Promise<void>;
}

/**
 * Vue plugin options
 */
interface VuePluginOptions {
  /**
   * Install the plugin into Vue
   * @param Vue - The Vue constructor
   */
  install(Vue: VueConstructor & { prototype: VueWithScriptLoader }): void;
}

/**
 * Script loader Vue plugin
 * Adds script loading/unloading capabilities to Vue instances
 */
declare const ScriptLoaderPlugin: VuePluginOptions;

export default ScriptLoaderPlugin;

declare module 'vue/types/vue' {
  interface Vue extends VueWithScriptLoader {}
  interface VueConstructor extends VueConstructor {}
}