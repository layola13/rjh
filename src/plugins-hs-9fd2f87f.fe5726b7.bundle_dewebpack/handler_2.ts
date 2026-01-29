import { HSApp, HSCore, NWTK, adskUser, HSFPConstants } from './types';

interface EmergencyNoticeData {
  title: string;
  message: string;
  detailsUrl: string;
}

interface EmergencyNoticeMessage {
  id: number;
  status: string;
  title: string;
  message: string;
  detailsUrl: string;
  envList: string[];
  domains: string[];
  versions?: string[];
}

interface MessageEvent {
  data: EmergencyNoticeMessage;
}

interface EnvironmentChangedEvent {
  data: {
    newEnvironmentId: string;
  };
}

interface LoginEvent {
  data?: {
    isLogin: boolean;
  };
}

interface App {
  activeEnvironmentId: string;
  signalEnvironmentActivated: unknown;
}

interface MessageCenter {
  listen(messageType: string, callback: (event: MessageEvent) => void): void;
}

interface PluginMap {
  [HSFPConstants.PluginType.MessageCenter]: MessageCenter;
}

declare global {
  interface Window {
    publishVersion?: string;
  }
}

export class Handler {
  private root?: HTMLElement;
  private readonly messageType: string = 'UNIT_NOTICE';
  private currentMessage?: EmergencyNoticeMessage;
  private app?: App;
  private readonly storage: HSApp.Util.Storage;
  private readonly storageKey: string = 'WEBSOCKET_ID';

  constructor() {
    this.storage = new HSApp.Util.Storage(HSFPConstants.PluginType.EmergencyNoticePlugin);
  }

  public init(app: App, plugins: PluginMap): void {
    this.app = app;
    const messageCenter = plugins[HSFPConstants.PluginType.MessageCenter];
    
    new HSCore.Util.SignalHook(this)
      .listen(app.signalEnvironmentActivated, this.onActiveEnvironmentChanged)
      .listen(adskUser.signalLoginCompleted, this.logged);
    
    messageCenter.listen(this.messageType, this.listenMessage);
  }

  public getEmergencyNotice(): Promise<EmergencyNoticeMessage> {
    return NWTK.mtop.User.getEmergencyNotice()
      .then((response) => {
        const data = response.data;
        if (response && response.ret[0].includes('SUCCESS') && data) {
          return data || {};
        }
        return Promise.reject(data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  public logged = (event: LoginEvent): void => {
    if (HSApp.Config.TENANT !== 'fp' && event?.data?.isLogin) {
      this.getEmergencyNotice().then((message) => {
        this.currentMessage = message;
        this.controlNotice();
      });
    }
  };

  public onActiveEnvironmentChanged = (event: EnvironmentChangedEvent): void => {
    this.controlNotice(event.data.newEnvironmentId);
  };

  public controlNotice(environmentId: string = this.app?.activeEnvironmentId ?? ''): void {
    if (!this.currentMessage?.id) {
      return;
    }

    const { id, status, envList, domains, versions, title, message, detailsUrl } = this.currentMessage;
    const noticeData: EmergencyNoticeData = { title, message, detailsUrl };

    const shouldShow =
      (!window.publishVersion || versions?.includes(window.publishVersion)) &&
      this.checkDomain(domains) &&
      this.checkEnv(environmentId, envList) &&
      this.storage.get(this.storageKey) !== id &&
      status === 'online';

    if (shouldShow) {
      this.showNotice(noticeData);
    } else {
      this.hideNotice();
    }
  }

  private checkEnv(environmentId: string, envList: string[]): boolean {
    return envList.includes(environmentId) || 
           (environmentId.includes('tpzz') && envList.includes('tpzz-cabinet'));
  }

  private checkDomain(domains: string[]): boolean {
    const env = HSApp.Util.Url.getQueryStrings().env;
    return domains.includes('all') || 
           domains.includes(env) || 
           (!env && domains.includes('default'));
  }

  private showNotice(data: EmergencyNoticeData): void {
    let root = document.getElementsByClassName('emergency-notice-root')[0] as HTMLElement;
    
    if (!root) {
      root = document.createElement('div');
      root.className = 'emergency-notice-root';
      const header = document.getElementById('header');
      header?.parentElement?.insertBefore(root, header);
      this.root = root;
    } else {
      this.root = root;
    }

    ReactDOM.render(
      React.createElement(EmergencyNotice, {
        handleClose: this.handleClose,
        data: data
      }),
      this.root
    );
  }

  private listenMessage = (event: MessageEvent): void => {
    this.currentMessage = event;
    this.controlNotice();
  };

  private hideNotice = (): void => {
    if (this.root) {
      ReactDOM.unmountComponentAtNode(this.root);
    }
  };

  private handleClose = (): void => {
    if (this.currentMessage) {
      const messageId = this.currentMessage.id;
      this.storage.set(this.storageKey, messageId.toString());
      this.hideNotice();
    }
  };
}