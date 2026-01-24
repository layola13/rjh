/**
 * Molding request type definitions
 * Contains all available molding-related request types for the HSW (Home Style Workshop) system
 */

/**
 * Enumeration of all molding request types
 * Maps action names to their corresponding fully qualified request class names
 */
declare const MoldingRequestTypes: {
  /** Add molding to a wall */
  readonly AddWallMolding: "hsw.transaction.molding.AddWallMoldingRequest";
  
  /** Change the type of an existing molding */
  readonly ChangeMoldingType: "hsw.transaction.molding.ChangeMoldingTypeRequest";
  
  /** Change the texture applied to a molding */
  readonly ChangeMoldingTexture: "hsw.transaction.molding.ChangeMoldingTextureRequest";
  
  /** Rotate the texture of a molding */
  readonly RotateMoldingTexture: "hsw.transaction.molding.RotateMoldingTextureRequest";
  
  /** Change the size dimensions of a molding */
  readonly ChangeMoldingSize: "hsw.transaction.molding.ChangeMoldingSizeRequest";
  
  /** Set molding as an obstacle */
  readonly SetObstacleMolding: "hsw.transaction.molding.SetObstacleMoldingRequest";
  
  /** Change the offset position of a molding */
  readonly ChangeMoldingOffset: "hsw.transaction.molding.ChangeMoldingOffsetRequest";
  
  /** Toggle or change molding autofit behavior */
  readonly ChangeMoldingAutofit: "hsw.transaction.molding.ChangeMoldingAutofitRequest";
  
  /** Delete a mitered molding joint */
  readonly DeleteMitreMolding: "hsw.transaction.molding.DeleteMitreMoldingRequest";
  
  /** Cut a molding at a specified point */
  readonly CutMolding: "hsw.transaction.molding.CutMoldingRequest";
  
  /** Connect two molding segments */
  readonly ConnectMolding: "hsw.transaction.molding.ConnectMoldingRequest";
  
  /** Add molding to a wall face */
  readonly AddWallFaceMolding: "hsw.cmd.face.AddFaceMoldingRequest";
  
  /** Delete molding from a wall face */
  readonly DeleteWallFaceMolding: "hsw.cmd.face.DeleteFaceMoldingRequest";
  
  /** Change texture of face molding */
  readonly ChangeFaceMoldingTexture: "hsw.cmd.face.ChangeFaceMoldingTextureRequest";
  
  /** Change the type of wall molding */
  readonly ChangeWallMoldingType: "hsw.cmd.face.ChangeMoldingTypeRequest";
  
  /** Apply molding settings to all wall faces */
  readonly ApplyToAllWallFaceMolding: "hsw.cmd.face.ApplyToAllWallFaceMoldingRequest";
  
  /** Apply molding settings to all wall faces in a room */
  readonly ApplyToAllRoomWallFaceMolding: "hsw.cmd.face.ApplyToAllRoomWallFaceMoldingRequest";
  
  /** Add a pocket to an opening */
  readonly AddOpeningPocket: "hsw.plugin.openingpocket.AddOpeningPocketRequest";
  
  /** Change which side a pocket is on */
  readonly ChangePocketSide: "hsw.plugin.openingpocket.ChangePocketSideRequest";
  
  /** Change the geometry of a pocket */
  readonly ChangePocketGeometry: "hsw.plugin.openingpocket.ChangePocketGeometryRequest";
  
  /** Change the material of a pocket */
  readonly ChangePocketMaterial: "hsw.plugin.openingpocket.ChangePocketMaterialRequest";
  
  /** Apply molding using brush tool */
  readonly MoldingBrush: "hsw.plugin.moldingbrush.MoldingBrushRequest";
  
  /** Add a mitered molding joint */
  readonly AddMiterMolding: "hsw.transaction.molding.AddMitreMoldingRequest";
};

/**
 * Type alias for any valid molding request type string
 */
export type MoldingRequestType = typeof MoldingRequestTypes[keyof typeof MoldingRequestTypes];

/**
 * Type alias for molding request action names
 */
export type MoldingRequestAction = keyof typeof MoldingRequestTypes;

export default MoldingRequestTypes;