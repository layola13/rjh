import { Handler } from './Handler';
import { LeftMenuSignal } from './LeftMenuSignal';
import * as itemHandlers from './itemHandlers';
import * as commonItems from './commonItems';

/**
 * Left menu plugin for mouse interactions
 */
class LeftMenuPlugin extends HSApp.Plugin.IPlugin {
  private handler: Handler;
  public signalPopulateMinBar: HSCore.Util.Signal<LeftMenuPlugin>;
  public signalPopulateCustomizedItems: HSCore.Util.Signal<LeftMenuPlugin>;
  public signalItemClickEventTrack: HSCore.Util.Signal<LeftMenuPlugin>;
  public signalLeftMenuItemClick: LeftMenuSignal;
  public itemHandlers: typeof itemHandlers;
  public commonItems: typeof commonItems;
  public ignoreMouseEvent: Handler['ignoreMouseEvent'];

  constructor() {
    super({
      name: 'leftmenu plugin',
      description: 'left menu for mouse',
      dependencies: []
    });

    this.handler = new Handler();
    this.signalPopulateMinBar = new HSCore.Util.Signal(this);
    this.signalPopulateCustomizedItems = new HSCore.Util.Signal(this);
    this.signalItemClickEventTrack = new HSCore.Util.Signal(this);
    this.signalLeftMenuItemClick = LeftMenuSignal.getInstance();
    this.itemHandlers = itemHandlers;
    this.commonItems = commonItems;
    this.ignoreMouseEvent = this.handler.ignoreMouseEvent;
  }

  /**
   * Called when plugin becomes active
   */
  onActive(params: { app: HSApp.Application }): void {
    const { app } = params;
    this.handler.init(app, this);
  }

  /**
   * Called when plugin becomes deactive
   */
  onDeactive(): void {
    this.handler.uninit();
  }

  /**
   * Show the left menu bar
   */
  showLeftMenuBar(
    x: number,
    y: number,
    options?: unknown
  ): void {
    this.handler.showLeftMenuBar(x, y, true, options);
  }

  /**
   * Refresh menu items
   */
  refreshMenuItems(): void {
    this.handler.refreshMenuItems();
  }

  /**
   * Show the left menu
   */
  showLeftMenu(): void {
    this.handler.showLeftMenu();
  }

  /**
   * Hide the left menu
   */
  hideLeftMenu(): void {
    this.handler.hideLeftMenu();
  }

  /**
   * Display the left menu
   */
  displayLeftMenu(): void {
    this.handler.displayLeftMenu();
  }

  /**
   * Enable the left menu
   */
  enableLeftMenu(): void {
    this.handler.enableLeftMenu();
  }

  /**
   * Disable the left menu
   */
  disableLeftMenu(): void {
    this.handler.disableLeftMenu();
  }

  /**
   * Check if left menu is currently showed
   */
  isLeftMenuShowed(): boolean {
    return this.handler.isLeftMenuShowed();
  }

  /**
   * Register mouse event callback
   */
  registerMouseEventCallBack(callback: Function): void {
    this.handler.registerMouseEventCallBack(callback);
  }

  /**
   * Unregister mouse event callback
   */
  unregisterMouseEventCallBack(callback: Function): void {
    this.handler.unregisterMouseEventCallBack(callback);
  }

  /**
   * Register 3D mouse event callback
   */
  register3DMouseEventCallBack(callback: Function): void {
    this.handler.register3DMouseEventCallBack(callback);
  }

  /**
   * Set left menu to readonly mode
   */
  setLeftMenuReadonlyMode(readonly: boolean): void {
    this.handler.setLeftMenuReadonlyMode(readonly);
  }

  /**
   * Set left menu to edit mode
   */
  setLeftMenuEditMode(): void {
    this.handler.setLeftMenuEditMode();
  }

  /**
   * Register a strategy
   */
  registerStrategy(strategy: unknown): unknown {
    return this.handler.registerStrategy(strategy);
  }

  /**
   * Unregister a strategy
   */
  unregisterStrategy(strategy: unknown): unknown {
    return this.handler.unregisterStrategy(strategy);
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.LeftMenu, LeftMenuPlugin);