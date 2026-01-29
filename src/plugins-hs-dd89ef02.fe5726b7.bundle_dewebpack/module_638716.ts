interface UserInputPluginConfig {
  app: any;
  dependencies: any;
  signalCopyOccurred: Signal;
  signalPasteOccurred: Signal;
  signalCutOccurred: Signal;
  prefix: string;
  actions: PluginActions;
}

interface Signal {
  dispatch(): void;
}

interface PluginActions {
  isReplaceable?: boolean;
  isDeletable?: boolean;
}

interface MousePosition {
  x: number;
  y: number;
}

interface ClipboardDataObject {
  type: string;
  value: any;
}

interface Hotkey {
  new (config: { app: any; actions: PluginActions }): any;
}

const logger = log.logger("hsw.plugin.userinputPlugin");

export default class UserInputPlugin {
  private _app: any;
  private _dependencies: any;
  private signalCopyOccurred!: Signal;
  private signalPasteOccurred!: Signal;
  private signalCutOccurred!: Signal;
  private prefix!: string;
  private isCopyPastEnable: boolean = true;
  private _clipboardData: DataTransfer | null = null;
  private hotkey: any;
  private actions!: PluginActions;
  private mousePosition_: MousePosition = { x: 0, y: 0 };

  constructor() {}

  init(config: UserInputPluginConfig): void {
    this._app = config.app;
    this._dependencies = config.dependencies;
    this.signalCopyOccurred = config.signalCopyOccurred;
    this.signalPasteOccurred = config.signalPasteOccurred;
    this.signalCutOccurred = config.signalCutOccurred;
    this.prefix = config.prefix;
    this.isCopyPastEnable = true;
    this._clipboardData = null;
    this.hotkey = new (HSCore as any).Hotkey({
      app: this._app,
      actions: config.actions
    });
    this.actions = config.actions;
    this._setClipboardListeners();
    this._setMousePostionListeners();
  }

  uninit(): void {}

  duplicateMaterialAndDraw(): void {
    document.execCommand("copy");
  }

  private _setClipboardListeners(): void {
    document.addEventListener("copy", (event: ClipboardEvent) => {
      if (this.isCopyPastEnable && !this._forbiddingCopyAndPaste()) {
        const selectedItem = this._app.selectionManager.selected()[0];
        
        if (
          selectedItem instanceof (HSCore.Model as any).Cornice ||
          selectedItem instanceof (HSCore.Model as any).Baseboard
        ) {
          HSApp.App.getApp()
            .pluginManager.getPlugin(HSFPConstants.PluginType.WallDecoration)
            .handler.copyMolding(selectedItem);
        } else {
          const selection = window.getSelection();
          if (selection && selection.toString().length > 0) {
            return;
          }
          
          if (event?.clipboardData) {
            this._clipboardData = event.clipboardData;
          }
          this._dispatchSignal("copy");
        }
        event.preventDefault();
      }
    });

    document.addEventListener("cut", (event: ClipboardEvent) => {
      if (this.isCopyPastEnable && !this._forbiddingCopyAndPaste()) {
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) {
          return;
        }
        
        if (event?.clipboardData) {
          this._clipboardData = event.clipboardData;
        }
        this._dispatchSignal("cut");
        event.preventDefault();
      }
    });

    document.addEventListener("paste", (event: ClipboardEvent) => {
      if (this.isCopyPastEnable && !this._forbiddingCopyAndPaste()) {
        const clipboardText =
          (window as any).clipboardData?.getData
            ? (window as any).clipboardData.getData("Text")
            : event.clipboardData?.getData("Text");
        
        if (!clipboardText) {
          if (event?.clipboardData) {
            this._clipboardData = event.clipboardData;
          }
          this._dispatchSignal("paste");
          event.preventDefault();
        }
      }
    });
  }

  private _setMousePostionListeners(): void {
    this.mousePosition_ = { x: 0, y: 0 };
    
    document.addEventListener("mousemove", (event: MouseEvent) => {
      this.mousePosition_.x = event.clientX;
      this.mousePosition_.y = event.clientY;
    });
  }

  private _forbiddingCopyAndPaste(): boolean {
    const selectedItem = this._app.selectionManager.selected()[0];
    return !!(
      this._app.is3DViewActive() &&
      selectedItem &&
      selectedItem.metadata &&
      selectedItem.metadata.contentType.isTypeOf(
        HSCatalog.ContentTypeEnum.ext_Obstacle
      )
    );
  }

  private _dispatchSignal(signalType: "cut" | "copy" | "paste"): void {
    switch (signalType) {
      case "cut":
        this.signalCutOccurred.dispatch();
        break;
      case "copy":
        this.signalCopyOccurred.dispatch();
        break;
      case "paste":
        this.signalPasteOccurred.dispatch();
        break;
    }
  }

  private _getDataType(dataKey: string): string {
    return `${this.prefix}-${dataKey}`;
  }

  private _getDataFormat(dataKey: string): string {
    return this._getDataType(dataKey);
  }

  setIsReplaceable_(isReplaceable: boolean): void {
    this.actions.isReplaceable = isReplaceable;
  }

  setIsDeletable_(isDeletable: boolean): void {
    this.actions.isDeletable = isDeletable;
  }

  getJSON(dataKey: string): any {
    if (!this._clipboardData) {
      return undefined;
    }

    try {
      const dataType = this._getDataType(dataKey);
      const dataFormat = this._getDataFormat(dataKey);
      const clipboardContent = this._clipboardData.getData(dataFormat);
      
      if (clipboardContent) {
        const parsedData = HSCore.Util.Object.JSONParse(clipboardContent) as ClipboardDataObject;
        if (parsedData.type === dataType) {
          return parsedData.value;
        }
      }
    } catch (error: unknown) {
      const err = error as Error;
      logger.error("getJSON() " + (err.stack ?? ""));
      const errorMessage = "[Plugin userinput]: getJSON() error";
      HSApp.App.getApp().errorLogger.push(errorMessage, {
        errorStack: err.stack ?? new Error(errorMessage),
        description: errorMessage,
        errorInfo: {
          info: error,
          path: {
            file: "homestyler-tools-web/web/plugin/userinput/handler.js",
            functionName: "getJSON()"
          }
        }
      });
    }
    
    return undefined;
  }

  setJSON(dataKey: string, value: any): boolean {
    if (!this._clipboardData) {
      return false;
    }

    try {
      const dataType = this._getDataType(dataKey);
      const dataFormat = this._getDataFormat(dataKey);
      const dataObject: ClipboardDataObject = {
        type: dataType,
        value: value
      };
      
      this._clipboardData.setData(
        dataFormat,
        HSCore.Util.Object.JSONStringify(dataObject)
      );
      return true;
    } catch (error: unknown) {
      const err = error as Error;
      logger.error("setJSON() " + (err.stack ?? ""));
      const errorMessage = "[Plugin userinput]: setJSON() error";
      HSApp.App.getApp().errorLogger.push(errorMessage, {
        errorStack: err.stack ?? new Error(errorMessage),
        description: errorMessage,
        errorInfo: {
          info: error,
          path: {
            file: "homestyler-tools-web/web/plugin/userinput/handler.js",
            functionName: "setJSON()"
          }
        }
      });
    }
    
    return false;
  }

  fireCopy(): void {
    document.execCommand("copy");
  }

  fireCut(): void {
    document.execCommand("cut");
  }

  firePaste(): void {
    document.execCommand("paste");
  }

  setCopyPasteEnable(isEnabled: boolean): void {
    this.isCopyPastEnable = isEnabled;
  }
}