/**
 * Room transaction and plugin request type definitions
 * Contains message type identifiers for various room-related operations
 */

/**
 * Enumeration of room-related request message types
 * These correspond to internal HSW (likely HomeStyler Web) protocol messages
 */
interface RoomRequestTypes {
  /**
   * Request to toggle the ceiling status of a room
   * Message type: hsw.transaction.room.ToggleCeilingStatusRequest
   */
  readonly ToggleCeilingStatus: "hsw.transaction.room.ToggleCeilingStatusRequest";

  /**
   * Request to change the type of a room
   * Message type: hsw.plugin.contextualtools.ChangeRoomTypeRequest
   */
  readonly ChangeRoomType: "hsw.plugin.contextualtools.ChangeRoomTypeRequest";

  /**
   * Request to toggle the visibility of a room's ceiling
   * Message type: hsw.transaction.room.ToggleCeilingVisibilityRequest
   */
  readonly ToggleCeilingVisibility: "hsw.transaction.room.ToggleCeilingVisibilityRequest";

  /**
   * Request to change the global width parameter of a room
   * Message type: hsw.transaction.room.ChangeGlobalWidthRequest
   */
  readonly ChangeGlobalWidth: "hsw.transaction.room.ChangeGlobalWidthRequest";

  /**
   * Request to freeze a wall in a room (prevent modifications)
   * Message type: hsw.transaction.room.FreezeWallRequest
   */
  readonly FreezeWall: "hsw.transaction.room.FreezeWallRequest";

  /**
   * Request to change the global area type of a room
   * Message type: hsw.transaction.room.ChangeGlobalAreaType
   */
  readonly ChangeGlobalAreaType: "hsw.transaction.room.ChangeGlobalAreaType";
}

/**
 * Frozen constant object containing all room request message types
 * Use this to reference message type strings in a type-safe manner
 */
declare const roomRequestTypes: Readonly<RoomRequestTypes>;

export default roomRequestTypes;