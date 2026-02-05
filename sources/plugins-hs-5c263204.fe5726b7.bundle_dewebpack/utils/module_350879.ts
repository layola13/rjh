// @ts-nocheck
import { Plugin as IPlugin } from 'HSApp/Plugin';
import { Signal } from 'HSCore/Util';
import type { App } from 'HSApp';

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface AppParams {
  biz?: string;
}

interface AppInstance {
  appParams: AppParams;
  pluginManager: PluginManager;
  hotkey: {
    enable(key: string): void;
  };
}

interface PluginManager {
  getPlugin(type: string): any;
}

interface SignInPlugin {
  signals: {
    signalSigninSucceeded: Signal;
  };
}

interface WelcomePlugin {
  pause(): void;
  resume(): void;
}

interface LoginEvent {
  data: {
    isLogin: boolean;
  };
}

interface QueryStrings {
  disableLoginPopup?: boolean;
}

interface AjaxError {
  status: number;
}

interface EzhomeUser {
  signalCheckPermissionsCompleted: Signal;
  signalWhiteLabelSetting: Signal;
  signalSparkpicPermissionCompleted: Signal;
  signalRenderGradeSetting: Signal;
  signalUserRightsCompleted: Signal;
  signalUserMemberShipCompleted: Signal;
  signalLoginCompleted: Signal;
  init(signinPlugin: SignInPlugin): void;
  checkEnterRights(rights: unknown, showDialog?: boolean): boolean;
  payTrialCost(cost: unknown): void;
  getMemberInfo(): void;
  getUserEquity(): void;
  getUserBenefitsV2(): void;
  getUserIdentity(): Promise<void>;
}

declare global {
  const HSFPConstants: {
    PluginType: {
      SignIn: string;
      Welcome: string;
      Guide: string;
    };
  };
  const HSApp: {
    App: {
      getApp(): AppInstance;
    };
    Plugin: {
      IPlugin: typeof IPlugin;
      registerPlugin(name: string, plugin: typeof FirstLoginPlugin): void;
    };
    Config: {
      ENV: string;
    };
    Util: {
      Url: {
        getQueryStrings(): QueryStrings;
      };
    };
  };
  const HSCore: {
    Util: {
      Signal: typeof Signal;
    };
  };
  const NWTK: {
    ajax: {
      registerErrorHandler(handler: (error: AjaxError) => void): void;
    };
    mtop: {
      registerErrorHandler(handler: () => void): void;
    };
  };
  const adskUser: {
    EVENT_LOGIN_SUCCESS: string;
    openLoginWindow(): void;
    ezhomeUser?: EzhomeUser;
  };
  const $: JQueryStatic;
}

const EVENT_LOGIN_SUCCESS = 'loginSuccess';
const HTTP_UNAUTHORIZED = 401;
const BIZ_TYPE_TPZZ = 'tpzz';
const ENV_PRODUCTION = 'prod';

class FirstLoginPlugin extends IPlugin {
  private _signinPlugin?: SignInPlugin;
  private _welcomePlugin?: WelcomePlugin;
  private _loginsignal?: Signal;
  public signalViewerClosed?: Signal;

  constructor() {
    super({
      name: 'First open floorplan web plugin',
      description: 'get authorization of a role',
      dependencies: [
        HSFPConstants.PluginType.SignIn,
        HSFPConstants.PluginType.Welcome
      ]
    } as PluginConfig);
  }

