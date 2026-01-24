/**
 * Command type constants for the HSW (Home Space Workshop) application.
 * This module defines all available command identifiers used throughout the system.
 * Each command represents a specific action or operation that can be executed.
 * 
 * @module CommandTypes
 * @frozen This object is frozen and cannot be modified at runtime
 */

/**
 * Enumeration of all command type identifiers in the HSW system.
 * Commands are organized by functional area (layer, selection, underlay, editor, etc.).
 */
export interface CommandTypes {
  /** Activate a specific layer */
  readonly ActiveLayer: "hsw.cmd.layer.CmdActiveLayer";
  
  /** Add a new layer to the design */
  readonly AddNewLayer: "hsw.cmd.layer.CmdAddLayer";
  
  /** Insert a layer at a specific position */
  readonly InsertLayer: "hsw.cmd.layer.CmdInsertLayer";
  
  /** Reset the ordering index of layers */
  readonly ResetLayerIndex: "hsw.cmd.layer.CmdResetLayerIndex";
  
  /** Delete a single layer */
  readonly DeleteLayer: "hsw.cmd.layer.CmdDeleteLayer";
  
  /** Delete multiple layers at once */
  readonly DeleteLayers: "hsw.cmd.layer.CmdDeleteLayers";
  
  /** Change the 3D visibility state of a layer */
  readonly ChangeLayerVisibility3d: "hsw.cmd.layer.CmdChangeLayerVisibility3d";
  
  /** Clean up and optimize a single layer */
  readonly CleanupLayer: "hsw.cmd.layer.CmdCleanupLayer";
  
  /** Clean up and optimize all layers */
  readonly CleanupAllLayer: "hsw.cmd.layer.CmdCleanupAllLayer";
  
  /** Toggle layer visibility on/off */
  readonly ToggleLayerVisibility: "hsw.cmd.layer.CmdToggleLayerVisibility";
  
  /** Modify the height property of a layer */
  readonly ChangeLayerHeight: "hsw.cmd.layer.CmdChangeLayerHeight";
  
  /** Export the current design as an image */
  readonly ExportImage: "hsw.plugin.export.CmdExportImage";
  
  /** Delete the currently selected items */
  readonly DeleteSelection: "hsw.cmd.selection.CmdDelete";
  
  /** Duplicate the currently selected items */
  readonly DuplicateSelection: "hsw.cmd.selection.CmdDuplicate";
  
  /** Select items by clicking on a point */
  readonly PointSelect: "hsw.cmd.selection.CmdPointSelect";
  
  /** Select items in elevation view */
  readonly ElevationSelect: "hsw.cmd.selection.CmdElevationSelect";
  
  /** Select items by drawing a window/rectangle */
  readonly WindowSelect: "hsw.cmd.selection.CmdWindowSelect";
  
  /** Move an underlay image or reference */
  readonly MoveUnderlay: "hsw.cmd.underlay.CmdMoveUnderlay";
  
  /** Update underlay properties or content */
  readonly UpdateUnderlay: "hsw.cmd.underlay.CmdUpdateUnderlay";
  
  /** Copy selected items to clipboard */
  readonly Copy: "hsw.plugin.editor.CmdCopy";
  
  /** Paste items from clipboard */
  readonly Paste: "hsw.plugin.editor.CmdPaste";
  
  /** Duplicate selected items in place */
  readonly Duplicate: "hsw.plugin.editor.CmdDuplicate";
  
  /** Paste items in a sequential arrangement */
  readonly PasteSequence: "hsw.plugin.editor.CmdPasteSequence";
  
  /** Duplicate items in a sequential arrangement */
  readonly DuplicateSequence: "hsw.plugin.editor.CmdDuplicateSequence";
  
  /** Cut selected items to clipboard */
  readonly Cut: "hsw.plugin.editor.CmdCut";
  
  /** Create a new auto-styler template */
  readonly CreateStylerTemplate: "hsw.plugin.autostyler.CmdCreateStylerTemplate";
  
