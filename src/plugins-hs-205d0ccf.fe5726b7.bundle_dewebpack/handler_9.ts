import React, { createRef, RefObject } from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { ImageBrowserLite } from './ImageBrowserLite';
import { userTrackId, rootDivId } from './constants';
import { LogTriggerType } from './LogTriggerType';

interface PluginMap {
  [HSFPConstants.PluginType.Catalog]: CatalogPlugin;
  [HSFPConstants.PluginType.LeftMenu]: MenuPlugin;
  [HSFPConstants.PluginType.UserInfo]: UserInfoPlugin;
}

interface CatalogPlugin {
  toggleCatalog(visible: boolean): void;
}

interface MenuPlugin {
  disableLeftMenu(): void;
  enableLeftMenu(): void;
}

interface UserInfoPlugin {
  setTheme(theme: 'black' | 'light'): void;
  getUpdateUserInfoSignal(): { dispatch(data: Record<string, unknown>): void };
}

interface SparkPicPlugin {
  hideAppContainer(): void;
  showAppContainer(): void;
}

interface EnvironmentManager {
  setActiveScope?(scope: string): void;
}

interface PluginManager {
  getPlugin(pluginType: string): SparkPicPlugin | null;
}

interface SelectionManager {
  unselectAll(): void;
}

interface UserTrackLogger {
  push(
    trackId: string,
    data: {
      description: string;
      group: string;
      param: Record<string, unknown>;
    },
    options: { triggerType: LogTriggerType }
  ): void;
}

interface AppInstance {
  environmentManager: EnvironmentManager;
  activeEnvironmentId: string;
  pluginManager: PluginManager;
  selectionManager: SelectionManager;
  userTrackLogger: UserTrackLogger;
}

interface ImageListRef {
  setDefaultTask(task: unknown): void;
  disableView(disabled: boolean): void;
}

interface ImageBrowserLiteProps {
  handleClick: (task: unknown) => void;
  [key: string]: unknown;
}

declare const HSApp: {
  App: {
    getApp(): AppInstance;
  };
};

declare const HSFPConstants: {
  EnvScope: {
    SparkPicImage: string;
  };
  Environment: {
    Default: string;
  };
  PluginType: {
    Catalog: string;
    LeftMenu: string;
    UserInfo: string;
    SparkPic: string;
  };
  LogGroupTypes: {
    SparkPicAlbum: string;
  };
};

declare const LiveHint: {
  changeZIndex(zIndex: number): void;
};

export class Handler {
  private _app: AppInstance;
  private _catalogPlugin?: CatalogPlugin;
  private _menuPlugin?: MenuPlugin;
  private _userInfoPlugin?: UserInfoPlugin;
  public imageListRef?: RefObject<ImageListRef>;

  constructor() {
    this._app = HSApp.App.getApp();
  }

  /**
   * Initialize the handler with required plugins
   */
  init(plugins: PluginMap): void {
    this._catalogPlugin = plugins[HSFPConstants.PluginType.Catalog];
    this._menuPlugin = plugins[HSFPConstants.PluginType.LeftMenu];
    this._userInfoPlugin = plugins[HSFPConstants.PluginType.UserInfo];

    $('#plugin-container').append(`<div id="${rootDivId}"></div>`);

    const imageDetailDiv = document.createElement('div');
    imageDetailDiv.className = 'image-detail';
    document.getElementById(rootDivId)?.appendChild(imageDetailDiv);

    const browserDiv = document.createElement('div');
    browserDiv.className = 'spark-pic-image-browser';
    document.getElementById(rootDivId)?.appendChild(browserDiv);

    this.imageListRef = createRef<ImageListRef>();

    ReactDOM.render(
      React.createElement(App, {
        quitImageList: this.quitImageList,
        ref: this.imageListRef,
      }),
      browserDiv
    );
  }

  /**
   * Clean up when deactivating
   */
  onDeactive(): void {
    const rootElement = document.getElementById(rootDivId);
    if (rootElement) {
      ReactDOM.unmountComponentAtNode(rootElement);
    }
  }

  /**
   * Open the image list with the specified task
   */
  openImageList = (task: unknown): void => {
    const envManager = this._app.environmentManager;
    envManager.setActiveScope?.(HSFPConstants.EnvScope.SparkPicImage);

    if (this._app.activeEnvironmentId === HSFPConstants.Environment.Default) {
      this._catalogPlugin?.toggleCatalog(false);
    } else {
      const sparkPicPlugin = this._app.pluginManager.getPlugin(
        HSFPConstants.PluginType.SparkPic
      );
      sparkPicPlugin?.hideAppContainer();
    }

    this.imageListRef?.current?.setDefaultTask(task);
    this.imageListRef?.current?.disableView(false);
    this._menuPlugin?.disableLeftMenu();
    this._app.selectionManager.unselectAll();
    this._userInfoPlugin?.setTheme('black');
    this._userInfoPlugin?.getUpdateUserInfoSignal().dispatch({});

    HSApp.App.getApp().userTrackLogger.push(
      userTrackId,
      {
        description: '进入灵图集',
        group: HSFPConstants.LogGroupTypes.SparkPicAlbum,
        param: {
          env: this._app.activeEnvironmentId,
        },
      },
      {
        triggerType: LogTriggerType.START,
      }
    );

    LiveHint.changeZIndex(6011);
  };

  /**
   * Close the image list and restore previous state
   */
  quitImageList = (): void => {
    if (this._app.activeEnvironmentId === HSFPConstants.Environment.Default) {
      this._userInfoPlugin?.setTheme('light');
      this._userInfoPlugin?.getUpdateUserInfoSignal().dispatch({});
      this._catalogPlugin?.toggleCatalog(true);
    } else {
      const sparkPicPlugin = this._app.pluginManager.getPlugin(
        HSFPConstants.PluginType.SparkPic
      );
      sparkPicPlugin?.showAppContainer();
    }

    const envManager = this._app.environmentManager;
    envManager.setActiveScope?.('');
    this._menuPlugin?.enableLeftMenu();

    HSApp.App.getApp().userTrackLogger.push(
      userTrackId,
      {
        description: '退出灵图集',
        group: HSFPConstants.LogGroupTypes.SparkPicAlbum,
        param: {
          env: this._app.activeEnvironmentId,
        },
      },
      {
        triggerType: LogTriggerType.END,
      }
    );
  };

  /**
   * Render image browser lite component
   */
  imageBrowserLite(props: Omit<ImageBrowserLiteProps, 'handleClick'>): React.ReactElement {
    return React.createElement(ImageBrowserLite, {
      ...props,
      handleClick: this.openImageList,
    });
  }
}