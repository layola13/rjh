import React from 'react';
import { useTheme } from './theme';
import Icon from './Icon';

interface UserGuideProps {
  className?: string;
  userGuideCallback?: () => void;
}

interface HSApp {
  App: {
    getApp(): AppInstance;
  };
  UI: {
    FullScreenLoading: {
      show(message: string): void;
      hide(): void;
    };
  };
  Util: {
    Url: {
      replaceParamsInUrl(params: Record<string, string>): string;
      deleteParamInUrl(url: string, param: string): string;
      addParams(url: string, params: Record<string, unknown>): string;
    };
  };
}

interface AppInstance {
  pluginManager: PluginManager;
  isFloorplanDirty: boolean;
}

interface PluginManager {
  getPlugin(pluginType: string): Plugin;
}

interface Plugin {
  copyDesign(): Promise<string>;
  execteActionWithCheckSavingStatus(callback: (result: boolean) => void): void;
}

interface HSFPConstants {
  PluginType: {
    Guide: string;
    Persistence: string;
  };
}

interface ResourceManager {
  getString(key: string): string;
}

declare const HSApp: HSApp;
declare const HSFPConstants: HSFPConstants;
declare const ResourceManager: ResourceManager;

export const UserGuide: React.FC<UserGuideProps> = (props) => {
  const { className, userGuideCallback } = props;
  const theme = useTheme();

  const handleClick = async (): Promise<void> => {
    if (userGuideCallback) {
      userGuideCallback();
      return;
    }

    const app = HSApp.App.getApp();

    const executeGuideRestart = async (): Promise<void> => {
      const guidePlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.Guide);
      
      HSApp.UI.FullScreenLoading.show(
        ResourceManager.getString("autoRecommend_loading")
      );

      let assetId = "";
      
      try {
        assetId = await guidePlugin.copyDesign();
      } catch (error) {
        // Error handled silently
      } finally {
        HSApp.UI.FullScreenLoading.hide();
      }

      let url = HSApp.Util.Url.replaceParamsInUrl({ assetId: "" });
      
      const hasAssetId = Boolean(assetId);
      const guideParams = {
        assetId: assetId,
        hasAssetId: hasAssetId,
        guide: "restart",
        guidetype: "mask"
      };

      url = HSApp.Util.Url.deleteParamInUrl(url, "taskcode");
      url = HSApp.Util.Url.addParams(url, guideParams);
      
      location.replace(url);
    };

    if (app.isFloorplanDirty) {
      const persistencePlugin = app.pluginManager.getPlugin(
        HSFPConstants.PluginType.Persistence
      );
      
      persistencePlugin.execteActionWithCheckSavingStatus((shouldProceed) => {
        if (shouldProceed) {
          executeGuideRestart();
        }
      });
    } else {
      await executeGuideRestart();
    }
  };

  return (
    <div className={`${className || ""} user-guide ${theme}`}>
      <div className="user-guide-item" onClick={handleClick}>
        <span className="text">
          {ResourceManager.getString("toolbar_help_interface")}
        </span>
        <Icon
          style={{ fontSize: 16 }}
          type="hs_xiao_danjiantou_you"
        />
      </div>
    </div>
  );
};