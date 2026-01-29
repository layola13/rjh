interface WhiteLabelConfig {
  logoSetting: LogoSetting;
  operationSetting: OperationSetting;
  materialSetting: MaterialSetting;
}

interface LogoSetting {
  pageHeaderLogo?: {
    logo: string;
    link?: string;
  };
  favIcon?: {
    logo: string;
    text?: string;
  };
  largeViewDefaultLogo?: string;
  hideWatermark?: boolean;
}

interface OperationSetting {
  hideInbox?: boolean;
  hideFeedback?: boolean;
  hidePersonModel?: boolean;
  hideOfficialCourse?: boolean;
  hideWalkThrough?: boolean;
  divCustomFont?: unknown;
  watermark?: WatermarkConfig;
}

interface WatermarkConfig {
  useful?: boolean;
  [key: string]: unknown;
}

interface MaterialSetting {
  [key: string]: unknown;
}

interface GroupInfo {
  customTitle?: string;
  customWbDomain?: string;
  logoUrl?: string;
  favIconUrl?: string;
}

interface WhiteLabelBenefit {
  group: {
    hideInbox?: { useful?: boolean };
    hideFeedback?: { useful?: boolean };
    hidePersonModel?: { useful?: boolean };
    hideOfficialCourse?: { useful?: boolean };
    watermark?: WatermarkConfig;
    divCustomFont?: unknown;
  };
}

interface FavIconConfig {
  logo?: string;
  text?: string;
}

declare global {
  const HSApp: {
    Config: {
      TENANT: string;
    };
    App: {
      getApp(): {
        pluginManager: {
          getPlugin(pluginName: string): any;
        };
      };
    };
  };
  
  const NWTK: {
    mtop: {
      User: {
        whiteLabelSetting(): Promise<{
          data?: {
            data?: {
              groupInfo?: GroupInfo;
            };
          };
        }>;
      };
    };
  };
  
  const adskUser: {
    benefits?: {
      whiteLabel?: WhiteLabelBenefit;
    };
    largeViewDefaultLogo?: string;
    hideWatermark?: boolean;
    hideInbox?: boolean;
    hideFeedback?: boolean;
    hidePersonModel?: boolean;
    hideOfficialCourse?: boolean;
    divCustomFont?: unknown;
    watermark?: WatermarkConfig;
    logoSetting?: LogoSetting;
  };
  
  const HSFPConstants: {
    PluginType: {
      PageHeader: string;
      Welcome: string;
    };
  };
}

export class WhiteLabelHandler {
  /**
   * Fetches white label settings based on tenant configuration
   */
  public getWhiteLabelSetting(): Promise<WhiteLabelConfig> {
    if (HSApp.Config.TENANT === "fp") {
      return NWTK.mtop.User.whiteLabelSetting().then((response) => {
        const groupInfo = response.data?.data?.groupInfo ?? {};
        const customTitle = groupInfo.customTitle;
        const customWbDomain = groupInfo.customWbDomain;
        const logoUrl = groupInfo.logoUrl;
        const favIconUrl = groupInfo.favIconUrl;
        
        const whiteLabelGroup = adskUser.benefits?.whiteLabel?.group;
        const hideInbox = whiteLabelGroup?.hideInbox;
        const hideFeedback = whiteLabelGroup?.hideFeedback;
        const hidePersonModel = whiteLabelGroup?.hidePersonModel;
        const hideOfficialCourse = whiteLabelGroup?.hideOfficialCourse;
        const watermark = whiteLabelGroup?.watermark;
        const divCustomFont = whiteLabelGroup?.divCustomFont;
        
        return {
          logoSetting: {
            pageHeaderLogo: {
              logo: logoUrl ?? "",
              link: customWbDomain
            },
            favIcon: {
              logo: favIconUrl ?? "",
              text: customTitle
            },
            hideWatermark: watermark?.useful === false
          },
          operationSetting: {
            hideInbox: hideInbox?.useful,
            hideFeedback: hideFeedback?.useful,
            hidePersonModel: hidePersonModel?.useful,
            hideOfficialCourse: hideOfficialCourse?.useful,
            divCustomFont: divCustomFont,
            watermark: watermark
          },
          materialSetting: {}
        };
      });
    }
    
    return Promise.resolve({
      logoSetting: {
        pageHeaderLogo: {
          logo: "https://s41.shejijia.com/i/e29fc9a5-e74a-442a-8972-8d1698f2025f/iso.jpg?x-oss-process=style/iso-normal"
        },
        favIcon: {
          logo: "https://s41.shejijia.com/i/e29fc9a5-e74a-442a-8972-8d1698f2025f/iso.jpg?x-oss-process=style/iso-normal",
          text: "测试一下"
        },
        largeViewDefaultLogo: "https://s41.shejijia.com/i/e29fc9a5-e74a-442a-8972-8d1698f2025f/iso.jpg?x-oss-process=style/iso-normal"
      },
      operationSetting: {
        hideWalkThrough: true,
        hideFeedback: true
      },
      materialSetting: {}
    });
  }

  /**
   * Applies white label configuration to the application
   */
  public setWhiteLabel(config: WhiteLabelConfig): void {
    const { logoSetting, operationSetting } = config;
    
    adskUser.largeViewDefaultLogo = logoSetting.largeViewDefaultLogo;
    adskUser.hideWatermark = logoSetting.hideWatermark;
    adskUser.hideInbox = operationSetting.hideInbox;
    adskUser.hideFeedback = operationSetting.hideFeedback;
    adskUser.hidePersonModel = operationSetting.hidePersonModel;
    adskUser.hideOfficialCourse = operationSetting.hideOfficialCourse;
    adskUser.divCustomFont = operationSetting.divCustomFont;
    adskUser.watermark = operationSetting.watermark;
    adskUser.logoSetting = logoSetting;
    
    this.updateFavTab(logoSetting.favIcon);
    this.updateFeedBackEntry(operationSetting.hideFeedback);
    this.updateWalkthrough(operationSetting.hideWalkThrough);
  }

  /**
   * Updates the browser tab favicon and title
   */
  private updateFavTab(favIcon?: FavIconConfig): void {
    if (!favIcon) {
      return;
    }
    
    const { logo, text } = favIcon;
    
    if (text) {
      document.title = text;
    }
    
    if (logo) {
      const iconElement = document.querySelector<HTMLLinkElement>('link[rel="shortcut icon"]');
      if (iconElement) {
        iconElement.href = logo;
      }
    }
  }

  /**
   * Updates feedback entry visibility
   */
  private updateFeedBackEntry(shouldHide?: boolean): void {
    if (!shouldHide) {
      return;
    }
    
    const app = HSApp.App.getApp();
    app.pluginManager.getPlugin("hsw.brand.ezhome.feedback.Plugin").onDeactive();
    app.pluginManager
      .getPlugin(HSFPConstants.PluginType.PageHeader)
      .getHelpItem("toolBar_help")
      .remove("toolBar_feedback");
  }

  /**
   * Updates walkthrough feature visibility
   */
  private updateWalkthrough(shouldHide?: boolean): void {
    if (!shouldHide) {
      return;
    }
    
    HSApp.App.getApp()
      .pluginManager
      .getPlugin(HSFPConstants.PluginType.Welcome)
      .disableWalkthrough();
  }
}