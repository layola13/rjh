/**
 * Encryption Plugin for HSApp
 * Provides encryption-related function supports
 */

/**
 * Plugin metadata interface
 */
interface PluginMetadata {
  /** Plugin display name */
  name: string;
  /** Plugin description */
  description: string;
  /** List of plugin dependencies */
  dependencies: string[];
}

/**
 * Plugin activation context
 */
interface ActivationContext {
  /** Application instance */
  app?: unknown;
  /** Plugin configuration */
  config?: Record<string, unknown>;
}

/**
 * CryptoJS utility interface
 */
interface CryptoJSUtil {
  /**
   * Generates a document encryption key
   * @param seed - Seed value for key generation
   * @returns Generated encryption key
   */
  generateDocKey(seed: string): string;
}

/**
 * HSCore utility namespace
 */
declare namespace HSCore {
  namespace Util {
    const CryptoJS: CryptoJSUtil;
  }
}

/**
 * Encryption library instance
 */
interface EncryptionLib {
  /**
   * Generates an encryption key
   * @param seed - Seed value for key generation
   * @returns Generated key string
   */
  generateKey(seed: string): string;
}

/**
 * Base plugin interface for HSApp
 */
declare abstract class IPlugin {
  constructor(metadata: PluginMetadata);
  
  /**
   * Called when plugin is activated
   * @param context - Activation context
   * @param options - Additional options
   */
  abstract onActive(context: ActivationContext, options?: unknown): void;
  
  /**
   * Called when plugin is deactivated
   */
  abstract onDeactive(): void;
}

/**
 * Encryption Plugin class
 * Extends the base IPlugin to provide encryption functionality
 */
declare class EncryptionPlugin extends IPlugin {
  /**
   * Creates an instance of EncryptionPlugin
   */
  constructor();
  
  /**
   * Activates the encryption plugin
   * @param context - Activation context with app and config
   * @param options - Additional activation options
   */
  onActive(context: ActivationContext, options?: unknown): void;
  
  /**
   * Deactivates the encryption plugin
   */
  onDeactive(): void;
}

/**
 * HSApp Plugin namespace
 */
declare namespace HSApp.Plugin {
  const IPlugin: typeof IPlugin;
  
  /**
   * Registers a plugin with the HSApp system
   * @param pluginId - Unique plugin identifier
   * @param pluginClass - Plugin class constructor
   * @param preLoader - Async function to preload dependencies
   */
  function registerPlugin(
    pluginId: string,
    pluginClass: new () => IPlugin,
    preLoader: () => Promise<void>
  ): void;
}

/**
 * Preloader function type for lazy loading encryption library
 */
type PreLoaderCallback = (onComplete: () => void) => Promise<void>;

/**
 * Plugin registration
 * Registers the encryption plugin with ID "hsw.plugin.encryption.Plugin"
 */
export {};

declare module 'hsw.plugin.encryption' {
  export default EncryptionPlugin;
}