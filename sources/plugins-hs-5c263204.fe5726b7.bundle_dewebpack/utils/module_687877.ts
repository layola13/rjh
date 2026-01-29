interface GuideProps {
  exitGuide: () => void;
  showGuide: () => void;
}

interface App {
  pluginManager: PluginManager;
}

interface PluginManager {
  getPlugin(type: string): GuidePlugin;
}

interface GuidePlugin {
  copyDesign(): void;
}

interface EventTrack {
  track(group: string, event: string): void;
  instance(): EventTrack;
}

interface Util {
  EventTrack: EventTrack;
  EventGroupEnum: {
    NewUserGuide: string;
  };
}

interface Config {
  TENANT: string;
}

interface HSAppGlobal {
  Config: Config;
  Util: Util;
  App: {
    getApp(): App;
  };
}

interface HSFPConstantsGlobal {
  PluginType: {
    Guide: string;
  };
}

interface ResourceManagerGlobal {
  getString(key: string): string;
}

declare const HSApp: HSAppGlobal;
declare const HSFPConstants: HSFPConstantsGlobal;
declare const ResourceManager: ResourceManagerGlobal;
declare const React: typeof import('react');

const TENANT_FP = 'fp';
const GUIDE_FP_CLASS = 'guide-fp';
const GUIDE_EZHOME_CLASS = 'guide-ezhome';
const NEW_USER_GUIDE_FINISH_EVENT = 'new_user_guide_finish_to_design_event';
const PLUGIN_GUIDE_LAUNCH_KEY = 'plugin_guide_launch';

/**
 * Guide component for displaying new user onboarding
 * @param props - Component properties
 * @returns React element for the guide overlay
 */
export default function Guide(props: GuideProps): React.ReactElement {
  const { exitGuide, showGuide } = props;
  
  const guideClass = HSApp.Config.TENANT === TENANT_FP 
    ? GUIDE_FP_CLASS 
    : GUIDE_EZHOME_CLASS;

  const handleClose = (): void => {
    exitGuide();
    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.NewUserGuide,
      NEW_USER_GUIDE_FINISH_EVENT
    );
  };

  const handleLaunch = (): void => {
    const app = HSApp.App.getApp();
    const guidePlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.Guide);
    guidePlugin.copyDesign();
    showGuide();
  };

  const launchButtonText = ResourceManager.getString(PLUGIN_GUIDE_LAUNCH_KEY);

  return React.createElement(
    'div',
    { className: 'guide-global' },
    React.createElement(
      'div',
      { className: 'popup' },
      React.createElement(
        'div',
        { className: 'content' },
        React.createElement(
          'div',
          { className: `guidebg ${guideClass}` },
          React.createElement('div', {
            className: 'guidebg-close-btn',
            onClick: handleClose
          }),
          React.createElement(
            'div',
            {
              className: 'guidebtn',
              onClick: handleLaunch
            },
            launchButtonText
          )
        )
      )
    )
  );
}