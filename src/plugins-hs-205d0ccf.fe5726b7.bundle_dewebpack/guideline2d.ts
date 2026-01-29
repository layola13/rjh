interface MenuItem {
  // Define based on your menu item structure
  [key: string]: unknown;
}

interface CommonItems {
  getDeleteItem: (items: GuideLine2d[]) => MenuItem;
}

interface LeftMenuPlugin {
  commonItems?: CommonItems;
}

interface PluginManager {
  getPlugin(pluginType: string): LeftMenuPlugin | null;
}

interface App {
  pluginManager: PluginManager;
}

interface HSApp {
  App: {
    getApp(): App;
  };
}

declare const HSApp: HSApp;
declare const HSFPConstants: {
  PluginType: {
    LeftMenu: string;
  };
};

declare namespace HSCore.Model {
  class GuideLine2d {}
}

export const GuideLine2d = {
  name: "GuideLine2d",

  isApplied(items: unknown[]): boolean {
    return items.some((item) => {
      return item instanceof HSCore.Model.GuideLine2d;
    });
  },

  getItems(items: HSCore.Model.GuideLine2d[]): MenuItem[] {
    const menuItems: MenuItem[] = [];
    const plugin = HSApp.App.getApp().pluginManager.getPlugin(
      HSFPConstants.PluginType.LeftMenu
    );

    if (plugin?.commonItems) {
      const deleteItem = plugin.commonItems.getDeleteItem(items);
      menuItems.push(deleteItem);
    }

    return menuItems;
  },
};