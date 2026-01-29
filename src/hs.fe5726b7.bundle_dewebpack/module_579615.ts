const WallDecorationCommands = {
    AddWallMolding: "hsw.cmd.molding.CmdAddWallMolding",
    ChangeMoldingWidth: "hsw.cmd.molding.CmdChangeMoldingWidth",
    ChangeMoldingHeight: "hsw.cmd.molding.CmdChangeMoldingHeight",
    ChangeMoldingOffset: "hsw.cmd.molding.CmdChangeMoldingOffset",
    ChangeMoldingAutoFit: "hsw.cmd.molding.CmdChangeMoldingAutoFit",
    ChangeMoldingTexture: "hsw.plugin.walldecoration.cmd.CmdChangeMoldingTexture",
    RotateMoldingTexture: "hsw.plugin.walldecoration.cmd.CmdRotateMoldingTexture",
    ChangeMoldingType: "hsw.plugin.walldecoration.cmd.CmdChangeMoldingType",
    ResetWallMolding: "hsw.cmd.molding.CmdResetWallMolding",
    DeleteMitreMolding: "hsw.cmd.molding.CmdDeleteMitreMolding",
    CutMolding: "hsw.cmd.molding.CmdCutMolding",
    ConnectMolding: "hsw.cmd.molding.CmdConnectMolding",
    AddCatalogMolding: "hsw.plugin.walldecoration.cmd.CmdAddCatalogMolding",
    ApplyMoldingToAllFace: "hsw.cmd.face.CmdApplyToAllFace",
    ClearFacesMolding: "hsw.cmd.face.CmdClearFacesMolding",
    ApplyMoldingToAllRoomFace: "hsw.cmd.face.CmdApplyToAllRoomFace",
    ChangeFaceMoldingType: "hsw.cmd.face.CmdChangeFaceMoldingType",
    ChangeFaceMoldingTexture: "hsw.cmd.face.CmdChangeFaceMoldingTexture",
    AddFaceMolding: "hsw.cmd.face.CmdAddFaceMolding",
    DeleteFaceMolding: "hsw.cmd.face.CmdDeleteFaceMolding",
    AddMitreMolding: "hsw.plugin.walldecoration.cmd.CmdAddMitreMolding",
    AddOpeningPocket: "hsw.plugin.openingpocket.CmdAddOpeningPocket",
    ChangePocketSide: "hsw.plugin.openingpocket.CmdChangePocketSide",
    ChangePocketOuterWidth: "hsw.plugin.openingpocket.CmdChangePocketOuterWidth",
    ChangePocketOuterHeight: "hsw.plugin.openingpocket.CmdChangePocketOuterHeight",
    EditPocketGeometry: "hsw.plugin.openingpocket.CmdEditPocketGeometry",
    EditPocketMaterial: "hsw.plugin.openingpocket.CmdEditPocketMaterial"
} as const;

Object.freeze(WallDecorationCommands);

export type WallDecorationCommandType = typeof WallDecorationCommands[keyof typeof WallDecorationCommands];

export default WallDecorationCommands;