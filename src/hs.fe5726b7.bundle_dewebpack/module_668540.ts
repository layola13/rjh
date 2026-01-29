const ManualLightingCommands = {
    AddManualLightRequest: "hsw.plugin.manuallighting.CmdAddManualLightRequest",
    ResizeSideLightRequest: "hsw.plugin.manuallighting.ResizeSideLightRequest",
    ChangeLightPropertyRequest: "hsw.plugin.manuallighting.CmdChangeLightPropertyRequest",
    ChangeLightGroupPropertyRequest: "hsw.plugin.manuallighting.CmdChangeLightGroupPropertyRequest",
    CreateLightTemplateRequest: "hsw.plugin.manuallighting.CreateLightTemplateRequest",
    RemoveLightTemplateRequest: "hsw.plugin.manuallighting.RemoveLightTemplateRequest",
    HideSelectedLightsRequest: "hsw.plugin.manuallighting.HideSelectedLightsRequest",
    ShowSelectedLightsRequest: "hsw.plugin.manuallighting.ShowSelectedLightsRequest",
    PasteManualLightRequest: "hsw.plugin.manuallighting.PasteManualLightRequest",
    PasteManualLightPropertyRequest: "hsw.plugin.manuallighting.CmdPasteManualLightPropertyRequest",
    ApplyLightRequest: "hsw.plugin.manuallighting.CmdApplyLightRequest",
    DeleteLightRequest: "hsw.plugin.manuallighting.DeleteLightRequest",
    ApplyLightTemplateRequest: "hsw.plugin.manuallighting.CmdApplyLightTemplateRequest",
    RevertLightGroupRequest: "hsw.plugin.manuallighting.CmdRevertLightGroupRequest",
    SaveCameraPositionRequest: "hsw.plugin.manuallighting.SaveCameraPositionRequest",
    MoveLightRequest: "hsw.plugin.manuallighting.MoveLightRequest",
    MoveLightTargetRequest: "hsw.plugin.manuallighting.MoveLightTargetRequest",
    LightTargetDefaultParamChangeRequest: "hsw.plugin.manuallighting.LightTargetDefaultParamChangeRequest"
} as const;

export type ManualLightingCommandType = typeof ManualLightingCommands[keyof typeof ManualLightingCommands];

export default ManualLightingCommands;