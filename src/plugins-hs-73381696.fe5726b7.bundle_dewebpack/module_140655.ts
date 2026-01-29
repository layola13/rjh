import { createLogData } from './module_858122';

interface MenuItem {
  id: string;
  label: string;
  order: number;
}

interface SubMenuItem {
  label: string;
}

interface ListenEventPayload {
  item: MenuItem;
  subItem?: SubMenuItem;
}

interface PluginManager {
  getPlugin(pluginType: string): LeftMenuPlugin;
}

interface LeftMenuPlugin {
  signalLeftMenuItemClick: unknown;
}

interface LogDataArgInfo {
  id: string;
  label: string;
  order: number;
  subLabel?: string;
}

interface ClicksRatio {
  id: string;
  name: string;
  subItem: {
    id: string;
    name: string;
  };
}

interface LogDataOptions {
  description: string;
  activeSection: string;
  type: string;
  argInfo: LogDataArgInfo;
  clicksRatio: ClicksRatio;
  isCumulatingTime: boolean;
}

interface ListenerConfig {
  getListenSignal(context: { pluginManager: PluginManager }): unknown;
  listen(event: ListenEventPayload): ReturnType<typeof createLogData>[];
}

const leftMenuListener: ListenerConfig[] = [
  {
    getListenSignal(context: { pluginManager: PluginManager }): unknown {
      return context.pluginManager.getPlugin(HSFPConstants.PluginType.LeftMenu).signalLeftMenuItemClick;
    },

    listen(event: ListenEventPayload): ReturnType<typeof createLogData>[] {
      const { item, subItem } = event;
      const { id, label, order } = item;
      const selectedEntitiesType = HSApp.Util.LoggerUtil.getSelectedEntitiesType();

      if (subItem) {
        const subLabel = subItem.label;
        return [
          createLogData(
            'click.leftMenu',
            {
              description: `点击左键菜单-${subLabel}`,
              activeSection: HSApp.Util.EventGroupEnum.Leftmenu,
              type: selectedEntitiesType,
              argInfo: {
                id,
                label,
                order,
                subLabel,
              },
              clicksRatio: {
                id: label,
                name: label,
                subItem: {
                  id: selectedEntitiesType,
                  name: selectedEntitiesType,
                },
              },
              isCumulatingTime: true,
            },
            false
          ),
        ];
      }

      return [
        createLogData(
          'click.leftMenu',
          {
            description: `点击左键菜单-${label}`,
            activeSection: HSApp.Util.EventGroupEnum.Leftmenu,
            type: selectedEntitiesType,
            argInfo: {
              id,
              label,
              order,
            },
            clicksRatio: {
              id: label,
              name: label,
              subItem: {
                id: selectedEntitiesType,
                name: selectedEntitiesType,
              },
            },
            isCumulatingTime: true,
          },
          false
        ),
      ];
    },
  },
];

export default leftMenuListener;