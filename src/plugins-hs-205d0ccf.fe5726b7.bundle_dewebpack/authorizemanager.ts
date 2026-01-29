interface AuthorizeConfigItem {
  type: string;
  sourcePage: string;
  marketType?: string;
}

interface AuthorizeConfig {
  aigc: AuthorizeConfigItem;
  count: AuthorizeConfigItem;
  resolution: AuthorizeConfigItem;
  sparkpic_all_watermark: AuthorizeConfigItem;
  sparkpic_group_watermark: AuthorizeConfigItem;
  sparkpic_detail_watermark: AuthorizeConfigItem;
}

interface AuthorizeOptions {
  callBack?: (result: unknown) => void;
  redeemComplete?: () => void;
}

interface ShowMarketModalOptions {
  type: string;
  sourcePage: string;
  callBack?: (result: unknown) => void;
  redeemComplete?: () => void;
}

interface MarketModalCloseCallback {
  onClose: (result: unknown, shouldReload: boolean) => void;
  redeemComplete?: () => void;
}

interface MemberInfo {
  memberType?: number;
}

interface User {
  memberInfo?: MemberInfo;
}

interface Plugin {
  showMarketModal(
    type: string,
    sourcePage: string,
    options: MarketModalCloseCallback
  ): void;
}

interface PluginManager {
  getPlugin(pluginType: string): Plugin | null;
}

interface App {
  pluginManager: PluginManager;
}

interface AppStatic {
  getApp(): App;
}

interface Config {
  TENANT: string;
}

interface PluginTypeConstants {
  MarketingBadge: string;
}

declare const HSApp: {
  App: AppStatic;
  Config: Config;
};

declare const HSFPConstants: {
  PluginType: PluginTypeConstants;
};

declare const adskUser: User;

export const authorizeConfig: AuthorizeConfig = {
  aigc: {
    type: "aigc",
    sourcePage: "sparkpic_more"
  },
  count: {
    type: "render",
    sourcePage: "sparkpic_count"
  },
  resolution: {
    type: "render",
    sourcePage: "sparkpic_resolution"
  },
  sparkpic_all_watermark: {
    type: "authorize",
    marketType: "render",
    sourcePage: "sparkpic_all_watermark"
  },
  sparkpic_group_watermark: {
    type: "authorize",
    marketType: "render",
    sourcePage: "sparkpic_group_watermark"
  },
  sparkpic_detail_watermark: {
    type: "authorize",
    marketType: "render_watermark",
    sourcePage: "sparkpic_detail_watermark"
  }
};

export class Manager {
  private app: App;

  constructor() {
    this.app = HSApp.App.getApp();
  }

  /**
   * Authorize user access based on configuration key
   * @param configKey - Key from authorizeConfig
   * @param options - Authorization options including callbacks
   */
  public authorize(
    configKey: keyof AuthorizeConfig,
    options?: AuthorizeOptions
  ): void {
    const { callBack, redeemComplete } = options ?? {};

    if (HSApp.Config.TENANT === "fp") {
      const config = authorizeConfig[configKey];
      let marketType = config.type;

      const memberType = adskUser.memberInfo?.memberType;

      switch (memberType) {
        case 2:
          marketType = "render-master-aigc";
          break;
        case 3:
          marketType = "aigc";
          break;
        default:
          marketType = "render-aigc";
      }

      if (config.marketType) {
        marketType = config.marketType;
      }

      this.showMarketModal({
        type: marketType,
        sourcePage: config.sourcePage,
        callBack,
        redeemComplete
      });
    }
  }

  /**
   * Display market modal dialog
   * @param options - Modal display options
   */
  public showMarketModal(options: ShowMarketModalOptions): void {
    const { type, sourcePage, callBack, redeemComplete } = options;

    const plugin = this.app.pluginManager.getPlugin(
      HSFPConstants.PluginType.MarketingBadge
    );

    plugin?.showMarketModal(type, sourcePage, {
      onClose: (result: unknown, shouldReload: boolean) => {
        if (shouldReload) {
          window.location.reload();
        } else {
          callBack?.(result);
        }
      },
      redeemComplete
    });
  }
}

function singleton<T>(constructor: new () => T): T {
  return new constructor();
}

export const AuthorizeManager = singleton(Manager);