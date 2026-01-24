/**
 * Manual lighting plugin command type definitions
 * Defines all available request types for the manual lighting system
 */

/**
 * Enumeration of all manual lighting command request types
 * Each property maps to a fully qualified command class name in the HSW plugin system
 */
export interface ManualLightingCommands {
  /** Command to add a new manual light to the scene */
  readonly AddManualLightRequest: "hsw.plugin.manuallighting.CmdAddManualLightRequest";
  
  /** Command to resize a side light */
  readonly ResizeSideLightRequest: "hsw.plugin.manuallighting.ResizeSideLightRequest";
  
  /** Command to change properties of a single light */
  readonly ChangeLightPropertyRequest: "hsw.plugin.manuallighting.CmdChangeLightPropertyRequest";
  
  /** Command to change properties of a light group */
  readonly ChangeLightGroupPropertyRequest: "hsw.plugin.manuallighting.CmdChangeLightGroupPropertyRequest";
  
  /** Command to create a new light template */
  readonly CreateLightTemplateRequest: "hsw.plugin.manuallighting.CreateLightTemplateRequest";
  
  /** Command to remove an existing light template */
  readonly RemoveLightTemplateRequest: "hsw.plugin.manuallighting.RemoveLightTemplateRequest";
  
  /** Command to hide selected lights from view */
  readonly HideSelectedLightsRequest: "hsw.plugin.manuallighting.HideSelectedLightsRequest";
  
  /** Command to show previously hidden selected lights */
  readonly ShowSelectedLightsRequest: "hsw.plugin.manuallighting.ShowSelectedLightsRequest";
  
  /** Command to paste a manual light */
  readonly PasteManualLightRequest: "hsw.plugin.manuallighting.PasteManualLightRequest";
  
  /** Command to paste manual light properties */
  readonly PasteManualLightPropertyRequest: "hsw.plugin.manuallighting.CmdPasteManualLightPropertyRequest";
  
  /** Command to apply light settings */
  readonly ApplyLightRequest: "hsw.plugin.manuallighting.CmdApplyLightRequest";
  
  /** Command to delete a light from the scene */
  readonly DeleteLightRequest: "hsw.plugin.manuallighting.DeleteLightRequest";
  
  /** Command to apply a light template to selected lights */
  readonly ApplyLightTemplateRequest: "hsw.plugin.manuallighting.CmdApplyLightTemplateRequest";
  
  /** Command to revert a light group to previous state */
  readonly RevertLightGroupRequest: "hsw.plugin.manuallighting.CmdRevertLightGroupRequest";
  
  /** Command to save current camera position */
  readonly SaveCameraPositionRequest: "hsw.plugin.manuallighting.SaveCameraPositionRequest";
  
  /** Command to move a light to a new position */
  readonly MoveLightRequest: "hsw.plugin.manuallighting.MoveLightRequest";
  
  /** Command to move a light's target position */
  readonly MoveLightTargetRequest: "hsw.plugin.manuallighting.MoveLightTargetRequest";
  
  /** Command to change default parameters for light target */
  readonly LightTargetDefaultParamChangeRequest: "hsw.plugin.manuallighting.LightTargetDefaultParamChangeRequest";
}

/**
 * Frozen constant object containing all manual lighting command type identifiers
 * @readonly
 */
declare const manualLightingCommands: Readonly<ManualLightingCommands>;

export default manualLightingCommands;