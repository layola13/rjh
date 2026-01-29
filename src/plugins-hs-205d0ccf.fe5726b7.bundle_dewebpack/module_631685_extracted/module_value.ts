interface SignalHook {
  listen(signal: unknown, handler: (...args: unknown[]) => void): this;
}

interface MenuPlugin {
  signalPopulateCustomizedItems: unknown;
}

interface PropertyBarPlugin {
  signalPopulatePropertyBar: unknown;
}

interface CommandManager {
  signalCommandStarted: unknown;
  signalCommandTerminating: unknown;
}

interface Application {
  signalDocumentClosing: unknown;
}

class ModuleValue {
  private _signalHook!: SignalHook;
  private _menuPlugin!: MenuPlugin;
  private _propertyBarPlugin!: PropertyBarPlugin;
  protected cmdMgr!: CommandManager;
  private _app!: Application;

  protected onPopulateRightmenuCustomized(...args: unknown[]): void {
    // Implementation
  }

  protected onPopulatePropertyBar(...args: unknown[]): void {
    // Implementation
  }

  protected createRoomCommandBegin(...args: unknown[]): void {
    // Implementation
  }

  protected createRoomCommandEnd(...args: unknown[]): void {
    // Implementation
  }

  protected initializeSignalListeners(): void {
    this._signalHook
      .listen(this._menuPlugin.signalPopulateCustomizedItems, this.onPopulateRightmenuCustomized)
      .listen(this._propertyBarPlugin.signalPopulatePropertyBar, this.onPopulatePropertyBar)
      .listen(this.cmdMgr.signalCommandStarted, this.createRoomCommandBegin)
      .listen(this.cmdMgr.signalCommandTerminating, this.createRoomCommandEnd)
      .listen(this._app.signalDocumentClosing, this.createRoomCommandEnd);
  }
}

export { ModuleValue };