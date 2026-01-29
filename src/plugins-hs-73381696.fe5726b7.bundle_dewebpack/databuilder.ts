interface MenuItem {
  id: string;
  label: string;
  hotkey?: string;
  disable?: boolean;
  registerHotkey?: boolean;
  onClick?: () => void;
  uiMode?: string[];
  getBenefitAmount?: () => number;
  showMarketModal?: () => void;
}

interface Strategy {
  name: string;
  order: number;
  isApplied: (entities: unknown[]) => boolean;
  getItems: (context: StrategyContext) => MenuItem[];
}

interface StrategyContext {
  entities: unknown[];
  app: unknown;
  is3D: boolean;
}

interface MenuItemsResult {
  defaultItems: MenuItem[];
  customizedItems: MenuItem[];
}

interface DispatchableItems extends MenuItemsResult {
  mousePos?: unknown;
}

export class DataBuilder {
  private static _instance?: DataBuilder;
  private strategies: Strategy[];
  private hotkeyMap: Map<string, MenuItem>;

  private constructor() {
    this.hotkeyMap = new Map();
    this.strategies = (window as any).s?.strategies ?? [];
  }

  static getInstance(): DataBuilder {
    if (!this._instance) {
      this._instance = new DataBuilder();
    }
    return this._instance;
  }

  getLeftMenuItem(dispatch: { dispatch: (items: DispatchableItems) => void }, mousePos?: unknown): MenuItem[] {
    const app = (window as any).HSApp.App.getApp();
    const selectedEntities = app.selectionManager.selected(true);

    this.sortStrategy();

    const items = this.getItems();
    items.mousePos = mousePos;
    dispatch.dispatch(items);

    let menuItems = [...items.defaultItems, ...items.customizedItems];

    const uniqueItemsMap = new Map<string, MenuItem>();
    menuItems.forEach(item => {
      uniqueItemsMap.set(item.id, item);
      item.label = (window as any).ResourceManager.getString(item.label);
    });

    menuItems = Array.from(uniqueItemsMap.values());

    if (app.appSettings.layoutDesignMode) {
      menuItems = menuItems.filter(item => 
        item.uiMode?.includes((window as any).HSFPConstants.UIMode.layoutDesignMode)
      );
    }

    menuItems = (window as any).HSApp.LayoutMode.LayoutModeManager.getInstance().filterData({
      data: menuItems,
      configKey: (window as any).HSApp.LayoutMode.ConfigKey.leftMenu,
      dataKey: selectedEntities[0]?.Class
    });

    this.updateItemBenefit(menuItems);
    this.registerHotKey(menuItems);

    return menuItems;
  }

  private updateItemBenefit(items: MenuItem[]): void {
    const advancedItem = items.find(item => item.id === 'walldecorationAdvanced');
    
    if (!advancedItem) {
      return;
    }

    const plugin = (window as any).HSApp.App.getApp().pluginManager.getPlugin(
      (window as any).HSFPConstants.PluginType.Ngmmixpaint
    );

    const benefitMethods = {
      getBenefitAmount: () => plugin?.getBenefitAmount?.(),
      showMarketModal: () => plugin?.showMarketModal?.()
    };

    Object.entries(benefitMethods).forEach(([key, value]) => {
      (advancedItem as any)[key] = value;
    });
  }

  private registerHotKey(items: MenuItem[]): void {
    this.unRegisterHotKey();

    const hotkeyManager = (window as any).HSApp.App.getApp().hotkey;

    items.forEach(item => {
      const { id, disable, hotkey, registerHotkey, onClick } = item;

      if (disable || !registerHotkey || !hotkey || !onClick || typeof onClick !== 'function') {
        return;
      }

      hotkeyManager.registerShortcut(hotkey);
      hotkeyManager.registerConditionalHotkey({
        hotkey,
        handler: onClick,
        condition: () => true,
        description: id,
        pluginName: (window as any).HSFPConstants.PluginType.LeftMenu
      });

      this.hotkeyMap.set(hotkey, item);
    });
  }

  private unRegisterHotKey(): void {
    const hotkeyManager = (window as any).HSApp.App.getApp().hotkey;

    this.hotkeyMap.forEach((item, hotkey) => {
      hotkeyManager.unRegisterShortcut(hotkey);
      hotkeyManager.unRegisterConditionalHotkey({
        hotkey,
        handler: item.onClick,
        condition: () => true,
        description: item.id,
        pluginName: (window as any).HSFPConstants.PluginType.LeftMenu
      });

      this.hotkeyMap.delete(hotkey);
    });
  }

  registerStrategy(strategy: Strategy): Strategy[] {
    const existingNames = this.strategies.map(s => s.name);

    if (strategy.name && !existingNames.includes(strategy.name)) {
      this.strategies.unshift(strategy);
    }

    return this.strategies;
  }

  unregisterStrategy(strategy: Strategy): Strategy[] {
    this.strategies = this.strategies.filter(s => s !== strategy);
    return this.strategies;
  }

  private sortStrategy(): Strategy[] {
    return this.strategies.sort((a, b) => a.order - b.order);
  }

  private getItems(): MenuItemsResult {
    const app = (window as any).HSApp.App.getApp();
    const selectedEntities = app.selectionManager.selected(true);
    const is3DView = app.is3DView(app.activeView);

    const allItems = this.applyStrategies({
      entities: selectedEntities,
      app,
      is3D: is3DView
    });

    const customizedItemIds = [
      'newFaceGroupButton',
      'walldecorationAdvanced',
      'faceGroupButton',
      'faceunGroupButton',
      'groupButton',
      'customizedProductsEdit',
      'unGroupButton',
      'uploadGroupButton',
      'editFeatureWallButton',
      'saveCustomizedModelButton',
      'editMaterialButton'
    ];

    return {
      defaultItems: allItems.filter(item => !customizedItemIds.includes(item.id)),
      customizedItems: allItems.filter(item => customizedItemIds.includes(item.id))
    };
  }

  private applyStrategies(context: StrategyContext): MenuItem[] {
    const applicableStrategy = this.strategies.find(strategy => 
      strategy.isApplied(context.entities)
    );

    return applicableStrategy ? applicableStrategy.getItems(context) : [];
  }
}