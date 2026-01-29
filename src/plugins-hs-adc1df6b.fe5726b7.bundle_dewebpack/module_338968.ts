interface UserInputPlugin {
  // Define based on actual usage
}

interface EventTrackInstance {
  track(group: string, eventName: string, data?: Record<string, unknown>): void;
}

interface Plugin {
  firstStepGuide?(): void;
  resetGuideStorage?(): void;
  showCardViewer?(): void;
  execteActionWithCheckSavingStatus?(callback: (success: boolean) => void): void;
  showModel?(theme: string): void;
  show?(index: number): void;
}

interface PluginManager {
  getPlugin(pluginType: string): Plugin | undefined;
}

interface App {
  pluginManager: PluginManager;
  isFloorplanDirty?: boolean;
}

interface ToolBarHelperParams {
  userInputPlugin: UserInputPlugin;
}

interface ToolBarHelper {
  eventTrack?: EventTrackInstance;
  userInputPlugin?: UserInputPlugin;
  setParams(params: ToolBarHelperParams): void;
  toolBar_quickguide_Click(): void;
  toolBar_operateguide_Click(): void;
  toolBar_guidNewVideo_Click(): void;
  toolBar_guidfordiy_Click(): void;
  toolBar_aboutus_Click(): void;
  toolBar_shortcut_Click(): void;
  toolBar_help_Click(): void;
}

declare const HSApp: {
  App: {
    getApp(): App;
  };
  Util: {
    EventTrack: {
      instance(): EventTrackInstance;
    };
    EventGroupEnum: {
      Pageheader: string;
      Toolbar: string;
    };
    Storage: new (key: string) => {
      set(key: string, value: string): void;
    };
  };
  Config: {
    TENANT: string;
  };
  PartnerConfig: {
    EZHOME_HELP_CENTER_VIDEOS?: string;
    USERCENTER_URL?: string;
    EZHOME_HELP_CENTER?: string;
  };
};

declare const HSFPConstants: {
  PluginType: {
    Guide: string;
    Persistence: string;
    UserSetting: string;
  };
};

declare const adskUser: {
  uid: string;
};

declare const ResourceManager: {
  getString(key: string): string;
};

declare const MessageBox: {
  create(
    content: string,
    buttons: string[],
    defaultIndex: number,
    options: { title: string; disablemask: boolean }
  ): {
    show(): void;
  };
};

const DESIGN_COUNT_KEY = 'designCount';
const DESIGN_COUNT_INITIAL_VALUE = 0;
const WELCOME_CONTAINER_SELECTOR = '.welcomecontainer';
const HELP_BAR_TUTORIAL_RED_DOT_KEY = 'helpbarTutorialRedDot';
const HELP_BAR_TUTORIAL_RED_DOT_VALUE = 'hide';
const PERSISTENCE_STORAGE_KEY = 'hsw.ezhome.plugin.persistence';
const USER_GUIDE_PLUGIN_NAME = 'hsw.plugin.userguide.Plugin';
const HOTKEY_MODEL_PLUGIN_NAME = 'hsw.plugin.hotkeyModel.Plugin';
const TENANT_FP = 'fp';
const WINDOW_FEATURES = 'noopener=yes, noreferrer=yes';
const HELP_CENTER_DEFAULT_URL = 'https://learn.homestyler.com/video/';
const THEME_LIGHT = 'light';
const USER_SETTING_TAB_INDEX = 0;
const MESSAGE_BOX_DEFAULT_BUTTON_INDEX = 0;

