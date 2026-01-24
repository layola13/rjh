/**
 * Plugin registration system for UI modules
 * 
 * This module provides functionality to dynamically add plugins to UI component prototypes.
 * Plugins are organized by component type and stored in an array for each plugin name.
 */

/**
 * Global UI namespace containing all registered UI components
 */
declare namespace UI {
  /**
   * Base interface for UI component prototype with plugin support
   */
  interface ComponentPrototype {
    /**
     * Plugin registry mapping plugin names to their registered handlers
     * Each plugin can have multiple implementations stored as [id, handler] tuples
     */
    plugins: Record<string, Array<[string, unknown]>>;
  }

  /**
   * UI component registry indexed by component type identifier
   */
  const ui: Record<string, { prototype: ComponentPrototype }>;
}

/**
 * Registers a plugin for a specific UI component type
 * 
 * @param componentType - The identifier of the UI component type (e.g., "dialog", "menu")
 * @param pluginId - Unique identifier for the plugin instance
 * @param pluginHandlers - Object mapping plugin names to their handler implementations
 * 
 * @example
 *