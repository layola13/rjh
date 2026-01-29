import { useState } from 'react';
import React from 'react';
import { IconfontView } from './IconfontView';

interface UserGuideFinisPopupProps {
  exitGuide: () => void;
}

interface QueryStrings {
  hasAssetId?: string;
  guide?: string;
  guidetype?: string;
  [key: string]: string | undefined;
}

interface HSPlugin {
  exitRenderEnvironment: () => void;
}

interface HSEnvironment {
  id: string;
}

interface HSPluginManager {
  getPlugin: (pluginName: string) => HSPlugin | null;
}

interface HSEnvironmentManager {
  activeEnvironment: HSEnvironment;
}

interface HSUrlUtil {
  getQueryStrings: () => QueryStrings;
  replaceParamsInUrl: (params: QueryStrings) => string;
  addWindowHistoryState: (key: string, value: string, url: string) => void;
}

interface HSUtilNamespace {
  Url: HSUrlUtil;
}

interface HSAppInstance {
  pluginManager: HSPluginManager;
  environmentManager: HSEnvironmentManager;
  newDocument: () => void;
}

interface HSAppNamespace {
  getApp: () => HSAppInstance;
}

interface HSConfig {
  EZHOME_HOST: string;
}

declare global {
  const ResourceManager: {
    getString: (key: string) => string;
  };
  const HSApp: {
    App: HSAppNamespace;
    Util: HSUtilNamespace;
    Config: HSConfig;
  };
}

export const UserGuideFinisPopup: React.FC<UserGuideFinisPopupProps> = ({ exitGuide }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleClose = (): void => {
    setIsVisible(false);
    setTimeout(() => {
      exitGuide();
    }, 10);
  };

  const handleCreateDesign = (): void => {
    const plugin = HSApp.App.getApp().pluginManager.getPlugin('hsw.plugin.render.Plugin');
    const activeEnvironmentId = HSApp.App.getApp().environmentManager.activeEnvironment.id;
    
    if (plugin && activeEnvironmentId === 'render') {
      plugin.exitRenderEnvironment();
    }

    const queryStrings = HSApp.Util.Url.getQueryStrings();
    const updatedParams: QueryStrings = {
      ...queryStrings,
      hasAssetId: '',
      guide: '',
      guidetype: ''
    };

    const newUrl = HSApp.Util.Url.replaceParamsInUrl(updatedParams);
    HSApp.Util.Url.addWindowHistoryState('hasAssetId', '', newUrl);
    HSApp.Util.Url.addWindowHistoryState('guide', '', newUrl);
    HSApp.Util.Url.addWindowHistoryState('guidetype', '', newUrl);
    
    HSApp.App.getApp().newDocument();
    handleClose();
  };

  const handleGoToHomestyler = (): void => {
    const newWindow = window.open(`https://${HSApp.Config.EZHOME_HOST}`, '_blank');
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  return (
    <div className={`guide-popup-mask ${isVisible ? '' : 'hidden'}`}>
      <div className="guide-popup-container">
        <div className="top-bg" />
        <div className="words-container">
          <div className="congratul">
            {ResourceManager.getString('userguide_congratul')}
          </div>
          <div className="desc">
            {ResourceManager.getString('userguide_desc')}
          </div>
        </div>
        <div className="card-wrapper">
          <div className="card" onClick={handleGoToHomestyler}>
            <div className="card-img home" />
            <div className="desc-words">
              <span className="words">
                {ResourceManager.getString('userguide_go_to_homestyler')}
              </span>
              <IconfontView
                customClass="iconfontview"
                showType="hs_xian_go"
                customStyle={{ fontSize: '18px' }}
              />
              <IconfontView
                customClass="iconfontview hover"
                showType="hs_xian_go"
                customStyle={{ fontSize: '18px', color: 'white' }}
              />
            </div>
          </div>
          <div className="card second" onClick={handleCreateDesign}>
            <div className="card-img design" />
            <div className="desc-words">
              <span className="words">
                {ResourceManager.getString('userguide_create_design')}
              </span>
              <IconfontView
                customClass="iconfontview"
                showType="hs_xian_go"
                customStyle={{ fontSize: '18px' }}
              />
              <IconfontView
                customClass="iconfontview hover"
                showType="hs_xian_go"
                customStyle={{ fontSize: '18px', color: 'white' }}
              />
            </div>
          </div>
        </div>
        <IconfontView
          iconOnclick={handleClose}
          customClass="guanbi-in-guide-popup"
          showType="hs_xian_guanbi"
          customBgStyle={{ color: '#1c1c1c', fontSize: '20px' }}
        />
      </div>
    </div>
  );
};