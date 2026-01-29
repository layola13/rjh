interface App {
  signalDocumentClosing: unknown;
  signalDocumentOpened: unknown;
  floorplan: {
    signalUnderlayChanged: unknown;
  };
}

interface InitOptions {
  app: App;
}

interface SignalHook {
  listen(signal: unknown, handler: () => void): SignalHook;
  unlistenAll(): void;
}

interface Popup {
  toggle(value: unknown): void;
  onShowBackgroundToggleSetChecked(): void;
}

declare namespace HSCore.Util {
  class SignalHook {
    constructor(context: unknown);
    listen(signal: unknown, handler: () => void): SignalHook;
    unlistenAll(): void;
  }
}

class BackgroundManager {
  private _signalHook: SignalHook;
  private _contextSignalHook: SignalHook;
  private _app!: App;
  public popup!: Popup;

  constructor() {
    this._signalHook = new HSCore.Util.SignalHook(this);
    this._contextSignalHook = new HSCore.Util.SignalHook(this);
  }

  init(options: InitOptions): void {
    this._app = options.app;
    this.popup = new (Popup as any)();
    this._bindEvents(this._app);
  }

  private _bindEvents(app: App): void {
    this._signalHook
      .listen(app.signalDocumentClosing, this._unbindDocEvents.bind(this))
      .listen(app.signalDocumentOpened, this._bindDocEvents.bind(this));
  }

  private _unbindDocEvents(): void {
    this._contextSignalHook.unlistenAll();
  }

  private _bindDocEvents(): void {
    this._unbindDocEvents();
    const floorplan = this._app.floorplan;
    this._contextSignalHook.listen(
      floorplan.signalUnderlayChanged,
      this.popup.onShowBackgroundToggleSetChecked.bind(this.popup)
    );
  }

  toggle(value: unknown): void {
    this.popup.toggle(value);
  }
}

export default BackgroundManager;