const RoomTransactionTypes = {
    ToggleCeilingStatus: "hsw.transaction.room.ToggleCeilingStatusRequest",
    ChangeRoomType: "hsw.plugin.contextualtools.ChangeRoomTypeRequest",
    ToggleCeilingVisibility: "hsw.transaction.room.ToggleCeilingVisibilityRequest",
    ChangeGlobalWidth: "hsw.transaction.room.ChangeGlobalWidthRequest",
    FreezeWall: "hsw.transaction.room.FreezeWallRequest",
    ChangeGlobalAreaType: "hsw.transaction.room.ChangeGlobalAreaType"
} as const;

export type RoomTransactionType = typeof RoomTransactionTypes[keyof typeof RoomTransactionTypes];

export default RoomTransactionTypes;