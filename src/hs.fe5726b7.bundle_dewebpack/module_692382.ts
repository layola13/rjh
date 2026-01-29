const RequestTypes = {
    UpdateUnderlay: "hsw.transaction.underlay.UpdateUnderlayRequest",
    DeleteUnderlay: "hsw.transaction.underlay.DeleteUnderlayRequest",
    FloorplanMirror: "hsw.plugin.floorplanmirror.NgmMirrorRequest",
    AddCustomizedModelMolding: "hsw.plugin.customizedmodeling.AddCustomizedModelMoldingRequest",
    DeleteCustomizedModelMolding: "hsw.plugin.customizedmodeling.DeleteCustomizedModelMoldingRequest",
    AddCustomizedModelLightSlot: "hsw.plugin.customizedmodeling.AddCustomizedModelLightSlotRequest",
    DeleteCustomizedModelLightSlot: "hsw.plugin.customizedmodeling.DeleteCustomizedModelLightSlotRequest",
    DeleteCustomizedModelLightBand: "hsw.plugin.customizedmodeling.DeleteCustomizedModelLightBandRequest",
    EditCustomizedModelLightSlot: "hsw.plugin.customizedmodeling.EditCustomizedModelLightSlotRequest",
    AddCustomizedModelLightBand: "hsw.plugin.customizedmodeling.AddCustomizedModelLightBandRequest",
    EditCustomizedModelLightBand: "hsw.plugin.customizedmodeling.EditCustomizedModelLightBandRequest",
    EditNCustomizedModelLightBand: "hsw.plugin.customizedmodeling.EditNCustomizedModelLightBandRequest",
    EditNCustomizedModelLightSlot: "hsw.plugin.customizedmodeling.EditNCustomizedModelLightSlotRequest",
    ToggleSelfHostLightBand: "hsw.plugin.customizedmodeling.CmdToggleSelfHostLightBandRequest",
    DeleteCustomizedPMInstanceModel: "hsw.plugin.customizedpm.DeleteCustomizedPMInstanceRequest",
    MoveCustomizedPMInstanceModel: "hsw.plugin.customizedpm.MoveCustomizedPMInstanceRequest",
    RotateCustomizedPMInstanceModel: "hsw.plugin.customizedpm.RotateCustomizedPMInstanceRequest",
    CopyCustomizedPMInstanceModel: "hsw.plugin.customizedpm.CopyCustomizedPMInstanceRequest",
    ImportCustomizedPMInstanceModel: "hsw.plugin.customizedpm.ImportCustomizedPMInstanceRequest",
    EditCustomizedPMModel: "hsw.plugin.customizedpm.EditCustomizedPMRequest",
    TransformCustomizedPMModel: "hsw.plugin.customizedpm.TransformCustomizedPMRequest",
    EditCustomizedPMModelType: "hsw.plugin.customizedpm.EditCustomizedPMTypeRequest",
    CreateCustomizedPMModel: "hsw.plugin.customizedpm.CreateCustomizedPMRequest",
    CreateWallFaceAssembly: "hsw.plugin.wallfaceassembly.CreateWallFaceAssemblyRequest",
    RemoveWallFaceAssembly: "hsw.plugin.wallfaceassembly.RemoveWallFaceAssemblyRequest",
    MoveWFAOpening: "hsw.plugin.wallfaceassembly.MoveWFAOpeningRequest",
    UpdateDoorWindowInWFA: "hsw.plugin.wallfaceassembly.UpdateDoorWindowInWFARequest",
    CreateNCPBgWallsInWFA: "hsw.plugin.wallfaceassembly.CreateNCPBgWallsInWFARequest",
    EditParametricOpening: "hsw.plugin.parametricopening.EditParametricOpening",
    AddParametricOpening: "hsw.plugin.parametricopening.AddParametricOpeningRequest",
    ProxyMaterialBrushRequest: "hsw.plugin.materialbrush.ProxyMaterialBrushRequest",
    CreateAuxiliaryLine: "hsw.plugin.auxiliaryline.CreateAuxiliaryLineRequest",
    RemoveAuxiliaryLines: "hsw.plugin.auxiliaryline.RemoveAuxiliaryLinesRequest"
} as const;

export type RequestType = typeof RequestTypes[keyof typeof RequestTypes];

export default RequestTypes;