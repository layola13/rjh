import { Handler } from './Handler';

interface PluginDependencies {
  [HSFPConstants.PluginType.UserInput]: unknown;
  [HSFPConstants.PluginType.Login]: LoginPlugin;
}

interface LoginPlugin {
  signalCheckPermissionsCompleted: HSCore.Util.Signal<unknown>;
}

interface HandlerOptions {
  dependencies: PluginDependencies;
  signalToolbarChanging: HSCore.Util.Signal<ToolbarPlugin>;
  signalToolbarChanged: HSCore.Util.Signal<ToolbarPlugin>;
  signalToolbarHover: HSCore.Util.Signal<ToolbarPlugin>;
  toolTipSignalHook: HSCore.Util.Signal<ToolbarPlugin>;
}

interface PluginContext {
  app: unknown;
}

interface ToolbarItem {
  disable(): void;
  enable(): void;
}

interface UserBenefitResult {
  useful: boolean;
}

declare global {
  const adskUser: {
    exportPicColorOffline: boolean;
    checkBenefit(category: string, feature: string): UserBenefitResult | null | undefined;
  };
  
  namespace HSCore.Util {
    class Signal<T> {
      constructor(owner: T);
    }
    class SignalHook<T> {
      constructor(owner: T);
      listen(signal: Signal<unknown>, callback: () => void): void;
      unlistenAll(): void;
    }
  }
  
  namespace HSApp {
    namespace UI {
      let ToolbarIdEnum: typeof ToolbarIdEnum;
    }
    
    namespace Plugin {
      class IPlugin {
        constructor(config: { name: string; description: string; dependencies: string[] });
      }
      
      function registerPlugin(type: string, pluginClass: typeof ToolbarPlugin): void;
    }
  }
  
  namespace HSFPConstants {
    namespace PluginType {
      const UserInput: string;
      const Login: string;
      const Toolbar: string;
    }
  }
}

enum ToolbarIdEnum {
  DEFAULT_TOOLBAR_ID = 'DEFAULT_TOOLBAR_ID'
}

class ToolbarPlugin extends HSApp.Plugin.IPlugin {
  private _handler: Handler;
  public ToolbarIdEnum: typeof ToolbarIdEnum;
  public signalToolbarChanging: HSCore.Util.Signal<ToolbarPlugin>;
  public signalToolbarChanged: HSCore.Util.Signal<ToolbarPlugin>;
  public signalToolbarHover: HSCore.Util.Signal<ToolbarPlugin>;
  public toolTipSignalHook: HSCore.Util.Signal<ToolbarPlugin>;
  public signalHook: HSCore.Util.SignalHook<ToolbarPlugin>;

  constructor() {
    super({
      name: 'toolbar plugin',
      description: 'wrapper for toolbar.',
      dependencies: [
        HSFPConstants.PluginType.UserInput,
        HSFPConstants.PluginType.Login
      ]
    });

    this._handler = new Handler();
    this.ToolbarIdEnum = ToolbarIdEnum;
    this.signalToolbarChanging = new HSCore.Util.Signal(this);
    this.signalToolbarChanged = new HSCore.Util.Signal(this);
    this.signalToolbarHover = new HSCore.Util.Signal(this);
    this.toolTipSignalHook = new HSCore.Util.Signal(this);
    this.signalHook = new HSCore.Util.SignalHook(this);
  }

  private _updateToolbarByPermission = (): void => {
    if (adskUser.exportPicColorOffline) {
      this.removeItem('toolBar_export/toolBar_export_pic_color', ToolbarIdEnum.DEFAULT_TOOLBAR_ID);
      this.removeItem('toolBar_export/toolbar_export_divider1', ToolbarIdEnum.DEFAULT_TOOLBAR_ID);
      this.removeItem('toolBar_export/toolbar_export_divider2', ToolbarIdEnum.DEFAULT_TOOLBAR_ID);
      this.removeItem('toolBar_export/toolBar_export_pic_no_furniture', ToolbarIdEnum.DEFAULT_TOOLBAR_ID);
    }

    const whiteLabelBenefit = adskUser.checkBenefit('whiteLabel', 'hidePriceFunction');
    if (whiteLabelBenefit?.useful) {
      this.removeItem('toolBar_ai_tools', ToolbarIdEnum.DEFAULT_TOOLBAR_ID);
      this.removeItem('toolBar_root_divider2', ToolbarIdEnum.DEFAULT_TOOLBAR_ID);
      this.removeItem('toolBar_export', ToolbarIdEnum.DEFAULT_TOOLBAR_ID);
      this.removeItem('toolBar_view_render_results', ToolbarIdEnum.DEFAULT_TOOLBAR_ID);
      this.removeItem('toolBar_snapshot_render', ToolbarIdEnum.DEFAULT_TOOLBAR_ID);
    }
  };