  /** Import an existing styler template */
  readonly ImportStylerTemplate: "hsw.plugin.autostyler.CmdImportStylerTemplate";
  
  /** Edit an existing styler template */
  readonly EditStylerTemplate: "hsw.plugin.autostyler.CmdEditStylerTemplate";
  
  /** Restore a template to its default state */
  readonly CmdRestoreTemplate: "hsw.plugin.autostyler.CmdRestoreTemplate";
  
  /** Add multiple products to the design */
  readonly AddMultiProducts: "hsw.plugin.autostyler.AddMultiProducts";
  
  /** Add products using the auto-styler */
  readonly CmdAddProducts: "hsw.plugin.autostyler.CmdAddProducts";
  
  /** Activate the 2D measurement tool */
  readonly MeasureTool: "hsw.plugin.measuretool.CmdMeasureTool";
  
  /** Activate the 3D measurement tool */
  readonly MeasureTool3D: "hsw.plugin.measuretool.CmdMeasureTool3d";
  
  /** Enter the cabinet customization application */
  readonly EnterCabinetApp: "hsw.plugin.customizedcabinet.CmdEnterCabinetApp";
  
  /** Change the position of a cabinet component */
  readonly CmdChangeComponentPosition: "hsw.plugin.customizedcabinet.CmdChangeComponentPosition";
  
  /** Change the position of a drawer in a cabinet */
  readonly CmdChangeDrawerPosition: "hsw.plugin.customizedcabinet.CmdChangeDrawerPosition";
  
  /** Activate the material brush tool for applying materials */
  readonly MaterialBrush: "hsw.plugin.materialbrush.MaterialBrush";
  
  /** Mirror/flip the floorplan */
  readonly FloorplanMirror: "hsw.plugin.floorplanmirror.CmdMirror";
  
  /** Create a new outdoor space area */
  readonly CreateOutdoorSpace: "hsw.cmd.layer.CmdCreateOutdoorSpace";
  
  /** Delete an outdoor space area */
  readonly DeleteOutdoorSpace: "hsw.cmd.layer.CmdDeleteOutdoorSpace";
  
  /** Divide a space into multiple sections */
  readonly DivideSpace: "hsw.cmd.layer.CmdDivideSpace";
  
  /** Align multiple layers relative to each other */
  readonly AlignLayers: "hsw.cmd.layer.CmdAlignLayers";
  
  /** Rename an existing layer */
  readonly RenameLayer: "hsw.cmd.layer.RenameLayer";
  
  /** Copy and paste entire rooms between layers */
  readonly CopyPasteRooms: "hsw.cmd.layer.CmdCopyPasteRooms";
  
  /** Replace a product while changing its style */
  readonly ReplaceProductStyleChange: "hsw.plugin.customization.CmdReplaceProductStyleChange";
  
  /** Automatically select items based on criteria */
  readonly AutoSelect: "hsw.plugin.customization.AutoSelect";
  
  /** Select line elements in the design */
  readonly SelectLines: "hsw.plugin.customization.SelectLines";
  
  /** Create an auxiliary/guide line */
  readonly CreateAuxiliaryLine: "hsw.plugin.auxiliaryline.CmdCreateAuxiliaryLine";
  
  /** Remove auxiliary/guide lines */
  readonly RemoveAuxiliaryLines: "hsw.plugin.auxiliaryline.CmdRemoveAuxiliaryLines";
  
  /** Manage guideline for slab editing */
  readonly Guideline: "hsw.plugin.layeredit.CmdSlabEditGuideLine";
  
  /** Apply AI-powered smart layout using HomeGPT */
  readonly HomeGptSmartLayout: "hsw.plugin.layeredit.CmdHomeGptSmartLayout";
  
  /** Apply a mood board layout to the design */
  readonly ApplyMoodBoardLayout: "hsw.plugin.constraintlayout.CmdApplyMoodBoardLayout";
}

/**
 * Frozen singleton instance containing all command type identifiers.
 * This object cannot be modified at runtime to ensure command type integrity.
 */
declare const CommandTypes: Readonly<CommandTypes>;

export default CommandTypes;