  public onActive(app: App, dependencies: Record<string, any>): void {
    super.onActive(app, undefined);

    const appInstance = app.app;
    this._signinPlugin = dependencies[HSFPConstants.PluginType.SignIn];
    this._welcomePlugin = dependencies[HSFPConstants.PluginType.Welcome];
    this._loginsignal = this._signinPlugin!.signals.signalSigninSucceeded;

    const handleLoginSuccess = (): void => {
      const pluginManager = HSApp.App.getApp().pluginManager;
      const welcomePlugin = pluginManager.getPlugin(HSFPConstants.PluginType.Welcome);

      try {
        if (welcomePlugin) {
          welcomePlugin.resume();
          HSApp.App.getApp().hotkey.enable('esc');
        }
        this._loginsignal!.unlisten(handleLoginSuccess);
      } catch (error) {
        // Silent catch
      }

      const guidePlugin = pluginManager.getPlugin(HSFPConstants.PluginType.Guide);
      if (guidePlugin?.isNewbie) {
        guidePlugin.isNewbie();
      }
    };

    if (appInstance.appParams.biz !== BIZ_TYPE_TPZZ) {
      this._loginsignal.listen(handleLoginSuccess);
    }

    this._welcomePlugin?.pause();
    this.signalViewerClosed = new HSCore.Util.Signal(this);

    const handleLoginCompleted = (event: LoginEvent): void => {
      if (event.data.isLogin) {
        this._welcomePlugin?.resume();
      } else {
        this.init();
      }

      const disableLoginPopup = 
        HSApp.Util.Url.getQueryStrings().disableLoginPopup &&
        HSApp.Config.ENV !== ENV_PRODUCTION;

      NWTK.ajax.registerErrorHandler((error: AjaxError) => {
        if (error.status === HTTP_UNAUTHORIZED && !disableLoginPopup) {
          adskUser.openLoginWindow();
        }
      });

      NWTK.mtop.registerErrorHandler(() => {
        if (!disableLoginPopup) {
          adskUser.openLoginWindow();
        }
      });

      (adskUser.ezhomeUser as EzhomeUser).signalLoginCompleted.unlisten(
        handleLoginCompleted,
        this
      );
    };

    (adskUser.ezhomeUser as EzhomeUser).signalLoginCompleted.listen(
      handleLoginCompleted,
      this
    );
    (adskUser.ezhomeUser as EzhomeUser).init(this._signinPlugin!);
    adskUser.ezhomeUser = adskUser.ezhomeUser as EzhomeUser;
  }

  public onDeactive(): void {
    // Plugin deactivation logic
  }

  public init(): void {
    const handleSuccess = (): void => {
      $('body').off(adskUser.EVENT_LOGIN_SUCCESS, handleSuccess);
    };

    $('body').on(adskUser.EVENT_LOGIN_SUCCESS, handleSuccess);
  }

  public get signalCheckPermissionsCompleted(): Signal {
    return (adskUser.ezhomeUser as EzhomeUser).signalCheckPermissionsCompleted;
  }

  public get signalWhiteLabelSetting(): Signal {
    return (adskUser.ezhomeUser as EzhomeUser).signalWhiteLabelSetting;
  }

  public get signalSparkpicPermissionCompleted(): Signal {
    return (adskUser.ezhomeUser as EzhomeUser).signalSparkpicPermissionCompleted;
  }

  public get signalRenderGradeSetting(): Signal {
    return (adskUser.ezhomeUser as EzhomeUser).signalRenderGradeSetting;
  }

  public get signalUserRightsCompleted(): Signal {
    return (adskUser.ezhomeUser as EzhomeUser).signalUserRightsCompleted;
  }

  public get signalUserMemberShipCompleted(): Signal {
    return (adskUser.ezhomeUser as EzhomeUser).signalUserMemberShipCompleted;
  }

  public checkEnterRights(rights: unknown, showDialog: boolean = true): boolean {
    return (adskUser.ezhomeUser as EzhomeUser).checkEnterRights(rights, showDialog);
  }

  public payTrialCost(cost: unknown): void {
    (adskUser.ezhomeUser as EzhomeUser).payTrialCost(cost);
  }

  public getMemberInfo(): void {
    (adskUser.ezhomeUser as EzhomeUser).getMemberInfo();
  }

  public getUserEquity(): void {
    (adskUser.ezhomeUser as EzhomeUser).getUserEquity();
  }

  public getUserBenefitsV2(): void {
    (adskUser.ezhomeUser as EzhomeUser).getUserBenefitsV2();
  }

  public async getUserIdentity(): Promise<void> {
    await (adskUser.ezhomeUser as EzhomeUser).getUserIdentity();
  }
}

HSApp.Plugin.registerPlugin('hsw.brand.ezhome.firstlogin.Plugin', FirstLoginPlugin);