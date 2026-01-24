/**
 * Configuration for toolbar view options
 * Defines which items to exclude and add to the toolbar
 */

/**
 * Toolbar configuration interface
 */
interface ToolbarConfig {
  /**
   * List of toolbar items to exclude from the view
   * Format: "section/item_name"
   */
  excludeItems: string[];
  
  /**
   * List of additional toolbar items to include
   */
  addItems: string[];
  
  /**
   * Indicates if the configuration is in the default environment
   */
  isInDefaultEnv: boolean;
}

/**
 * Default toolbar configuration
 * Excludes 3D precision location mode, no-wall mode, roof toggle, molding, and top ceiling options
 */
declare const config: ToolbarConfig;

export default config;