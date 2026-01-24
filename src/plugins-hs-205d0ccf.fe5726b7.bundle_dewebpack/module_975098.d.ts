/**
 * View options toolbar configuration interface
 * Defines which toolbar items should be excluded or added to the view options menu
 */
export interface ViewOptionsToolbarConfig {
  /**
   * Array of toolbar item identifiers to be excluded from the view options menu
   * Format: "toolbar_viewOptions/{itemIdentifier}"
   */
  excludeItems: string[];

  /**
   * Array of custom toolbar items to be added to the view options menu
   */
  addItems: string[];

  /**
   * Indicates whether the configuration is running in the default environment
   * @default true
   */
  isInDefaultEnv: boolean;
}

/**
 * Default configuration for view options toolbar
 * Excludes standard 2D/3D view controls and visual aids from the toolbar
 */
declare const viewOptionsConfig: ViewOptionsToolbarConfig;

export default viewOptionsConfig;