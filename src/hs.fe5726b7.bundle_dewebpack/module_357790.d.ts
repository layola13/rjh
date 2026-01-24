/**
 * Structure command type definitions for HSW plugin system.
 * This module defines all available command identifiers for structure and beam operations.
 * @module StructureCommands
 */

/**
 * Enumeration of all structure-related command identifiers.
 * These command strings are used to invoke various structure and beam manipulation operations
 * in the HSW plugin structure system.
 * 
 * @readonly
 * @enum {string}
 */
interface StructureCommands {
  /**
   * Command identifier for adding a new structure to the scene.
   * @type {string}
   */
  readonly AddStructure: "hsw.plugin.structure.cmd.CmdAddStructure";
  
  /**
   * Command identifier for moving an existing structure.
   * @type {string}
   */
  readonly MoveStructure: "hsw.plugin.structure.cmd.CmdMoveStructure";
  
  /**
   * Command identifier for moving a beam element.
   * @type {string}
   */
  readonly MoveBeam: "hsw.plugin.structure.cmd.CmdMoveBeam";
  
  /**
   * Command identifier for deleting a structure from the scene.
   * @type {string}
   */
  readonly DeleteStructure: "hsw.plugin.structure.cmd.CmdDeleteStructure";
  
  /**
   * Command identifier for deleting a beam element.
   * @type {string}
   */
  readonly DeleteBeam: "hsw.plugin.structure.cmd.CmdDeleteBeam";
  
  /**
   * Command identifier for changing the mode of a structure.
   * @type {string}
   */
  readonly ChangeStructureMode: "hsw.plugin.structure.cmd.CmdChangeStructureMode";
  
  /**
   * Command identifier for changing the type of a beam.
   * @type {string}
   */
  readonly ChangeBeamType: "hsw.plugin.structure.cmd.CmdChangeBeamType";
  
  /**
   * Command identifier for rotating a structure.
   * @type {string}
   */
  readonly RotateStructure: "hsw.plugin.structure.cmd.CmdRotateStructure";
  
  /**
   * Command identifier for rotating a beam element.
   * @type {string}
   */
  readonly RotateBeam: "hsw.plugin.structure.cmd.CmdRotateBeam";
  
  /**
   * Command identifier for copying and pasting a structure.
   * @type {string}
   */
  readonly CopyPasteStructure: "hsw.plugin.structure.cmd.CmdCopyPasteStructure";
  
  /**
   * Command identifier for copying and pasting a beam element.
   * @type {string}
   */
  readonly CopyPasteBeam: "hsw.plugin.structure.cmd.CmdCopyPasteBeam";
  
  /**
   * Command identifier for resizing a structure.
   * @type {string}
   */
  readonly ResizeStructure: "hsw.plugin.structure.cmd.CmdResizeStructure";
  
  /**
   * Command identifier for resizing a beam element.
   * @type {string}
   */
  readonly ResizeBeam: "hsw.plugin.structure.cmd.CmdResizeBeam";
}

/**
 * Frozen object containing all structure command identifiers.
 * This object is immutable and serves as a registry of command strings
 * for structure and beam operations in the HSW plugin system.
 */
declare const StructureCommands: Readonly<StructureCommands>;

export default StructureCommands;