const toolBarHelper: ToolBarHelper = {
  setParams(params: ToolBarHelperParams): void {
    this.eventTrack = HSApp.Util.EventTrack.instance();
    this.userInputPlugin = params.userInputPlugin;
  },

  toolBar_quickguide_Click(): void {
    const app = HSApp.App.getApp();
    const isFPTenant = HSApp.Config.TENANT === TENANT_FP;

    const restartGuideInCurrentPage = (): void => {
      const guidePlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.Guide);
      if (guidePlugin) {
        localStorage.designCount = String(DESIGN_COUNT_INITIAL_VALUE);
        const welcomeContainer = document.querySelector(WELCOME_CONTAINER_SELECTOR) as HTMLElement;
        if (welcomeContainer) {
          welcomeContainer.style.display = 'none';
        }
        guidePlugin.firstStepGuide?.();

        const eventTrack = HSApp.Util.EventTrack.instance();
        const userId = adskUser.uid;
        eventTrack.track(HSApp.Util.EventGroupEnum.Pageheader, 'newguide_restart_new_user_guide_event', {
          userID: `${userId}`
        });
      }
    };

    const redirectToGuideRestart = (): void => {
      const currentLocation = window.location;
      currentLocation.replace(`${currentLocation.origin}/?guide=restart`);
    };

    if (app.isFloorplanDirty) {
      const persistencePlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.Persistence);
      persistencePlugin?.execteActionWithCheckSavingStatus?.((saved: boolean) => {
        if (saved) {
          isFPTenant ? redirectToGuideRestart() : restartGuideInCurrentPage();
        }
      });
    } else {
      isFPTenant ? redirectToGuideRestart() : restartGuideInCurrentPage();
    }
  },

  toolBar_operateguide_Click(): void {
    this.eventTrack?.track(HSApp.Util.EventGroupEnum.Toolbar, 'toolbar_help_active_tips_event');
    const userGuidePlugin = HSApp.App.getApp().pluginManager.getPlugin(USER_GUIDE_PLUGIN_NAME);
    userGuidePlugin?.resetGuideStorage?.();
    userGuidePlugin?.showCardViewer?.();
  },

  toolBar_guidNewVideo_Click(): void {
    let targetUrl = HSApp.PartnerConfig.EZHOME_HELP_CENTER_VIDEOS;

    if (HSApp.Config.TENANT === TENANT_FP) {
      const storage = new HSApp.Util.Storage(PERSISTENCE_STORAGE_KEY);
      storage.set(HELP_BAR_TUTORIAL_RED_DOT_KEY, HELP_BAR_TUTORIAL_RED_DOT_VALUE);
      targetUrl = `${HSApp.PartnerConfig.USERCENTER_URL}/learn/get-started`;
    }

    if (targetUrl) {
      window.open(targetUrl, '_blank', WINDOW_FEATURES);
    }
  },

  toolBar_guidfordiy_Click(): void {
    HSApp.Util.EventTrack.instance().track(HSApp.Util.EventGroupEnum.Toolbar, 'help_update_log_event');
    const helpCenterUrl = HSApp.PartnerConfig.EZHOME_HELP_CENTER ?? HELP_CENTER_DEFAULT_URL;
    window.open(helpCenterUrl, '_blank', WINDOW_FEATURES);
  },

  toolBar_aboutus_Click(): void {
    const descriptionText = ResourceManager.getString('toolbar_help_aboutus_description');
    const copyrightText = ResourceManager.getString('toolbar_help_aboutus_copyright');
    const closeButtonText = ResourceManager.getString('toolbar_help_aboutus_close');
    const titleText = ResourceManager.getString('toolbar_help_aboutus');

    const content = `<div>
 <p className='about-us-content'>${descriptionText}</p>
 <p className='about-us-content'>${copyrightText}</p>
 </div>`;

    MessageBox.create(content, [closeButtonText], MESSAGE_BOX_DEFAULT_BUTTON_INDEX, {
      title: titleText,
      disablemask: false
    }).show();
  },

  toolBar_shortcut_Click(): void {
    HSApp.App.getApp().pluginManager.getPlugin(HOTKEY_MODEL_PLUGIN_NAME)?.showModel?.(THEME_LIGHT);
  },

  toolBar_help_Click(): void {
    HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.UserSetting)?.show?.(USER_SETTING_TAB_INDEX);
  }
};

export default toolBarHelper;