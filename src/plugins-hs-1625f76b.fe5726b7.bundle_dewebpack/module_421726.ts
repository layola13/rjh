import SignalHook from './SignalHook';
import CommandManager from './CommandManager';
import { Room, RoomType } from './Room';

interface RoomTypeOption {
  id: RoomType;
  label: string;
}

interface ChangeRoomTypeParams {
  roomType: RoomType;
  otherRoom: Room | null;
}

interface App {
  cmdManager: CommandManager;
}

interface SignalAPIObject {
  signalPopulateStatusBar: unknown;
  signalRetiringStatusBar: unknown;
}

export default class RoomTypeController {
  private _app!: App;
  private _signalAPIObject!: SignalAPIObject;
  private _roomTypeOptions!: RoomTypeOption[];
  private _signalHook!: SignalHook;
  private _roomHook!: SignalHook;
  private _entities!: Room[];

  public init_(app: App, signalAPIObject: SignalAPIObject): void {
    this._app = app;
    this._signalAPIObject = signalAPIObject;
    
    this._roomTypeOptions = HSApp.Util.Room.getAvailableRoomTypes().map((roomType: RoomType) => ({
      id: roomType,
      label: ResourceManager.getString(`model_roomtype_${roomType}`)
    }));

    this._app.cmdManager.register(HSFPConstants.CommandType.ChangeRoomType, ChangeRoomTypeCommand);

    this._signalHook = new HSCore.Util.SignalHook(this);
    this._signalHook
      .listen(signalAPIObject.signalPopulateStatusBar, this._onPopulateStatusBar)
      .listen(signalAPIObject.signalRetiringStatusBar, this._onRetiringStatusBar);

    this._roomHook = new HSCore.Util.SignalHook(this);
  }

  public uninit_(): void {
    this._signalHook.unlistenAll();
    this._roomHook.unlistenAll();
  }

  private _onPopulateStatusBar(event: unknown): void {
    // Implementation placeholder
  }

  private _onRetiringStatusBar(): void {
    this._roomHook.unlistenAll();
  }

  private _roomTypeChangeHandler(roomType: RoomType, otherRoom: Room | null): void {
    const commandManager = this._app.cmdManager;
    const params: ChangeRoomTypeParams = {
      roomType,
      otherRoom
    };
    
    const command = commandManager.createCommand(
      HSFPConstants.CommandType.ChangeRoomType,
      [this._entities, params]
    );
    
    commandManager.execute(command);
    commandManager.complete();
  }

  private _deleteBtnClkHandler(): void {
    const commandManager = this._app.cmdManager;
    const commandType = HSFPConstants.CommandType.DeleteSelection;
    const command = commandManager.createCommand(commandType);
    
    commandManager.execute(command);
  }

  private _onRoomCeilStatusChangeHandler(status: boolean): void {
    const targetRoom = this._entities[0];
    const commandManager = this._app.cmdManager;
    const commandType = HSFPConstants.CommandType.ToggleCeilingStatus;
    const command = commandManager.createCommand(commandType, [targetRoom, status]);
    
    commandManager.execute(command);
  }
}