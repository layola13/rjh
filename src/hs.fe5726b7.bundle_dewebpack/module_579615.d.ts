/**
 * Wall decoration and molding command constants
 * Defines command identifiers for wall molding operations, face molding operations, and opening pocket operations
 */

/**
 * Command identifiers for wall decoration features
 * All command strings follow the format: "hsw.cmd.<feature>.<CommandName>" or "hsw.plugin.<plugin>.cmd.<CommandName>"
 */
interface WallDecorationCommands {
  /** Command to add wall molding to a wall */
  readonly AddWallMolding: "hsw.cmd.molding.CmdAddWallMolding";
  
  /** Command to change the width of existing molding */
  readonly ChangeMoldingWidth: "hsw.cmd.molding.CmdChangeMoldingWidth";
  
  /** Command to change the height of existing molding */
  readonly ChangeMoldingHeight: "hsw.cmd.molding.CmdChangeMoldingHeight";
  
  /** Command to change the offset position of molding */
  readonly ChangeMoldingOffset: "hsw.cmd.molding.CmdChangeMoldingOffset";
  
  /** Command to toggle auto-fit behavior for molding */
  readonly ChangeMoldingAutoFit: "hsw.cmd.molding.CmdChangeMoldingAutoFit";
  
  /** Command to change the texture applied to molding */
  readonly ChangeMoldingTexture: "hsw.plugin.walldecoration.cmd.CmdChangeMoldingTexture";
  
  /** Command to rotate the texture on molding */
  readonly RotateMoldingTexture: "hsw.plugin.walldecoration.cmd.CmdRotateMoldingTexture";
  
  /** Command to change the type/style of molding */
  readonly ChangeMoldingType: "hsw.plugin.walldecoration.cmd.CmdChangeMoldingType";
  
  /** Command to reset molding to default settings */
  readonly ResetWallMolding: "hsw.cmd.molding.CmdResetWallMolding";
  
  /** Command to delete mitre molding (corner molding) */
  readonly DeleteMitreMolding: "hsw.cmd.molding.CmdDeleteMitreMolding";
  
  /** Command to cut/trim molding */
  readonly CutMolding: "hsw.cmd.molding.CmdCutMolding";
  
  /** Command to connect separate molding pieces */
  readonly ConnectMolding: "hsw.cmd.molding.CmdConnectMolding";
  
  /** Command to add molding from catalog */
  readonly AddCatalogMolding: "hsw.plugin.walldecoration.cmd.CmdAddCatalogMolding";
  
  /** Command to apply molding to all faces */
  readonly ApplyMoldingToAllFace: "hsw.cmd.face.CmdApplyToAllFace";
  
  /** Command to clear molding from selected faces */
  readonly ClearFacesMolding: "hsw.cmd.face.CmdClearFacesMolding";
  
  /** Command to apply molding to all faces in a room */
  readonly ApplyMoldingToAllRoomFace: "hsw.cmd.face.CmdApplyToAllRoomFace";
  
  /** Command to change molding type on a face */
  readonly ChangeFaceMoldingType: "hsw.cmd.face.CmdChangeFaceMoldingType";
  
  /** Command to change molding texture on a face */
  readonly ChangeFaceMoldingTexture: "hsw.cmd.face.CmdChangeFaceMoldingTexture";
  
  /** Command to add molding to a specific face */
  readonly AddFaceMolding: "hsw.cmd.face.CmdAddFaceMolding";
  
  /** Command to delete molding from a specific face */
  readonly DeleteFaceMolding: "hsw.cmd.face.CmdDeleteFaceMolding";
  
  /** Command to add mitre molding (corner molding) */
  readonly AddMitreMolding: "hsw.plugin.walldecoration.cmd.CmdAddMitreMolding";
  
  /** Command to add an opening pocket (e.g., for sliding doors) */
  readonly AddOpeningPocket: "hsw.plugin.openingpocket.CmdAddOpeningPocket";
  
  /** Command to change which side the pocket opens to */
  readonly ChangePocketSide: "hsw.plugin.openingpocket.CmdChangePocketSide";
  
  /** Command to change the outer width of the pocket */
  readonly ChangePocketOuterWidth: "hsw.plugin.openingpocket.CmdChangePocketOuterWidth";
  
  /** Command to change the outer height of the pocket */
  readonly ChangePocketOuterHeight: "hsw.plugin.openingpocket.CmdChangePocketOuterHeight";
  
  /** Command to edit the geometry of the pocket */
  readonly EditPocketGeometry: "hsw.plugin.openingpocket.CmdEditPocketGeometry";
  
  /** Command to edit the material of the pocket */
  readonly EditPocketMaterial: "hsw.plugin.openingpocket.CmdEditPocketMaterial";
}

/**
 * Frozen object containing all wall decoration command identifiers
 * @constant
 */
declare const wallDecorationCommands: Readonly<WallDecorationCommands>;

export default wallDecorationCommands;