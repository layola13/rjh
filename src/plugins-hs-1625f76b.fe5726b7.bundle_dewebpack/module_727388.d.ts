/**
 * ClipperLib Plugin Module
 * Provides polygon clipping and geometry manipulation functionality
 */

declare global {
  interface Window {
    ClipperLibWasm: typeof ClipperLibWasm;
    PolygonToolWasm: typeof PolygonToolWasm;
    ClipperLibInstance: ClipperLibInstance | undefined;
    PolygonToolInstance: PolygonToolInstance | undefined;
    PolygontoolLibWrapper: PolygonToolLibWrapper | undefined;
    HSApp: typeof HSApp;
    HSCore: typeof HSCore;
  }
}

/**
 * Native ClipperLib instance format options
 */
export enum NativeClipperLibRequestedFormat {
  WasmWithAsmJsFallback = 'WasmWithAsmJsFallback'
}

/**
 * ClipperLib WebAssembly module interface
 */
export interface ClipperLibWasm {
  /**
   * Loads the native ClipperLib instance asynchronously
   * @param format - Requested format for the library (WASM with asm.js fallback)
   * @returns Promise resolving to the ClipperLib instance
   */
  loadNativeClipperLibInstanceAsync(
    format: NativeClipperLibRequestedFormat
  ): Promise<ClipperLibInstance>;
  
  NativeClipperLibRequestedFormat: typeof NativeClipperLibRequestedFormat;
}

/**
 * Native ClipperLib instance for polygon operations
 */
export interface ClipperLibInstance {
  // ClipperLib instance methods would be defined here based on the library API
  [key: string]: unknown;
}

/**
 * PolygonTool WebAssembly module interface
 */
export interface PolygonToolWasm {
  /**
   * Loads the native ClipperPlus library instance asynchronously
   * @returns Promise resolving to the PolygonTool wrapper
   */
  loadNativeClipperPlusLibInstanceAsync(): Promise<PolygonToolLibWrapper>;
}

/**
 * Wrapper for the PolygonTool native library
 */
export interface PolygonToolLibWrapper {
  /**
   * Gets the native PolygonTool instance
   * @returns The native instance for polygon operations
   */
  getNativeInstance(): PolygonToolInstance;
}

/**
 * Native PolygonTool instance
 */
export interface PolygonToolInstance {
  // PolygonTool instance methods would be defined here
  [key: string]: unknown;
}

/**
 * Plugin configuration interface
 */
export interface PluginConfig {
  /** Plugin display name */
  name: string;
  /** Plugin description */
  description: string;
  /** Array of plugin dependency names */
  dependencies: string[];
}

/**
 * Application parameters interface
 */
export interface AppParams {
  /** Whether polygon tool is enabled */
  polygontool?: boolean;
  [key: string]: unknown;
}

/**
 * HSApp Application interface
 */
export namespace HSApp {
  export namespace App {
    export interface Application {
      appParams: AppParams;
    }
    
    /**
     * Gets the application instance
     */
    export function getApp(): Application;
  }
  
  export namespace Plugin {
    /**
     * Base plugin interface
     */
    export abstract class IPlugin {
      constructor(config: PluginConfig);
      
      /**
       * Called when plugin is activated
       * @param params - Activation parameters
       */
      abstract onActive(params: unknown[]): void;
      
      /**
       * Called when plugin is deactivated
       */
      abstract onDeactive(): void;
    }
    
    /**
     * Registers a plugin with the application
     * @param id - Unique plugin identifier
     * @param pluginClass - Plugin class constructor
     * @param preloader - Async preloader function for dependencies
     */
    export function registerPlugin(
      id: string,
      pluginClass: new () => IPlugin,
      preloader: () => Promise<unknown>
    ): void;
  }
}

/**
 * HSCore document management interface
 */
export namespace HSCore {
  export namespace Doc {
    export interface DocumentManager {
      /**
       * Registers a PolygonTool instance with the document manager
       * @param instance - PolygonTool library wrapper instance
       */
      registerPTInstance(instance: PolygonToolLibWrapper): void;
    }
    
    /**
     * Gets the document manager instance
     */
    export function getDocManager(): DocumentManager;
  }
}

/**
 * ClipperLib Plugin class
 * Provides ClipperLib and PolygonTool functionality to the application
 */
export declare class ClipperLibPlugin extends HSApp.Plugin.IPlugin {
  constructor();
  
  /**
   * Activates the plugin with given parameters
   * @param params - Activation parameters
   */
  onActive(params: unknown[]): void;
  
  /**
   * Deactivates the plugin
   */
  onDeactive(): void;
}

/**
 * Preloads the ClipperLib WebAssembly module
 * @returns Promise that resolves when ClipperLib is loaded
 */
export declare function preloadClipperLib(): Promise<void>;

/**
 * Preloads the PolygonTool WebAssembly module
 * @returns Promise that resolves when PolygonTool is loaded
 */
export declare function preloadPolygonTool(): Promise<void>;

/**
 * Module initialization - registers the ClipperLib plugin
 */
export {};