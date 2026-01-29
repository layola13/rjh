import { Util as HSAppUtil, Plugin as HSAppPlugin, PartnerConfig, Config, appParams } from './hsapp';
import { Util as HSCoreUtil } from './hscore';
import { ajax } from './nwtk';

interface SigninedUser {
  [key: string]: unknown;
}

interface SignalPayload {
  name: string;
  isNotResetParams?: boolean;
  partner?: boolean;
}

interface LoginSuccessData {
  token: string;
}

interface LogoutResponseData {
  er: number;
  [key: string]: unknown;
}

interface MessageEventData {
  eType?: string;
  eData?: {
    token?: string;
    [key: string]: unknown;
  };
}

interface PluginConfig {
  name: string;
  description: string;
  dependencies: unknown[];
}

interface SigninSignals {
  signalSigninShown: HSCoreUtil.Signal<SignalPayload>;
  signalSubmitClicked: HSCoreUtil.Signal<unknown>;
  signalSigninSucceeded: HSCoreUtil.Signal<unknown>;
  signalSignoutSucceeded: HSCoreUtil.Signal<unknown>;
  signalSignoutClicked: HSCoreUtil.Signal<unknown>;
}

interface PromiseResolver {
  _resolve?: (value?: unknown) => void;
  _reject?: (reason?: unknown) => void;
}

declare const HSApp: {
  Util: {
    Core: {
      define: (name: string) => typeof PluginNamespace;
    };
    Storage: new (key: string) => Storage;
    Url: {
      addParams: (url: string, params: Record<string, unknown>) => string;
    };
  };
  Plugin: {
    IPlugin: new (...args: unknown[]) => IPlugin;
    registerPlugin: (name: string, plugin: typeof SigninPlugin) => void;
  };
  PartnerConfig: {
    ENABLE_FIRST_SAVE_SURVEY?: boolean;
    FIRST_SAVE_NOT_SIGNIN_SURVEY?: string;
    LOGIN_URL?: string;
    PASSPORT_SERVER?: string;
  };
  Config: {
    LOGIN_URL: string;
    TENANT?: string;
  };
  appParams: {
    tenant?: string;
  };
};

declare const HSCore: {
  Util: {
    Signal: new <T = unknown>() => Signal<T>;
  };
};

declare const adskUser: {
  checkLogin: (token: string) => void;
  logOut: () => Promise<unknown>;
  cleanUserData: () => void;
  init: () => void;
  sid?: string;
};

interface Storage {
  clear: (key: string) => void;
  get: (key: string) => SigninedUser | null;
  set: (key: string, value: SigninedUser) => void;
}

interface Signal<T = unknown> {
  dispatch: (data: T) => void;
}

interface IPlugin {
  name: string;
  description: string;
  dependencies: unknown[];
}

interface App {
  appParams: {
    tenant?: string;
  };
  hotkey: {
    registerHotkey: (key: string, callback: () => void) => void;
    unregisterHotkey: (key: string, callback: () => void) => void;
  };
}

interface OnActiveParams {
  app: App;
}

const MODAL_HTML = `
  <div class="signinpopup"></div>
  <div class="md-modal md-effect-1 md-modal-l md-effect-1-l user-modal" style="left: 442px;">
    <div class="md-modal-dialog">
      <div class="md-modal-content clearfix">
        <h2 class="md-modal-title"></h2>
      </div>
      <div class="md-modal-body"></div>
    </div>
  </div>
`;

const LOGOUT_DELAY_MS = 1000;
const TENANT_FP = 'fp';

const PluginNamespace = HSApp.Util.Core.define('hsw.plugin.signin');

class SigninPlugin extends HSApp.Plugin.IPlugin {
  private localStorage!: Storage;
  private signals!: SigninSignals;

  constructor() {
    super({
      name: 'Sign in/Register Plugin',
      description: 'Sign in/Register',
      dependencies: []
    } as PluginConfig);
  }

  onActive(params: OnActiveParams): void {
    const { app } = params;
    
    this.localStorage = new HSApp.Util.Storage('hsw.plugin.signin');
    
    this.signals = {
      signalSigninShown: new HSCore.Util.Signal<SignalPayload>(),
      signalSubmitClicked: new HSCore.Util.Signal<unknown>(),
      signalSigninSucceeded: new HSCore.Util.Signal<unknown>(),
      signalSignoutSucceeded: new HSCore.Util.Signal<unknown>(),
      signalSignoutClicked: new HSCore.Util.Signal<unknown>()
    };
    
    PluginNamespace.Handler.init(app, this.signals);
  }

  clearStorage(): void {
    this.localStorage.clear('signinedUser');
  }

  getStorage(): SigninedUser | null {
    return this.localStorage.get('signinedUser');
  }

  appendStorage(key: string, value: unknown): void {
    let userData = this.getStorage();
    
    if (userData) {
      userData[key] = value;
    } else {
      userData = { [key]: value };
    }
    
    this.localStorage.set('signinedUser', userData);
  }

  onDeactive(): void {
    // Cleanup logic can be added here
  }

