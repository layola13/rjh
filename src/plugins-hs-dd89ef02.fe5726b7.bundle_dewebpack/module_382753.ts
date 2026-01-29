class UserInputPlugin extends HSApp.Plugin.IPlugin {
  private readonly _prefix: string = "application/juran-";
  private _handler: MouseKeyboardHandler | IEMouseKeyboardHandler;
  private actions: ActionsManager;

  public signalCopyOccurred: HSCore.Util.Signal<UserInputPlugin>;
  public signalPasteOccurred: HSCore.Util.Signal<UserInputPlugin>;
  public signalCutOccurred: HSCore.Util.Signal<UserInputPlugin>;
  public signalItemDeleting: HSCore.Util.Signal<UserInputPlugin>;
  public signalActionQuitting: HSCore.Util.Signal<UserInputPlugin>;

  constructor() {
    super({
      name: "UserInput Plugin",
      description: "Manage mouse/keyboard events",
      dependencies: []
    });

    this.signalCopyOccurred = new HSCore.Util.Signal(this);
    this.signalPasteOccurred = new HSCore.Util.Signal(this);
    this.signalCutOccurred = new HSCore.Util.Signal(this);
    this.signalItemDeleting = new HSCore.Util.Signal(this);
    this.signalActionQuitting = new HSCore.Util.Signal(this);

    this._handler = HSApp.Util.UserAgent.isIE()
      ? new IEMouseKeyboardHandler()
      : new MouseKeyboardHandler();
  }

  public onActive(app: HSApp.Application, dependencies: unknown[]): void {
    super.onActive(app, dependencies);

    this.actions = new ActionsManager({
      signalItemDeleting: this.signalItemDeleting,
      signalActionQuitting: this.signalActionQuitting
    });

    this._handler.init({
      app: app.app,
      dependencies,
      signalCopyOccurred: this.signalCopyOccurred,
      signalPasteOccurred: this.signalPasteOccurred,
      signalCutOccurred: this.signalCutOccurred,
      prefix: this._prefix,
      userInputPlugin: this,
      actions: this.actions
    });

    app.app.cmdManager.register([
      [HSFPConstants.CommandType.CmdClearFurniture, ClearFurnitureCommand],
      [HSFPConstants.CommandType.CmdClearHardDecorations, ClearHardDecorationsCommand],
      [HSFPConstants.CommandType.CmdClearDecorations, ClearDecorationsCommand],
      [HSFPConstants.CommandType.CmdClearView, ClearViewCommand]
    ]);
  }

  public onDeactive(): void {
    this._handler.uninit();
  }

  public setIsReplaceable(isReplaceable: boolean): void {
    this._handler.setIsReplaceable_(isReplaceable);
  }

  public setIsDeletable(isDeletable: boolean): void {
    this._handler.setIsDeletable_(isDeletable);
  }

  public setIsCopyPasteEnable(isEnabled: boolean): void {
    this._handler.setCopyPasteEnable(isEnabled);
  }

  public getMousePosition(): MousePosition {
    return { ...this._handler.mousePosition_ };
  }

  public getJSON(data: unknown): string {
    return this._handler.getJSON(data);
  }

  public setJSON(json: string, options?: unknown): void {
    this._handler.setJSON(json, options);
  }

  public fireCopy(): void {
    this._handler.fireCopy();
  }

  public fireCut(): void {
    this._handler.fireCut();
  }

  public firePaste(): void {
    this._handler.firePaste();
  }

  public registerHotkey(key: string, modifiers: string[], callback: () => void): void {
    this._handler.hotkey.registerHotkey(key, modifiers, callback);
  }

  public unregisterHotkey(key: string, modifiers: string[], callback: () => void): void {
    this._handler.hotkey.unregisterHotkey(key, modifiers, callback);
  }

  public duplicateMaterialAndDraw(): void {
    this._handler.duplicateMaterialAndDraw();
  }

  public fitDes(): void {
    this.actions.fitDes();
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.UserInput, UserInputPlugin);