  public onActive(context: PluginContext, dependencies?: PluginDependencies): void {
    const loginPlugin = dependencies?.[HSFPConstants.PluginType.Login];
    if (loginPlugin) {
      this.signalHook.listen(
        loginPlugin.signalCheckPermissionsCompleted,
        this._updateToolbarByPermission
      );
    }

    const app = context.app;
    HSApp.UI = HSApp.UI || {};
    HSApp.UI.ToolbarIdEnum = ToolbarIdEnum;

    this._handler.init_(app, {
      dependencies,
      signalToolbarChanging: this.signalToolbarChanging,
      signalToolbarChanged: this.signalToolbarChanged,
      signalToolbarHover: this.signalToolbarHover,
      toolTipSignalHook: this.toolTipSignalHook
    });
  }

  public onDeactive(context: PluginContext): void {
    this.signalHook.unlistenAll();
  }

  public getItem(itemId: string, toolbarId: string): ToolbarItem {
    return this._handler.getItem_(itemId, toolbarId);
  }

  public getItemBySettingKey(settingKey: string, toolbarId: string): ToolbarItem {
    return this._handler.getItemBySettingKey(settingKey, toolbarId);
  }

  public addItem(item: unknown, toolbarId: string, position: number): unknown {
    return this._handler.addItem_(item, toolbarId, position);
  }

  public removeItem(itemId: string, toolbarId: string): void {
    this._handler.removeItem_(itemId, toolbarId);
  }

  public updateItems(items: unknown[], toolbarId: string, options: unknown): void {
    this._handler.updateItems_(items, toolbarId, options);
  }

  public hide(toolbarId: string): unknown {
    return this._handler.hide_(toolbarId);
  }

  public show(toolbarId: string): unknown {
    return this._handler.show_(toolbarId);
  }

  public addToolbar(toolbar: unknown, options: unknown): void {
    this._handler.addToolbar_(toolbar, options);
  }

  public updateToolbar(toolbarId: string, updates: unknown): void {
    this._handler.updateToolbar_(toolbarId, updates);
  }

  public activateToolbar(toolbarId: string, animate: boolean = true): void {
    this._handler.activateToolbar_(toolbarId, animate);
  }

  public getActiveToolbarId(): string {
    return this._handler.getActiveToolbarId_();
  }

  public addLinkedToolbar(parentId: string, childToolbar: unknown, options: unknown): void {
    this._handler.addLinkedToolbar_(parentId, childToolbar, options);
  }

  public disableItem(itemId: string, toolbarId?: string): void {
    if (toolbarId) {
      this._handler.getItem_(itemId, toolbarId).disable();
    } else {
      this._handler._getItemOnDefaultToolbar(itemId).disable();
    }
  }

  public enableItem(itemId: string, toolbarId?: string): void {
    if (toolbarId) {
      this._handler.getItem_(itemId, toolbarId).enable();
    } else {
      this._handler._getItemOnDefaultToolbar(itemId).enable();
    }
  }

  public setViewOptionStatus(optionKey: string, status: unknown): void {
    this._handler.setViewOptionStatus(optionKey, status);
  }

  public setViewOptionsStatus(options: unknown): void {
    this._handler.setViewOptionsStatus(options);
  }

  public updateItemsByOptions(options: unknown, toolbarId: string): void {
    this._handler.updateItemsByOptions_(options, toolbarId);
  }

  public setToolbarItemisPressed(itemId: string): void {
    this._handler._setToolbarItemisPressed(itemId);
  }

  public clearAllHiddenModels(modelId: unknown): void {
    this._handler.transactionHandler.clearAllHiddenModels(modelId);
  }

  public addHiddenModels(models: unknown): void {
    this._handler.transactionHandler.addHiddenModels(models);
  }

  public updateHiddenModels(models: unknown): void {
    this._handler.transactionHandler.updateHiddenModels(models);
  }

  public showSecondToolbar(show: boolean): void {
    this._handler.showSecondToolbar(show);
  }

  public getToolbarHeight(): number {
    return this._handler.getToolbarHeight();
  }

  public setToolbarReadonlyModel(): void {
    this._handler.setToolbarReadonlyModel();
  }

  public setToolbarViewerModel(): void {
    this._handler.setToolbarViewerModel();
  }

  public setToolbarEditModel(): void {
    this._handler.setToolbarEditModel();
  }

  public setBadgeCount(itemId: string, count: number, toolbarId: string): void {
    this._handler.setBadgeCount(itemId, count, toolbarId);
  }

  public setItemData(itemId: string, data: unknown, toolbarId: string): void {
    this._handler.setItemData(itemId, data, toolbarId);
  }

  public getChildItem(parentId: string, childId: string): unknown {
    return this._handler.getChildItem(parentId, childId);
  }

  public getChildrenItems(parentId: string, toolbarId: string): unknown[] {
    return this._handler.getChildrenItems(parentId, toolbarId);
  }

  public getToolbarsInDefaultEnv(): unknown[] {
    return this._handler._getToolbarsInDefaultEnv();
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.Toolbar, ToolbarPlugin);