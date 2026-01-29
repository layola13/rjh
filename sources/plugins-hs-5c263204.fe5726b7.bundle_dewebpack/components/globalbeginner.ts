import React, { Component } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface GlobalBeginnerProps {
  size: string;
  onCloseHandler: () => void;
}

interface GlobalBeginnerState {
  visible: boolean;
  loading: boolean;
}

interface MessageEventData {
  eType: string;
  eData?: {
    approveUrl?: string;
    purpose?: string;
  };
}

interface QueryStrings {
  guide?: string;
  hasAssetId?: string;
  guidetype?: string;
}

interface PluginManager {
  getPlugin: (pluginType: string) => any;
}

interface HSAppInstance {
  pluginManager: PluginManager;
}

declare global {
  interface Window {
    HSApp: {
      App: {
        getApp: () => HSAppInstance;
      };
      Config: {
        EZHOME_HOST: string;
      };
      Util: {
        Url: {
          getQueryStrings: () => QueryStrings;
          replaceParamsInUrl: (params: QueryStrings) => string;
          addWindowHistoryState: (key: string, value: string, url: string) => void;
        };
      };
    };
    HSFPConstants: {
      PluginType: {
        Guide: string;
        Welcome: string;
        Persistence: string;
      };
    };
    adskUser: {
      userIdentity?: string;
      uid: string;
      sid: string;
    };
    $: {
      cookie: (name: string, value: string, options: { expires: number; domain: string }) => void;
    };
  }
}

const LOADING_TIMEOUT = 2000;
const CLICK_DELAY = 10;

const loadingIndicator = (
  <LoadingOutlined
    style={{ fontSize: 48 }}
    spin={true}
  />
);

export class GlobalBeginner extends Component<GlobalBeginnerProps, GlobalBeginnerState> {
  constructor(props: GlobalBeginnerProps) {
    super(props);
    this.state = {
      visible: true,
      loading: true,
    };
  }

  componentDidMount(): void {
    window.addEventListener('message', this.messageListener, false);
    setTimeout(() => {
      this.onLoad();
    }, LOADING_TIMEOUT);
  }

  componentWillUnmount(): void {
    window.removeEventListener('message', this.messageListener, false);
  }

  private messageListener = (event: MessageEvent<MessageEventData>): void => {
    if (!event.data) {
      return;
    }

    const { eType, eData } = event.data;

    switch (eType) {
      case 'closeIframe':
        this.hide();
        break;
      case 'openPayUrl':
        if (eData?.approveUrl) {
          window.$.cookie('paidSuccessOpenPopup', 'beginnerPopup', {
            expires: 1,
            domain: '.homestyler.com',
          });
          location.href = eData.approveUrl;
        }
        break;
      case 'newDocument':
        this.newDocument();
        break;
      case 'startGuide':
        this.startGuideNoRefresh(eData);
        break;
    }
  };

  private newDocument(): void {
    this.hide();

    const backButton = document.querySelector<HTMLElement>(
      '#renderImageBrowser .ribpCommonHeader .back-button'
    );
    backButton?.click();

    setTimeout(() => {
      const backContainer = document.querySelector<HTMLElement>(
        '#renderImageBrowser .ribpGridHeader .back-container'
      );
      backContainer?.click();
    }, CLICK_DELAY);

    const app = window.HSApp.App.getApp();
    const renderPlugin = app.pluginManager.getPlugin('hsw.plugin.render.Plugin');
    renderPlugin?.exitRenderEnvironment();

    const welcomePlugin = app.pluginManager.getPlugin(
      window.HSFPConstants.PluginType.Welcome
    );
    if (welcomePlugin) {
      welcomePlugin.close();
      welcomePlugin.showWelcomeTemplate();
    }

    const urlParams: QueryStrings = {
      guide: '',
      hasAssetId: '',
    };
    const newUrl = window.HSApp.Util.Url.replaceParamsInUrl(urlParams);
    window.HSApp.Util.Url.addWindowHistoryState('newdesign', '', newUrl);
  }

  private async startGuideNoRefresh(eventData?: { purpose?: string }): Promise<void> {
    const app = window.HSApp.App.getApp();
    const guidePlugin = app.pluginManager.getPlugin(
      window.HSFPConstants.PluginType.Guide
    );

    if (!window.adskUser.userIdentity && eventData?.purpose) {
      window.adskUser.userIdentity = eventData.purpose;
    }

    let queryStrings = window.HSApp.Util.Url.getQueryStrings();
    queryStrings = Object.assign(queryStrings, {
      guide: 'restart',
      hasAssetId: 'true',
      guidetype: 'tip',
    });

    const newUrl = window.HSApp.Util.Url.replaceParamsInUrl(queryStrings);
    window.HSApp.Util.Url.addWindowHistoryState('guidetype', 'tip', newUrl);

    const designData = await guidePlugin.copyDesign(true);

    const persistencePlugin = app.pluginManager.getPlugin(
      window.HSFPConstants.PluginType.Persistence
    );
    persistencePlugin?.OpenDesignHandler.loadDesignData(
      designData,
      window.adskUser.sid
    );

    this.hide();
    guidePlugin.restartGuide();
  }

  private show(): void {
    this.setState({ visible: true });
  }

  private hide(): void {
    this.setState({ visible: false });
    this.props.onCloseHandler();
  }

  private onLoad = (): void => {
    this.setState({ loading: false });
  };

  render(): React.ReactNode {
    const { visible, loading } = this.state;
    const iframeUrl = `https://${window.HSApp.Config.EZHOME_HOST}/beginnerguide?source=3d&screen=${this.props.size}&uid=${window.adskUser.uid}`;

    if (!visible) {
      return null;
    }

    return (
      <div className={`beginner-iframe-wrapper ${this.props.size}`}>
        {loading && (
          <div className="beginner-loading-wrapper">
            <Spin size="large" indicator={loadingIndicator} spinning={loading} />
          </div>
        )}
        <iframe
          className="beginner-iframe"
          src={iframeUrl}
          onError={this.onLoad}
          onLoad={this.onLoad}
        />
      </div>
    );
  }
}