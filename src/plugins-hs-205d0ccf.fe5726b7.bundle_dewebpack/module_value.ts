export class ModuleValue {
  private _app: Application;
  private signalHook: SignalHook;

  constructor(app: Application) {
    this._app = app;
    this.signalHook = new SignalHook();
    this.initialize();
  }

  private initialize(): void {
    this.signalHook
      .listen(this._app.signalDocumentClosing, this.onDocumentClosing)
      .listen(this._app.appSettings.signalValueChanged, this.onAppSettingsValueChanged);

    this._app.cmdManager.register(
      HSFPConstants.CommandType.SelectSingleRoom,
      CmdSelectSingleRoom
    );
  }

  private onDocumentClosing = (): void => {
    // Document closing handler
  };

  private onAppSettingsValueChanged = (): void => {
    // App settings value changed handler
  };
}

interface Application {
  signalDocumentClosing: Signal;
  appSettings: AppSettings;
  cmdManager: CommandManager;
}

interface Signal {
  // Signal interface
}

interface AppSettings {
  signalValueChanged: Signal;
}

interface CommandManager {
  register(commandType: string, commandClass: typeof CmdSelectSingleRoom): void;
}

interface SignalHook {
  listen(signal: Signal, handler: () => void): SignalHook;
}

class CmdSelectSingleRoom {
  // Command implementation
}

namespace HSFPConstants {
  export enum CommandType {
    SelectSingleRoom = 'SelectSingleRoom'
  }
}