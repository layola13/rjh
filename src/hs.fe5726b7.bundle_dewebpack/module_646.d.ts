/**
 * Content manipulation command constants
 * 
 * This module exports a frozen object containing command identifiers used throughout
 * the HSW (Home Style Works) content management system. These commands handle various
 * operations on 3D content, walls, products, and decorative elements.
 */

/**
 * Command identifiers for content manipulation operations in the HSW system.
 * All values are fully qualified command class names.
 * 
 * @remarks
 * This object is frozen to prevent modifications at runtime.
 */
export interface ContentCommands {
  /** Add a product to the scene */
  readonly AddProduct: string;
  
  /** Delete content from the scene */
  readonly DeleteContent: string;
  
  /** Display all content in the scene */
  readonly DisplayAllContent: string;
  
  /** Display a single content item */
  readonly DisplayContent: string;
  
  /** Display multiple content items */
  readonly DisplayContents: string;
  
  /** Duplicate existing content */
  readonly DuplicateContent: string;
  
  /** Move a single content item */
  readonly MoveContent: string;
  
  /** Move multiple content items */
  readonly MoveContents: string;
  
  /** Move an opening (door/window) */
  readonly MoveOpening: string;
  
  /** Rotate a hole in a wall */
  readonly RotateHole: string;
  
  /** Move a parametric background wall */
  readonly MoveParametricBackgroundWall: string;
  
  /** Move a non-customizable parametric background wall unit */
  readonly MoveNCPBackgroundWallUnit: string;
  
  /** Replace content with another item */
  readonly ReplaceContent: string;
  
  /** Smart replace content using contextual tools */
  readonly SmartReplaceContent: string;
  
  /** Flip content horizontally or vertically */
  readonly FlipContent: string;
  
  /** Create a parametric ceiling */
  readonly CreateParametricCeiling: string;
  
  /** Create an array of content items */
  readonly CmdContentArray: string;
  
  /** Edit parametric background wall auto-fit property */
  readonly EditParametricBackgroundWallIsAutoFit: string;
  
  /** Create an arc array of content items */
  readonly CmdContentArcArray: string;
  
  /** Move content in hard decoration mode */
  readonly MoveInHardDecoration: string;
  
  /** Move non-customizable parametric background wall in wall fitting area */
  readonly MoveNCPBgWallInWFA: string;
  
  /** Rotate content in hard decoration mode */
  readonly RotateInHardDecoration: string;
  
  /** Resize content in hard decoration mode */
  readonly ResizeInHardDecoration: string;
  
  /** Flip an opening (door/window) */
  readonly FlipOpening: string;
  
  /** Nudge content by small increments */
  readonly NudgeContent: string;
  
  /** Resize a single content item */
  readonly ResizeContent: string;
  
  /** Resize 3D content */
  readonly Resize3DContent: string;
  
  /** Resize multiple content items */
  readonly ResizeContents: string;
  
  /** Rotate a single content item */
  readonly RotateContent: string;
  
  /** Rotate multiple content items */
  readonly RotateContents: string;
  
  /** Apply wall treatment to entire wall */
  readonly ApplyToWholeWall: string;
  
  /** Apply treatment to entire room */
  readonly ApplyToEntireRoom: string;
  
  /** Resize a wall board */
  readonly ResizeWallBoard: string;
  
  /** Change the base of a non-customizable parametric background wall */
  readonly ChangeNCPBackgroundWallBase: string;
  
  /** Change the base of a parametric content item */
  readonly ChangeParametricContentBase: string;
  
  /** Place a product from catalog */
  readonly PlaceProduct: string;
  
  /** Open an independent panel */
  readonly OpenIndependentPanel: string;
  
  /** Create a wall-attached customized model */
  readonly CreateWallAttachedCustomizedModel: string;
  
  /** Create a room-attached customized model */
  readonly CreateRoomAttachedCustomizedModel: string;
  
  /** Edit a customized model */
  readonly EditCustomizedModel: string;
  
  /** Edit the type of a customized model */
  readonly EditCustomizedModelType: string;
  
  /** Edit a parametric ceiling */
  readonly EditParametricCeiling: string;
  
  /** Edit customized molding */
  readonly EditCustomizedMolding: string;
  
  /** Create a room-attached customized P-model */
  readonly CreateRoomAttachedCustomizedPModel: string;
  
  /** Edit a customized P-model */
  readonly EditCustomizedPModel: string;
  
  /** Edit the type of a customized P-model */
  readonly EditCustomizedPModelType: string;
  
  /** Edit door stone properties */
  readonly EditDoorStone: string;
  
  /** Get door stones status */
  readonly DoorStonesStatus: string;
  
  /** Toggle door stone alignment */
  readonly ToggleDoorStoneAlign: string;
  
  /** Apply door stone settings to all doors */
  readonly ApplyDoorStoneToAllDoors: string;
  
  /** Edit curtain cloth properties */
  readonly EditCurtainCloth: string;
  
  /** Edit curtain properties */
  readonly EditCurtain: string;
  
  /** Add a customization product */
  readonly AddCustomizationProduct: string;
  
  /** Select inner space for customization */
  readonly SelectCustomizationInnerSpace: string;
  
  /** Resize a customization product */
  readonly ResizeCustomizationProduct: string;
  
  /** Edit corner window properties */
  readonly EditCornerWindow: string;
  
  /** Change corner window type */
  readonly ChangeCornerWindow: string;
  
  /** Apply parameters to all corner windows */
  readonly ApplyParamsToAllCornerWindow: string;
  
  /** Align content items */
  readonly CmdAlign: string;
}

/**
 * Frozen object containing all content command identifiers.
 * Use these constants to reference commands throughout the application.
 */
