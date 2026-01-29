interface AppSettings {
  defaultGlobalWallWidth: number;
}

interface Floorplan {
  globalWallWidth: number;
}

interface App {
  floorplan: Floorplan;
  appSettings: AppSettings;
}

interface HSApp {
  App: {
    getApp(): App;
  };
}

interface AppSettingsUtil {
  wallWidth: number;
  save(): void;
}

interface HSFPConstants {
  LogGroupTypes: {
    WallOperation: string;
  };
}

interface HSCore {
  Transaction: {
    Request: new (...args: unknown[]) => TransactionRequest;
  };
}

interface TransactionRequest {
  onCommit(): void;
  onUndo(): void;
  onRedo(): void;
  getDescription(): string;
  getCategory(): string;
}

interface SavedData {
  globalWidth: number;
}

declare const HSApp: HSApp;
declare const appSettingsUtil: AppSettingsUtil;
declare const HSFPConstants: HSFPConstants;
declare const HSCore: HSCore;

class ChangeGlobalWallWidthRequest extends (HSCore.Transaction.Request as any) {
  private app: App;
  private savedData: SavedData;
  private restoredData: SavedData;
  private width: number;

  constructor(width: number) {
    super();
    this.app = HSApp.App.getApp();
    this.savedData = {
      globalWidth: this.app.floorplan.globalWallWidth
    };
    this.restoredData = {
      globalWidth: this.app.floorplan.globalWallWidth
    };
    this.width = width;
  }

  private _saveToData(data: SavedData): void {
    data.globalWidth = this.app.floorplan.globalWallWidth;
  }

  private _restoreFromData(data: SavedData): void {
    this._changeWidth(data.globalWidth);
    this._saveToData(data);
  }

  onCommit(): void {
    this._changeWidth(this.width);
    this._saveToData(this.savedData);
  }

  private _changeWidth(width: number): void {
    let adjustedWidth = width;
    if (!isNaN(adjustedWidth)) {
      adjustedWidth = parseFloat(adjustedWidth.toFixed(8));
    }
    this.app.floorplan.globalWallWidth = adjustedWidth;
    this.app.appSettings.defaultGlobalWallWidth = adjustedWidth;
    appSettingsUtil.wallWidth = adjustedWidth;
    appSettingsUtil.save();
  }

  onUndo(): void {
    this._restoreFromData(this.restoredData);
  }

  onRedo(): void {
    this.onCommit();
  }

  getDescription(): string {
    return "修改全局墙宽";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}

export default ChangeGlobalWallWidthRequest;