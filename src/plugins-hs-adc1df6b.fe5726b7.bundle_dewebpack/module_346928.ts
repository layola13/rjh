import React from 'react';

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface App {
  appParams: {
    mode: string;
  };
  pluginManager: {
    getPlugin: (pluginId: string) => Plugin;
  };
  signalEnvironmentActivated: unknown;
  environmentManager: {
    defaultEnvironmentId: string;
  };
}

interface Dependencies {
  [key: string]: Plugin;
}

interface Plugin {
  signalWhiteLabelSetting?: unknown;
  showItem?: (itemId: string) => void;
  hideItem?: (itemId: string) => void;
  updateItem?: (item: unknown) => void;
  addItem?: (item: unknown) => void;
}

interface Benefit {
  useful?: boolean;
}

interface QueryStrings {
  env?: string;
  taobaoId?: string;
  reenterurl?: string;
  webClient?: string;
}

interface Environment {
  data: {
    newEnvironmentId: string;
  };
}

interface ReadonlyModeConfig {
  readonlyFn?: () => void;
  text?: string;
  tips?: string;
}

interface RenderItem {
  getRenderItem: () => React.ReactElement;
}

declare global {
  const HSApp: {
    Plugin: {
      IPlugin: new (...args: unknown[]) => unknown;
      registerPlugin: (pluginType: string, pluginClass: unknown) => void;
    };
    Config: {
      VERSION: string;
      TENANT: string;
    };
    Util: {
      Url: {
        getQueryStrings: () => QueryStrings;
      };
    };
    App: {
      getApp: () => App;
    };
  };
  const HSCore: {
    Util: {
      SignalHook: new (context: unknown) => SignalHook;
    };
  };
  const HSFPConstants: {
    PluginType: {
      PageHeader: string;
      UserInfo: string;
      Welcome: string;
    };
    Environment: {
      Default: string;
    };
  };
  const ResourceManager: {
    getString: (key: string) => string;
  };
  const adskUser: {
    checkBenefit: (category: string, benefit: string) => Benefit | undefined;
    apartmentCustomizedUI?: boolean;
  };
  const $: (selector: string) => {
    show: () => void;
    hide: () => void;
  };
}

interface SignalHook {
  listen: (signal: unknown, callback: (data?: unknown) => void) => SignalHook;
}

interface Handler {
  addItem: (item: unknown, position: string, id?: string) => void;
  removeItem: (position: string) => void;
  removeItemById: (id: string) => void;
  setPageHeaderReadonlyMode: () => void;
  setPageHeaderEditMode: () => void;
  updateStateById: (id: string, state: unknown) => void;
  getItemById: (id: string) => HandlerItem | undefined;
}

interface HandlerItem {
  _item: {
    handleShareToCommunity: () => void;
  };
}

function supportsReflectConstruct(): boolean {
  try {
    return !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
  } catch (error) {
    return false;
  }
}

class PageHeaderPlugin extends (HSApp.Plugin.IPlugin as any) {
  private _handler: Handler | null = null;
  private _app?: App;
  private _dependencies?: Dependencies;
  private _help?: any;
  private signInPlugin?: Plugin;
  private loginStatus?: Plugin;
  private fpLoginStatus?: any;
  private signalHook?: SignalHook;
  private showPriceBar: boolean = false;

  constructor() {
    super({
      name: 'pageHeader wrapper plugin',
      description: 'provide pageHeader wrapper',
      dependencies: [
        'hsw.plugin.switchlanguage.Plugin',
        'hsw.plugin.signin.Plugin',
        'hsw.plugin.persistence.Plugin',
        'hsw.plugin.userInfo.Plugin',
        HSFPConstants.PluginType.Welcome,
      ],
    } as PluginConfig);
  }

  onActive(context: { app: App }, dependencies: Dependencies): void {
    super.onActive(context, dependencies);

    this._app = context.app;
    this._dependencies = dependencies;
    this._help = new (window as any).Help(this._app, dependencies);
    this.loginStatus = dependencies[HSFPConstants.PluginType.UserInfo];
    this.signInPlugin = dependencies['hsw.plugin.signin.Plugin'];
    this.signalHook = new HSCore.Util.SignalHook(this);

    const firstLoginPlugin = this._app.pluginManager.getPlugin(
      'hsw.brand.ezhome.firstlogin.Plugin'
    );

    this.showPriceBar = false;

    this.signalHook
      .listen(firstLoginPlugin.signalWhiteLabelSetting, () => {
        const hideInbox = adskUser.checkBenefit('whiteLabel', 'hideInbox')?.useful;
        const hideOfficialCourse = adskUser.checkBenefit('whiteLabel', 'hideOfficialCourse')?.useful;
        const calculateModelPrice = adskUser.checkBenefit('whiteLabel', 'calculateModelPrice')?.useful;
        const calculateModelPriceRealtime = adskUser.checkBenefit('whiteLabel', 'calculateModelPriceRealtime')?.useful;
        const shouldShowPriceBar = calculateModelPrice || calculateModelPriceRealtime;

        this.showPriceBar = shouldShowPriceBar;

        if (hideInbox) {
          this._handler?.removeItemById('notification');
        }

        if (hideOfficialCourse) {
          [
            'toolbar_help_center',
            'toolBar_guidNewVideo',
            'toolBar_help_divider2',
            'toolBar_guidfordiy',
            'toolBar_aboutus',
          ].forEach((itemId) => {
            this._help?.removeItem_(`toolBar_help/${itemId}`);
          });
          this._handler?.removeItemById('TeachingAbilityButton');
        }

        if (shouldShowPriceBar) {
          this._handler?.addItem(new (window as any).PriceBar(), 'right', 'priceBar');
        }
      })
      .listen(this._app.signalEnvironmentActivated, (environment: Environment) => {
        if (this.showPriceBar) {
          if (environment.data.newEnvironmentId !== HSFPConstants.Environment.Default) {
            this._handler?.removeItemById('priceBar');
          } else {
            this._handler?.addItem(new (window as any).PriceBar(), 'right', 'priceBar');
          }
        }
      });

    if (this._app.appParams.mode !== 'iframe') {
      this._handler = new (window as any).Handler(this._app, dependencies);
      this._handler.addItem(new (window as any).Logo(this._app, dependencies), 'left', 'logo');
      this._handler.addItem(new (window as any).DesignInfo(this._app, dependencies), 'left', 'designinfo');

      if (HSApp.Config.VERSION !== 'ea') {
        this._handler.addItem(new (window as any).Privacy(this._app, dependencies), 'left', 'privacy');
        this._handler.addItem(new (window as any).Notification(this._app, dependencies), 'right', 'notification');
      }

      if (HSApp.Config.TENANT === 'fp') {
        this.fpLoginStatus = new (window as any).FpLoginStatus(this._app, dependencies);
        this._handler.addItem(this.fpLoginStatus, 'right', 'loginStatus');
        this._handler.addItem(this._help, 'right', 'help');
      }

      const queryStrings = HSApp.Util.Url.getQueryStrings();
      const { env, taobaoId, reenterurl, webClient } = queryStrings;

      if (env && taobaoId && reenterurl) {
        return;
      }

      if (HSApp.Config.TENANT !== 'fp') {
        this._handler.addItem(new (window as any).LoginStatus(), 'right', 'loginStatus');
      }

      if (!webClient) {
        this._handler.addItem(new (window as any).Fullscreen(), 'right', 'fullscreen');
      }
    }
  }

