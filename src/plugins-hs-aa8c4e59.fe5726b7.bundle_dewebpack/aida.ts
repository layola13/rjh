import { forwardRef, useState, useImperativeHandle, ForwardedRef, ReactElement } from 'react';

interface AidaProps {
  visible?: boolean;
}

interface AidaHandle {
  show: () => boolean;
  hide: () => boolean;
}

interface PluginManager {
  getPlugin(pluginType: string): {
    openAIDA(mode: string): void;
  };
}

interface App {
  pluginManager: PluginManager;
}

interface HSAppInstance {
  getApp(): App;
}

declare global {
  interface Window {
    HSApp: {
      Config: {
        TENANT: string;
      };
      App: HSAppInstance;
    };
    HSFPConstants: {
      PluginType: {
        AIDA: string;
      };
    };
  }
}

const TENANT_FP = 'fp';
const AIDA_MODE_IMAGELIST = 'imagelist';

export const AIDA = forwardRef<AidaHandle, AidaProps>(
  (props: AidaProps, ref: ForwardedRef<AidaHandle>): ReactElement | null => {
    const [isVisible, setIsVisible] = useState<boolean>(props.visible ?? true);

    const iconSource: string = window.HSApp.Config.TENANT === TENANT_FP 
      ? require('./assets/icon-fp.svg').default 
      : require('./assets/icon-default.svg').default;

    useImperativeHandle(ref, () => ({
      show: (): boolean => {
        setIsVisible(true);
        return true;
      },
      hide: (): boolean => {
        setIsVisible(false);
        return false;
      }
    }));

    const handleClick = (): void => {
      const app = window.HSApp.App.getApp();
      const aidaPlugin = app.pluginManager.getPlugin(window.HSFPConstants.PluginType.AIDA);
      aidaPlugin.openAIDA(AIDA_MODE_IMAGELIST);
    };

    if (!isVisible) {
      return null;
    }

    return (
      <img
        className="aida-entry"
        src={iconSource}
        onClick={handleClick}
        alt="AIDA Entry"
      />
    );
  }
);

AIDA.displayName = 'AIDA';