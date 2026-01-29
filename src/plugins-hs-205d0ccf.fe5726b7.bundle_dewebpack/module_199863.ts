interface IApp {
  signalDocumentOpening: unknown;
  signalDocumentOpened: unknown;
  floorplan: IFloorplan;
}

interface IFloorplan {
  setFlagOn(flag: EntityFlagEnum, recursive: boolean): void;
  setFlagOff(flag: EntityFlagEnum, recursive: boolean): void;
}

enum EntityFlagEnum {
  unselectable = 'unselectable',
  freezed = 'freezed'
}

interface IPluginConfig {
  [HSFPConstants.PluginType.SignIn]: ISignInPlugin;
}

interface ISignInPlugin {
  signals: {
    signalSigninSucceeded: unknown;
    signalSignoutSucceeded: unknown;
  };
}

interface ISignalHook {
  listen(signal: unknown, handler: (data?: any) => void): ISignalHook;
  unlistenAll(): void;
}

interface IDocumentOpeningEvent {
  data: {
    designMetaObj?: unknown;
  };
}

interface ILiveHint {
  show(message: string, duration: number, callback: () => void, options: { canclose: boolean }): void;
  hide(): void;
}

declare const HSFPConstants: {
  PluginType: {
    SignIn: string;
  };
};

declare const HSCore: {
  Util: {
    SignalHook: new (context: any) => ISignalHook;
  };
  Model: {
    EntityFlagEnum: typeof EntityFlagEnum;
  };
};

declare const HSApp: {
  Util: {
    Design: {
      isReadOnly(): boolean;
    };
  };
};

declare const ResourceManager: {
  getString(key: string): string | null;
};

declare const LiveHint: ILiveHint | undefined;

const LIVE_HINT_DURATION = 10000;

export default class ReadOnlyDesignPlugin {
  private _app!: IApp;
  private _signalHook!: ISignalHook;
  private _liveHint: ILiveHint | null = null;
  private _appChangedForReadonly = false;

  init(app: IApp, plugins: IPluginConfig): void {
    this._app = app;
    const signInPlugin = plugins[HSFPConstants.PluginType.SignIn];
    const signalHook = new HSCore.Util.SignalHook(this);
    this._signalHook = signalHook;

    signalHook
      .listen(app.signalDocumentOpening, this._onDocumentOpening)
      .listen(app.signalDocumentOpened, this._onDocumentOpened)
      .listen(signInPlugin.signals.signalSigninSucceeded, this._onSignInStatusChanged)
      .listen(signInPlugin.signals.signalSignoutSucceeded, this._onSignInStatusChanged);
  }

  uninit(): void {
    this._signalHook.unlistenAll();
  }

  private _onDocumentOpening = (event: IDocumentOpeningEvent): void => {
    if (event.data.designMetaObj && HSApp.Util.Design.isReadOnly()) {
      this._onOpenReadonlyDesign(false);
    }
  };

  private _onDocumentOpened = (): void => {
    this._checkReadOnlyStatus();
  };

  private _onOpenReadonlyDesign(showHint: boolean): void {
    this._app.floorplan.setFlagOn(HSCore.Model.EntityFlagEnum.unselectable, true);
    this._app.floorplan.setFlagOn(HSCore.Model.EntityFlagEnum.freezed, true);

    if (showHint && LiveHint) {
      const message = ResourceManager.getString("open_readonly_design_livehint");
      if (message) {
        this._liveHint = LiveHint;
        LiveHint.show(message, LIVE_HINT_DURATION, () => {
          LiveHint.hide();
          this._liveHint = null;
        }, {
          canclose: false
        });
      }
    }

    this._appChangedForReadonly = true;
  }

  private _onOpenNormalDesign(): void {
    if (this._appChangedForReadonly) {
      this._app.floorplan.setFlagOff(HSCore.Model.EntityFlagEnum.unselectable, true);
      this._app.floorplan.setFlagOff(HSCore.Model.EntityFlagEnum.freezed, true);

      if (this._liveHint) {
        this._liveHint.hide();
      }

      this._appChangedForReadonly = false;
    }
  }

  private _onSignInStatusChanged = (): void => {
    this._checkReadOnlyStatus();
  };

  private _checkReadOnlyStatus(): void {
    if (HSApp.Util.Design.isReadOnly()) {
      this._onOpenReadonlyDesign(true);
    } else {
      this._onOpenNormalDesign();
    }
  }
}