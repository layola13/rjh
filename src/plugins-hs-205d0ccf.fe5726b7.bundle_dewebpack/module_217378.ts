interface Room {
  isFlagOff(flag: number): boolean;
}

interface TransactionRequest {
  // Transaction request structure
}

interface TransactionManager {
  createRequest(requestType: number, args: unknown[]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface CommandContext {
  transManager: TransactionManager;
}

interface CommandManager {
  complete(command: Command): void;
}

abstract class Command {
  protected context!: CommandContext;
  protected mgr!: CommandManager;
  
  abstract onExecute(): void;
  abstract canUndoRedo(): boolean;
}

class ToggleCeilingCommand extends Command {
  private readonly _room: Room;
  private readonly _isCeilingOn: boolean;

  constructor(room: Room, isCeilingOn: boolean) {
    super();
    this._room = room;
    this._isCeilingOn = isCeilingOn;
  }

  onExecute(): void {
    const isCeilingCurrentlyOff = this._room.isFlagOff(HSCore.Model.RoomFlagEnum.ceilingOff);
    
    if (isCeilingCurrentlyOff !== this._isCeilingOn) {
      const request = this.context.transManager.createRequest(
        HSFPConstants.RequestType.ToggleCeilingStatus,
        [this._room, this._isCeilingOn]
      );
      this.context.transManager.commit(request);
      this.mgr.complete(this);
    }
  }

  canUndoRedo(): boolean {
    return false;
  }
}

export default ToggleCeilingCommand;