const contentCommands: Readonly<ContentCommands> = Object.freeze({
  AddProduct: "hsw.cmd.content.CmdAddProduct",
  DeleteContent: "hsw.cmd.content.CmdDeleteContent",
  DisplayAllContent: "hsw.cmd.content.CmdDisplayAllContent",
  DisplayContent: "hsw.cmd.content.CmdDisplayContent",
  DisplayContents: "hsw.cmd.content.CmdDisplayContents",
  DuplicateContent: "hsw.cmd.content.CmdDuplicateContent",
  MoveContent: "hsw.cmd.content.CmdMoveContent",
  MoveContents: "hsw.cmd.content.CmdMoveContents",
  MoveOpening: "hsw.cmd.content.CmdMoveOpening",
  RotateHole: "hsw.cmd.content.CmdRotateHole",
  MoveParametricBackgroundWall: "hsw.cmd.content.CmdMoveParametricBackgroundWall",
  MoveNCPBackgroundWallUnit: "hsw.cmd.content.CmdMoveNCPBackgroundWallUnit",
  ReplaceContent: "hsw.cmd.content.CmdReplaceContent",
  SmartReplaceContent: "hsw.plugin.contextualtools.CmdSmartReplaceContent",
  FlipContent: "hsw.cmd.content.CmdFlipContent",
  CreateParametricCeiling: "hsw.plugin.content.CmdCreateParametricCeiling",
  CmdContentArray: "hsw.plugin.content.CmdContentArray",
  EditParametricBackgroundWallIsAutoFit: "hsw.cmd.content.CmdEditParametricBackgroundWallIsAutoFit",
  CmdContentArcArray: "hsw.plugin.content.CmdContentArcArray",
  MoveInHardDecoration: "hsw.cmd.harddecoration.MoveInHardDecoration",
  MoveNCPBgWallInWFA: "hsw.cmd.harddecoration.MoveNCPBgWallInWFA",
  RotateInHardDecoration: "hsw.cmd.harddecoration.RotateInHardDecoration",
  ResizeInHardDecoration: "hsw.cmd.harddecoration.ResizeInHardDecoration",
  FlipOpening: "hsw.cmd.content.CmdFlipOpening",
  NudgeContent: "hsw.plugin.contentmanipulation.CmdNudgeContent",
  ResizeContent: "hsw.plugin.contentmanipulation.CmdResizeContent",
  Resize3DContent: "hsw.plugin.contentmanipulation.CmdResize3DContent",
  ResizeContents: "hsw.plugin.contentmanipulation.CmdResizeContents",
  RotateContent: "hsw.cmd.content.CmdRotateContent",
  RotateContents: "hsw.cmd.content.CmdRotateContents",
  ApplyToWholeWall: "hsw.plugin.wallboard.CmdApplyToWholeWall",
  ApplyToEntireRoom: "hsw.plugin.wallboard.CmdApplyToEntireRoom",
  ResizeWallBoard: "hsw.plugin.wallboard.CmdResizeWallBoard",
  ChangeNCPBackgroundWallBase: "hsw.plugin.contentmanipulation.CmdChangeNCPBackgroundWallBase",
  ChangeParametricContentBase: "hsw.plugin.contentmanipulation.CmdChangeParametricContentBase",
  PlaceProduct: "hsw.plugin.catalog.CmdPlaceProduct",
  OpenIndependentPanel: "hsw.plugin.catalog.CmdOpenIndependentPanel",
  CreateWallAttachedCustomizedModel: "hsw.plugin.customizedmodeling.CmdCreateWallAttachedCustomizedModel",
  CreateRoomAttachedCustomizedModel: "hsw.plugin.customizedmodeling.CmdCreateRoomAttachedCustomizedModel",
  EditCustomizedModel: "hsw.plugin.customizedmodeling.CmdEditCustomizedModel",
  EditCustomizedModelType: "hsw.plugin.customizedmodeling.CmdEditCustomizedModelType",
  EditParametricCeiling: "hsw.plugin.customizedmodeling.CmdEditParametricCeiling",
  EditCustomizedMolding: "hsw.plugin.customizedmodeling.CmdEditCustomizedMolding",
  CreateRoomAttachedCustomizedPModel: "hsw.plugin.customizedpm.CmdCreateRoomAttachedCustomizedPModel",
  EditCustomizedPModel: "hsw.plugin.customizedpm.CmdEditCustomizedPModel",
  EditCustomizedPModelType: "hsw.plugin.customizedpm.CmdEditCustomizedPModelType",
  EditDoorStone: "hsw.plugin.doorstone.CmdEditDoorStone",
  DoorStonesStatus: "hsw.plugin.doorstone.CmdDoorStonesStatus",
  ToggleDoorStoneAlign: "hsw.plugin.doorstone.CmdToggleDoorStoneAlign",
  ApplyDoorStoneToAllDoors: "hsw.plugin.doorstone.CmdApplyDoorStoneToAllDoors",
  EditCurtainCloth: "hsw.plugin.curtain.CmdEditCurtainCloth",
  EditCurtain: "hsw.plugin.curtain.CmdEditCurtain",
  AddCustomizationProduct: "hsw.plugin.customization.AddCustomizationProduct",
  SelectCustomizationInnerSpace: "hsw.plugin.customization.InnerSpace",
  ResizeCustomizationProduct: "hsw.plugin.customization.ResizeCustomization",
  EditCornerWindow: "hsw.cmd.content.CmdEditCornerWindow",
  ChangeCornerWindow: "hsw.cmd.content.CmdChangeCornerWindow",
  ApplyParamsToAllCornerWindow: "hsw.cmd.content.CmdApplyParamsToAllCornerWindow",
  CmdAlign: "hsw.cmd.content.CmdAlign"
});

export default contentCommands;