  openwindow(name: string): void {
    PluginNamespace.UI.openwindow(name);
  }

  closewindow(): void {
    PluginNamespace.UI.closewindow();
  }

  getUserSession(): Promise<typeof adskUser> {
    return PluginNamespace.Handler._sessionPromise
      ? PluginNamespace.Handler._sessionPromise.then(() => adskUser)
      : Promise.reject('session is not ready');
  }
}

HSApp.Plugin.registerPlugin('hsw.plugin.signin.Plugin', SigninPlugin);

PluginNamespace.UI = {
  myforms: {
    signin: 'signinform',
    singintaobaoform: 'singintaobaoform',
    signup: 'signupform',
    forgotpw: 'forgotpwform'
  },
  
  targetElement: undefined as JQuery | undefined,
  Signals: undefined as SigninSignals | undefined,
  app: undefined as App | undefined,
  _onClosewindow: undefined as (() => void) | undefined,

  init(app: App, signals: SigninSignals, resolver: PromiseResolver): void {
    this.Signals = signals;
    this.app = app;

    $('#plugin-container').append(MODAL_HTML);
    this.targetElement = $('#plugin-container').find('.user-modal');

    $('#loginFrame').on('load', () => {
      $('#loginFrame').off('load');
      resolver._resolve?.();
    });

    this._onClosewindow = () => {
      this.closewindow();
      
      if (HSApp.PartnerConfig.ENABLE_FIRST_SAVE_SURVEY && window.localStorage) {
        const firstSaveTime = window.localStorage.getItem('firstSaveSuccessfullyTime');
        const surveyUrl = HSApp.PartnerConfig.FIRST_SAVE_NOT_SIGNIN_SURVEY;
        
        if (!firstSaveTime && surveyUrl) {
          window.open(surveyUrl, '_blank', 'noopener=yes, noreferrer=yes');
        }
      }
    };

    this.targetElement.on('click', '.close-btn a', this._onClosewindow);
  },

  openwindow(name: string, isNotResetParams?: boolean): void {
    const payload: SignalPayload = {
      name,
      isNotResetParams
    };

    PluginNamespace.UI.Signals?.signalSigninShown.dispatch(payload);

    if (!payload.partner) {
      const loginUrl = HSApp.PartnerConfig.LOGIN_URL || HSApp.Config.LOGIN_URL;
      const urlWithParams = HSApp.Util.Url.addParams(loginUrl, {
        t: new Date().getTime(),
        tenant: this.app?.appParams.tenant
      });
      
      $('.user-modal .md-modal-body #loginFrame').attr('src', urlWithParams);
    }

    this.targetElement?.addClass('md-show');
    
    const leftPosition = ($(window).width()! - this.targetElement!.width()!) / 2;
    this.targetElement?.css('left', leftPosition);

    $('.user-overlay').on('click', this._onClosewindow!);
    this.app?.hotkey.registerHotkey('esc', this._onClosewindow!);
  },

  closewindow(): boolean {
    $('.signinpopup').css('display', 'none');
    PluginNamespace.UI.targetElement?.removeClass('md-show');
    $('.user-overlay').off('click');
    
    if (PluginNamespace.UI.app && PluginNamespace.UI._onClosewindow) {
      PluginNamespace.UI.app.hotkey.unregisterHotkey('esc', PluginNamespace.UI._onClosewindow);
    }
    
    return false;
  }
};

PluginNamespace.Handler = {
  _sessionPromise: undefined as Promise<unknown> | undefined,

  init(app: App, signals: SigninSignals): void {
    const resolver: PromiseResolver = {};
    
    this._sessionPromise = new Promise<unknown>((resolve, reject) => {
      resolver._resolve = resolve;
      resolver._reject = reject;
    });

    window.addEventListener('message', (event: MessageEvent<MessageEventData>) => {
      const { eType, eData } = event.data;
      
      if (!eType || !eData) {
        return;
      }

      switch (eType) {
        case 'logInSuccess':
          if (eData.token) {
            adskUser.checkLogin(eData.token);
          }
          break;
          
        case 'logOutSuccess':
          adskUser.logOut()
            .then(() => {
              adskUser.cleanUserData();
            })
            .catch(() => {
              adskUser.cleanUserData();
            });
          break;
      }
    }, false);

    PluginNamespace.UI.init(app, signals, resolver);

    Promise.resolve().then(() => {
      adskUser.init();
    });
  },

  signoutrequest(): Promise<LogoutResponseData | void> {
    if (HSApp.Config.TENANT === TENANT_FP) {
      const logoutUrl = `${HSApp.PartnerConfig.PASSPORT_SERVER}api/rest/v1.0/tenant/fp/logout`;
      
      return ajax.post<LogoutResponseData>(logoutUrl, {
        extra: adskUser.sid
      }, {
        headers: {
          'x-ums-id': adskUser.sid
        }
      }).then(
        (response) => {
          return response.er === -1 ? response : Promise.reject(response);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    }

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, LOGOUT_DELAY_MS);
    });
  }
};