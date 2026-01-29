interface MenuItem {
  name: string;
  type: 'folder' | 'button' | 'divider';
  order: number;
  icon?: string;
  label?: string;
  submenu?: MenuItem[];
  onclick?: () => void;
  disable?: boolean;
}

interface PluginManager {
  getPlugin(pluginType: string): {
    show(index: number): void;
  };
}

interface App {
  getApp(): {
    pluginManager: PluginManager;
  };
}

interface Config {
  TENANT: string;
}

interface PartnerConfig {
  USERCENTER_URL: string;
}

interface EventTrack {
  instance(): {
    track(group: string, event: string): void;
  };
}

interface Util {
  EventTrack: EventTrack;
  EventGroupEnum: {
    Toolbar: string;
  };
}

declare const HSApp: {
  Config: Config;
  App: App;
  PartnerConfig: PartnerConfig;
  Util: Util;
};

declare const HSFPConstants: {
  PluginType: {
    UserSetting: string;
  };
};

declare const ResourceManager: {
  getString(key: string): string;
};

export default function(): MenuItem[] {
  return [
    {
      name: 'toolBar_help',
      type: 'folder',
      order: 1000,
      icon: 'res/ImgHelpbar/help.svg',
      label: HSApp.Config.TENANT !== 'fp' ? 'toolbar_help_label' : '',
      submenu: [
        {
          label: 'toolbar_preferences',
          name: 'toolbar_preferences',
          type: 'button',
          order: 100,
          onclick: function(): void {
            HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.UserSetting).show(0);
          }
        },
        {
          name: 'toolBar_help_divider1',
          type: 'divider',
          order: 300
        },
        {
          name: 'toolBar_shortcut',
          type: 'button',
          order: 300,
          label: 'toolbar_hotkeys'
        },
        {
          label: ResourceManager.getString('toolbar_help_center'),
          name: 'toolbar_help_center',
          order: 350,
          disable: HSApp.Config.TENANT !== 'fp',
          onclick: function(): void {
            const url = `${HSApp.PartnerConfig.USERCENTER_URL}/learn-help`;
            window.open(url);
            HSApp.Util.EventTrack.instance().track(HSApp.Util.EventGroupEnum.Toolbar, 'toolbar_help_center_event');
          }
        },
        {
          name: 'toolBar_help_divider2',
          type: 'divider',
          order: 600
        },
        {
          name: 'toolBar_guidfordiy',
          type: 'button',
          order: 700,
          label: 'toolbar_help_update_log'
        },
        {
          name: 'toolBar_aboutus',
          type: 'button',
          order: 800,
          label: 'toolbar_help_aboutus'
        }
      ]
    }
  ];
}