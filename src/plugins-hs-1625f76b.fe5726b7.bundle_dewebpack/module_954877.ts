interface RoomTypeSpec {
  otherRoom: string;
  [key: string]: unknown;
}

interface TransactionManager {
  startSession(): Session;
  createRequest(requestType: string, args: unknown[]): Request;
  commit(request: Request): void;
}

interface Session {
  commit(): void;
}

interface Request {
  [key: string]: unknown;
}

interface CommandContext {
  transManager: TransactionManager;
  [key: string]: unknown;
}

interface CommandManager {
  complete(command: Command): void;
  [key: string]: unknown;
}

interface CurrentParams {
  description: string;
  activeSection: string;
  activeSectionName: string;
  clicksRatio: {
    id: string;
    name: string;
  };
}

abstract class Command {
  protected context!: CommandContext;
  protected mgr!: CommandManager;
  
  abstract onExecute(): void;
  abstract canUndoRedo(): boolean;
  abstract getDescription(): string;
  abstract getCategory(): string;
  abstract getCurrentParams(): CurrentParams;
}

class ChangeRoomTypeCommand extends Command {
  private readonly _rooms: unknown[];
  private readonly _roomTypeSpec: RoomTypeSpec;

  constructor(room: unknown | unknown[], roomTypeSpec: RoomTypeSpec) {
    super();
    this._rooms = Array.isArray(room) ? [room[0]] : [room];
    this._roomTypeSpec = roomTypeSpec;
  }

  onExecute(): void {
    const transManager = this.context.transManager;
    const session = transManager.startSession();
    
    this._rooms.forEach((room) => {
      const request = transManager.createRequest(
        HSFPConstants.RequestType.ChangeRoomType,
        [room, this._roomTypeSpec]
      );
      transManager.commit(request);
    });
    
    session.commit();
    this.mgr.complete(this);
  }

  canUndoRedo(): boolean {
    return false;
  }

  getDescription(): string {
    return `修改房间类型: ${this._roomTypeSpec.otherRoom}`;
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ViewOperation;
  }

  getCurrentParams(): CurrentParams {
    const description = this.getDescription();
    return {
      description,
      activeSection: "propertyPanel",
      activeSectionName: "属性面板",
      clicksRatio: {
        id: HSFPConstants.CommandType.ChangeRoomType,
        name: description
      }
    };
  }
}

export default ChangeRoomTypeCommand;