  onDeactive(): void {}

  addItem(item: unknown, position: string, id: string): void {
    this._handler?.addItem(item, position, id);
  }

  removeItem(itemId: string): void {
    this._handler?.removeItemById(itemId);
  }

  removeLoginStatus(): void {
    this._handler?.removeItemById('loginStatus');
    this._handler?.removeItemById('globalV1Link');
  }

  addLoginStatus(): void {
    const queryStrings = HSApp.Util.Url.getQueryStrings();
    const { env, taobaoId, reenterurl } = queryStrings;
    const defaultEnvironmentId = HSApp.App.getApp().environmentManager.defaultEnvironmentId;

    if ((env && taobaoId && reenterurl) || defaultEnvironmentId === 'tpzz') {
      return;
    }

    this._handler?.addItem(new (window as any).LoginStatus(), 'right', 'loginStatus');
  }

  removeItemById(itemId: string): void {
    this._handler?.removeItemById(itemId);
  }

  addUserCenterItems(items: unknown[]): void {
    items.forEach((item) => {
      this.addUserCenterItem(item);
    });
  }

  openUserDropMenu(): void {
    this.fpLoginStatus?.openUserMenu?.();
  }

  hideUserDropMenu(): void {
    this.fpLoginStatus?.hideUserMenu?.();
  }

  showUserCenterItem(itemId: string): void {
    this.loginStatus?.showItem?.(itemId);
  }

  hideUserCenterItem(itemId: string): void {
    this.loginStatus?.hideItem?.(itemId);
  }

  updateUserCenterItem(item: unknown): void {
    this.loginStatus?.updateItem?.(item);
  }

  addUserCenterItem(item: unknown): void {
    this.loginStatus?.addItem?.(item);
  }

  getHelpItem(itemId: string): unknown {
    return this._help?.getItem_(itemId);
  }

  getNewShareItem(config: unknown): unknown {
    return new (window as any).Privacy(this._app, this._dependencies, false, config);
  }

  show(): void {
    $('header').show();
  }

  hide(): void {
    $('header').hide();
  }

  beforeEnterEnv(item: unknown, position?: string, useDefault: boolean = true): void {
    this._handler?.removeItem('left');

    let finalItem = item;
    if (!useDefault) {
      finalItem = {
        getRenderItem: () => {
          return React.createElement((window as any).EnvItem, { data: item });
        },
      };
    }

    if (position) {
      this._handler?.addItem(finalItem, position);
    }
  }

  afterOuterEnv(): void {
    this._handler?.removeItem('left');
    this._handler?.addItem(new (window as any).Logo(this._app, this._dependencies), 'left');

    if (!adskUser.apartmentCustomizedUI) {
      this._handler?.addItem(new (window as any).DesignInfo(this._app, this._dependencies), 'left', 'designinfo');

      if (HSApp.Config.VERSION !== 'ea') {
        this._handler?.addItem(new (window as any).Privacy(this._app, this._dependencies), 'left', 'privacy');
      }
    }
  }

  setPageHeaderReadonlyMode(config: ReadonlyModeConfig): void {
    const { readonlyFn, text, tips } = config;

    this._handler?.setPageHeaderReadonlyMode();

    if (HSApp.Config.TENANT === 'fp') {
      this._handler?.removeItemById('fpversionswitch');
    }

    this._handler?.addItem(
      new (window as any).ReadonlyBtn({
        text: text ?? ResourceManager.getString('pageHeader_readonly_btn'),
        tips,
        onClick: readonlyFn,
      }),
      'right',
      'readonlybtn'
    );
  }

  setPageHeaderEditMode(): void {
    this._handler?.setPageHeaderEditMode();
    this._handler?.removeItemById('readonlybtn');
  }

  updateState(itemId: string, state: unknown): void {
    this._handler?.updateStateById(itemId, state);
  }

  shareToCommunity(): void {
    const privacyItem = this._handler?.getItemById('privacy');
    privacyItem?._item.handleShareToCommunity();
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.PageHeader, PageHeaderPlugin);