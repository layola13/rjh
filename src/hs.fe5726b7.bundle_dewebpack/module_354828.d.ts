/**
 * Room command type definitions for HSW (Home Style Workshop) application.
 * Contains immutable command identifiers for room-related operations.
 * @module RoomCommands
 */

/**
 * Command identifiers for room manipulation operations.
 * All commands are prefixed with 'hsw.cmd' or 'hsw.plugin' namespace.
 * @readonly
 */
interface RoomCommands {
  /**
   * Command to change the global height of a room.
   * @type {string}
   */
  readonly ChangeGlobalHeight: "hsw.cmd.room.CmdChangeGlobalHeight";

  /**
   * Command to change the global width of a room.
   * @type {string}
   */
  readonly ChangeGlobalWidth: "hsw.cmd.room.CmdChangeGlobalWidth";

  /**
   * Command to toggle the frozen state of walls.
   * Frozen walls cannot be modified or moved.
   * @type {string}
   */
  readonly ChangeWallFreezed: "hsw.cmd.room.CmdChangeWallFreezed";

  /**
   * Command to change the global area type classification of a room.
   * @type {string}
   */
  readonly ChangeGlobalAreaType: "hsw.cmd.room.CmdChangeGlobalAreaType";

  /**
   * Command to toggle the visibility or rendering status of ceiling.
   * @type {string}
   */
  readonly ToggleCeilingStatus: "hsw.cmd.room.CmdToggleCeilingStatus";

  /**
   * Command to change the functional type of a room (e.g., bedroom, kitchen).
   * Implemented as a contextual tools plugin command.
   * @type {string}
   */
  readonly ChangeRoomType: "hsw.plugin.contextualtools.CmdChangeRoomType";

  /**
   * Command to delete a next-generation room entity.
   * @type {string}
   */
  readonly DeleteNGRoom: "hsw.cmd.room.CmdDeleteNGRoom";

  /**
   * Command to delete a next-generation space entity.
   * @type {string}
   */
  readonly DeleteNGSpace: "hsw.cmd.room.CmdDeleteSpace";

  /**
   * Command to modify the thickness of a layer component.
   * @type {string}
   */
  readonly ChangeLayerThickness: "hsw.cmd.layer.CmdChangeLayerThickness";
}

/**
 * Frozen immutable object containing all room command identifiers.
 * @constant
 */
declare const roomCommands: Readonly<RoomCommands>;

export default roomCommands;