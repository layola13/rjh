/**
 * Window plugin request event types for the HSW (Home Style Workshop) system.
 * These constants represent event names used for window-related operations.
 * @module WindowRequestTypes
 */

/**
 * Enumeration of window-related request event types.
 * All event names follow the pattern: hsw.plugin.window.request.*
 */
export interface WindowRequestTypes {
  /**
   * Event type for toggling the window sill visibility or state.
   * @example "hsw.plugin.window.request.ToggleWindowSill"
   */
  readonly ToggleWindowSill: "hsw.plugin.window.request.ToggleWindowSill";

  /**
   * Event type for changing the material applied to the window sill.
   * @example "hsw.plugin.window.request.ChangeWindowSillMaterial"
   */
  readonly ChangeWindowSillMaterial: "hsw.plugin.window.request.ChangeWindowSillMaterial";

  /**
   * Event type for changing the rotation angle of the window sill material texture.
   * @example "hsw.plugin.window.request.ChangeWindowSillMaterialRotation"
   */
  readonly ChangeWindowSillMaterialRotation: "hsw.plugin.window.request.ChangeWindowSillMaterialRotation";

  /**
   * Event type for changing the indentation/offset of the window.
   * @example "hsw.plugin.window.request.ChangeWindowIndent"
   */
  readonly ChangeWindowIndent: "hsw.plugin.window.request.ChangeWindowIndent";

  /**
   * Event type for modifying parameters of parametric window models.
   * @example "hsw.plugin.window.request.ChangeParametricModelParametersRequest"
   */
  readonly ChangeParametricModelParameters: "hsw.plugin.window.request.ChangeParametricModelParametersRequest";
}

/**
 * Frozen object containing all window request event type constants.
 * This object is immutable and serves as a single source of truth for event names.
 */
declare const WindowRequestTypes: Readonly<WindowRequestTypes>;

export default WindowRequestTypes;