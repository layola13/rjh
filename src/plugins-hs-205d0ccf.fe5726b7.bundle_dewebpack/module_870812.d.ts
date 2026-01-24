/**
 * Configuration interface for toolbar view options
 * Defines which items should be excluded or added to the toolbar
 */
interface ToolbarViewOptionsConfig {
  /**
   * List of toolbar item identifiers to be excluded from the view
   * Format: "category/itemName"
   * 
   * @example
   * - "toolbar_viewOptions/toolBar_toggle3DPrecisionLocationMode" - 3D precision location mode toggle
   * - "toolbar_viewOptions/toolbar_toggleNoWallMode" - No wall mode toggle
   * - "toolbar_viewOptions/toolbar_toggleRoof" - Roof visibility toggle
   * - "toolbar_viewOptions/toolbar_toggleTopCeiling" - Top ceiling visibility toggle
   * - "toolbar_viewOptions/toolbar_molding" - Molding display option
   */
  excludeItems: string[];

  /**
   * List of additional toolbar item identifiers to be added to the view
   * Currently empty by default
   */
  addItems: string[];

  /**
   * Flag indicating whether the configuration is in the default environment
   * @default true
   */
  isInDefaultEnv: boolean;
}

/**
 * Default toolbar view options configuration
 * Excludes specific 3D view mode toggles and display options
 */
declare const toolbarViewOptionsConfig: ToolbarViewOptionsConfig;

export default toolbarViewOptionsConfig;