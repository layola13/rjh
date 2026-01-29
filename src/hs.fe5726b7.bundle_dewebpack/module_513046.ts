export enum MoldingRequestType {
  AddWallMolding = "hsw.transaction.molding.AddWallMoldingRequest",
  ChangeMoldingType = "hsw.transaction.molding.ChangeMoldingTypeRequest",
  ChangeMoldingTexture = "hsw.transaction.molding.ChangeMoldingTextureRequest",
  RotateMoldingTexture = "hsw.transaction.molding.RotateMoldingTextureRequest",
  ChangeMoldingSize = "hsw.transaction.molding.ChangeMoldingSizeRequest",
  SetObstacleMolding = "hsw.transaction.molding.SetObstacleMoldingRequest",
  ChangeMoldingOffset = "hsw.transaction.molding.ChangeMoldingOffsetRequest",
  ChangeMoldingAutofit = "hsw.transaction.molding.ChangeMoldingAutofitRequest",
  DeleteMitreMolding = "hsw.transaction.molding.DeleteMitreMoldingRequest",
  CutMolding = "hsw.transaction.molding.CutMoldingRequest",
  ConnectMolding = "hsw.transaction.molding.ConnectMoldingRequest",
  AddWallFaceMolding = "hsw.cmd.face.AddFaceMoldingRequest",
  DeleteWallFaceMolding = "hsw.cmd.face.DeleteFaceMoldingRequest",
  ChangeFaceMoldingTexture = "hsw.cmd.face.ChangeFaceMoldingTextureRequest",
  ChangeWallMoldingType = "hsw.cmd.face.ChangeMoldingTypeRequest",
  ApplyToAllWallFaceMolding = "hsw.cmd.face.ApplyToAllWallFaceMoldingRequest",
  ApplyToAllRoomWallFaceMolding = "hsw.cmd.face.ApplyToAllRoomWallFaceMoldingRequest",
  AddOpeningPocket = "hsw.plugin.openingpocket.AddOpeningPocketRequest",
  ChangePocketSide = "hsw.plugin.openingpocket.ChangePocketSideRequest",
  ChangePocketGeometry = "hsw.plugin.openingpocket.ChangePocketGeometryRequest",
  ChangePocketMaterial = "hsw.plugin.openingpocket.ChangePocketMaterialRequest",
  MoldingBrush = "hsw.plugin.moldingbrush.MoldingBrushRequest",
  AddMiterMolding = "hsw.transaction.molding.AddMitreMoldingRequest"
}

export default MoldingRequestType;