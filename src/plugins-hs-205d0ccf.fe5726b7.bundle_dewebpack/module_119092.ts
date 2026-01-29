import { RemindSignalHandle } from './RemindSignalHandle';

interface MenuItem {
  id?: string;
  src?: string;
}

interface MenuItemClickEvent {
  item?: MenuItem;
}

interface RemindSignalConfig {
  key: string;
}

interface Plugin {
  signalLeftMenuItemClick?: unknown;
}

interface PluginManager {
  getPlugin(pluginType: string): Plugin | null | undefined;
}

interface App {
  pluginManager?: PluginManager;
}

interface HSAppGlobal {
  App: {
    getApp(): App | null | undefined;
  };
}

declare const HSApp: HSAppGlobal;
declare const HSFPConstants: {
  PluginType: {
    LeftMenu: string;
  };
};

interface SignalListener {
  getSignal(): unknown;
  listen(event: MenuItemClickEvent): RemindSignalConfig | undefined;
}

const REMIND_CONFIGS: Record<string, RemindSignalConfig | ((event: MenuItemClickEvent) => RemindSignalConfig)> = {
  toArcWallButton: (event: MenuItemClickEvent): RemindSignalConfig => {
    const itemSrc = event.item?.src;
    const actionType = itemSrc === "lineToCurvedwall1" ? "toarc" : "toline";
    return {
      key: `house.template.wall.${actionType}`
    };
  },
  selectMode: {
    key: "tpzzCabine.selectModel"
  },
  splitFloorBtn: {
    key: "house.template.floor.split"
  }
};

export default class CustomRemindSignalHandle extends RemindSignalHandle {
  getRemindSignalList(): SignalListener[] {
    return [
      {
        getSignal(): unknown {
          const app = HSApp.App.getApp();
          const plugin = app?.pluginManager?.getPlugin(HSFPConstants.PluginType.LeftMenu);
          return plugin?.signalLeftMenuItemClick;
        },
        listen(event: MenuItemClickEvent): RemindSignalConfig | undefined {
          const menuItemId = event.item?.id;
          if (!menuItemId) {
            return undefined;
          }
          
          const config = REMIND_CONFIGS[menuItemId];
          return typeof config === "function" ? config(event) : config;
        }
      }
    ];
  }
}