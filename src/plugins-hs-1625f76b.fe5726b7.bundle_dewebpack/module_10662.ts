interface RoomTypeSpec {
  roomType: string;
  otherRoom: string;
}

interface Room {
  roomType: string;
  roomTypeDisplayName: string;
}

interface Transaction {
  onCommit(): void;
  onUndo(): void;
  onRedo(): void;
  getDescription(): string;
  getCategory(): string;
}

declare namespace HSApp {
  namespace Util {
    namespace Room {
      function getRoomTypeDisplayName(room: Room): string;
    }
  }
}

declare namespace HSFPConstants {
  enum LogGroupTypes {
    ViewOperation = 'ViewOperation'
  }
}

declare namespace HSCore {
  namespace Transaction {
    class Request implements Transaction {
      onCommit(): void;
      onUndo(): void;
      onRedo(): void;
      getDescription(): string;
      getCategory(): string;
    }
  }
}

/**
 * Transaction for modifying room type
 */
export default class RoomTypeChangeTransaction extends HSCore.Transaction.Request {
  private _room: Room;
  private _roomTypeSpec: RoomTypeSpec;

  constructor(room: Room, roomTypeSpec: RoomTypeSpec) {
    super();
    this._room = room;
    this._roomTypeSpec = roomTypeSpec;
  }

  onCommit(): void {
    this._applyRoomTypeSpec();
  }

  onUndo(): void {
    this._applyRoomTypeSpec();
  }

  onRedo(): void {
    this._applyRoomTypeSpec();
  }

  private _applyRoomTypeSpec(): void {
    const currentSpec: RoomTypeSpec = {
      roomType: this._room.roomType,
      otherRoom: HSApp.Util.Room.getRoomTypeDisplayName(this._room)
    };
    
    const newSpec = this._roomTypeSpec;
    this._room.roomType = newSpec.roomType;
    this._room.roomTypeDisplayName = newSpec.otherRoom;
    this._roomTypeSpec = currentSpec;
  }

  getDescription(): string {
    return `修改房间类型: ${this._roomTypeSpec.otherRoom}`;
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ViewOperation;
  }
}