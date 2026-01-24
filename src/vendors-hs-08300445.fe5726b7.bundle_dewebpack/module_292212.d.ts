/**
 * Utility functions for react-i18next library
 * Provides helpers for component naming, namespace loading, and warning utilities
 */

/**
 * Cache for tracking which warnings have been shown
 * Key: warning message, Value: timestamp when first shown
 */
interface WarnOnceCache {
  [message: string]: Date;
}

/**
 * Options for namespace loading and checking
 */
interface NamespaceOptions {
  /**
   * Events to bind for i18n instance updates
   * e.g., "languageChanging", "loaded"
   */
  bindI18n?: string;
  
  /**
   * Events to bind for i18n store updates
   */
  bindI18nStore?: string;
}

/**
 * i18next instance interface (minimal required shape)
 */
interface I18nextInstance {
  /**
   * Available languages
   */
  languages?: string[];
  
  /**
   * i18next configuration options
   */
  options: {
    /**
     * Fallback language(s)
     */
    fallbackLng?: string | string[];
    
    /**
     * Whether to ignore JSON structure validation
     */
    ignoreJSONStructure?: boolean;
    
    /**
     * Preloaded resources
     */
    resources?: Record<string, unknown>;
    
    /**
     * Whether languages are partially bundled
     */
    partialBundledLanguages?: boolean;
  };
  
  /**
   * Backend connector service
   */
  services: {
    backendConnector: {
      /**
       * Backend implementation
       */
      backend?: unknown;
      
      /**
       * State map for namespace loading
       * Key format: "{language}|{namespace}"
       * Values: -1 (error), 0 (loading), 1 (loaded), 2 (pending)
       */
      state: Record<string, number>;
    };
  };
  
  /**
   * Language currently changing to (if in transition)
   */
  isLanguageChangingTo?: string;
  
  /**
   * Whether i18next is initialized
   */
  isInitialized: boolean;
  
  /**
   * Check if resource bundle exists for language and namespace
   */
  hasResourceBundle(language: string, namespace: string): boolean;
  
  /**
   * Check if namespace is loaded with custom precheck
   */
  hasLoadedNamespace(
    namespace: string,
    options: {
      precheck?: (
        instance: I18nextInstance,
        isLoaded: (language: string, namespace: string) => boolean
      ) => boolean | void;
    }
  ): boolean;
  
  /**
   * Load namespaces asynchronously
   */
  loadNamespaces(namespaces: string | string[], callback: () => void): void;
  
  /**
   * Register event listener
   */
  on(event: string, callback: () => void): void;
  
  /**
   * Unregister event listener
   */
  off(event: string, callback: () => void): void;
}

/**
 * Component type that may have a display name
 */
type ComponentType = {
  displayName?: string;
  name?: string;
} | string;

/**
 * Get the display name of a React component
 * @param component - React component or string identifier
 * @returns Human-readable component name
 */
export function getDisplayName(component: ComponentType): string;

/**
 * Check if a namespace has been loaded for the current language
 * @param namespace - Namespace to check
 * @param i18nextInstance - i18next instance
 * @param options - Additional options for checking
 * @returns true if namespace is loaded, false otherwise
 */
export function hasLoadedNamespace(
  namespace: string,
  i18nextInstance: I18nextInstance,
  options?: NamespaceOptions
): boolean;

/**
 * Load namespaces and execute callback when complete
 * Handles both initialized and uninitialized i18next instances
 * @param i18nextInstance - i18next instance
 * @param namespaces - Namespace(s) to load
 * @param callback - Function to call after namespaces are loaded
 */
export function loadNamespaces(
  i18nextInstance: I18nextInstance,
  namespaces: string | string[],
  callback: () => void
): void;

/**
 * Log a warning message to console with "react-i18next::" prefix
 * Only logs if console.warn is available
 * @param args - Arguments to pass to console.warn
 */
export function warn(...args: unknown[]): void;

/**
 * Log a warning message only once per unique message
 * Subsequent calls with the same first argument are suppressed
 * @param args - Arguments to pass to console.warn
 */
export function warnOnce(...args: unknown[]): void;