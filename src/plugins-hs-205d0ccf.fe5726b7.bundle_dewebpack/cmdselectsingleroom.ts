import { HSApp } from './HSApp';

export class CmdSelectSingleRoom extends HSApp.Cmd.Command {
  private readonly _room: unknown;

  constructor(room: unknown) {
    super();
    this._room = room;
  }

  onExecute(): void {
    this._selectRoom(this._room);
    this.mgr.complete(this);
  }

  private _selectRoom(room: unknown): void {
    const app = HSApp.App.getApp();
    const plugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.SingleRoom);
    
    if (plugin) {
      if (!app.appSettings.isSingleRoomMode) {
        plugin.setTargetRoom(room);
        app.appSettings.isSingleRoomMode = true;
      }
      plugin.refreshTargetRoom(room);
    }
  }

  getDescription(): string {
    return "SelectRoom小窗口 选择单房间";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ThumbnaiView;
  }
}