/**
 * Toolbar configuration for view options
 * Defines which toolbar items should be excluded or added, and environment settings
 */
export interface ToolbarConfig {
  /**
   * Array of toolbar item identifiers to exclude from the view options menu
   * Format: "menuPath/itemIdentifier"
   */
  excludeItems: string[];

  /**
   * Array of custom toolbar items to add to the view options menu
   * Currently empty by default
   */
  addItems: string[];

  /**
   * Indicates whether the configuration applies to the default environment
   * @default true
   */
  isInDefaultEnv: boolean;
}

/**
 * Default toolbar configuration
 * Excludes standard view options like area toggle, dimension toggle, room type, etc.
 */
declare const toolbarConfig: ToolbarConfig;

export default toolbarConfig;