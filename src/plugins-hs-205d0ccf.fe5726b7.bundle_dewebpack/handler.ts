interface Plugin {
  updateState(key: string, state: Record<string, unknown>): void;
  showShareCaseDialog(): void;
  execteActionWithCheckSavingStatus(callback: (result: boolean) => void): void;
  save(): Promise<boolean>;
}

interface PluginManager {
  getPlugin(pluginType: string): Plugin;
}

interface AppParams {
  assetId?: string;
}

interface App {
  pluginManager: PluginManager;
  appParams: AppParams;
}

interface HSAppConfig {
  TENANT: string;
}

interface HSAppInstance {
  Config: HSAppConfig;
  App: {
    getApp(): App;
  };
}

interface UtilLogger {
  error(error: unknown): void;
}

interface Util {
  logger: UtilLogger;
}

interface HSFPConstantsPluginType {
  PageHeader: string;
  Persistence: string;
  ShareCase: string;
}

interface HSFPConstants {
  PluginType: HSFPConstantsPluginType;
}

declare const ReactDOM: {
  unmountComponentAtNode(container: Element | null): void;
  render(element: unknown, container: Element | null): void;
};

declare const React: {
  createElement(component: unknown, props: null): unknown;
};

declare const HSApp: HSAppInstance;
declare const Util: Util;
declare const HSFPConstants: HSFPConstants;

export class Handler {
  /**
   * Hides the share case view by unmounting the React component
   */
  hideShareCaseView(): void {
    try {
      const popupContainer = document.querySelector(".popupcontainer");
      ReactDOM.unmountComponentAtNode(popupContainer);
    } catch (error) {
      Util.logger.error(error);
    }
  }

  /**
   * Shows the share case view by rendering the React component
   */
  showShareCaseView(): void {
    const popupContainer = document.querySelector(".popupcontainer");
    ReactDOM.render(React.createElement(null, null), popupContainer);
  }

  /**
   * Handles the share case functionality with different logic based on tenant type
   */
  shareCase(): void {
    if (HSApp.Config.TENANT === "fp") {
      const app = HSApp.App.getApp();
      const pageHeaderPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.PageHeader);
      pageHeaderPlugin.updateState("privacy", { isHover: true });
    } else {
      const app = HSApp.App.getApp();
      const persistencePlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.Persistence);
      const assetId = app.appParams.assetId;

      if (assetId) {
        persistencePlugin.execteActionWithCheckSavingStatus((result: boolean) => {
          if (result || assetId) {
            const shareCasePlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.ShareCase);
            shareCasePlugin.showShareCaseDialog();
          }
        });
      } else {
        persistencePlugin.save().then((saved: boolean) => {
          if (saved) {
            const shareCasePlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.ShareCase);
            shareCasePlugin.showShareCaseDialog();
          }
        });
      }
    }
  }
}