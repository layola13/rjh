const TRIAL_TYPE = "roof";

interface TrialAmountResponse {
  success: boolean;
  amount: number;
}

interface EnterRightsResult {
  isVip?: boolean;
  freeAmount: number;
}

interface MemberInfo {
  memberType: string;
  validMember?: boolean;
}

interface User {
  memberInfo: MemberInfo;
  isEnterprise?: boolean;
  apartmentCustomizedUI?: boolean;
}

interface FirstLoginPlugin {
  checkEnterRights(type: string, skipCache: boolean): Promise<TrialAmountResponse>;
  payTrialCost(type: string): Promise<boolean>;
}

interface PluginManager {
  getPlugin(pluginId: string): FirstLoginPlugin;
}

interface App {
  pluginManager: PluginManager;
}

interface HSApp {
  App: {
    getApp(): App;
  };
  Config: {
    TENANT: string;
  };
}

interface HSFPConstants {
  GlobalMemberType: {
    Pro: string;
    Master: string;
  };
}

declare const HSApp: HSApp;
declare const HSFPConstants: HSFPConstants;
declare const adskUser: User;

export class NWTKUser {
  private static _instance?: NWTKUser;

  /**
   * Get singleton instance of NWTKUser
   */
  static instance(): NWTKUser {
    if (!NWTKUser._instance) {
      NWTKUser._instance = new NWTKUser();
    }
    return NWTKUser._instance;
  }

  /**
   * Check if user has membership rights (Pro, Master, Enterprise, or customized UI)
   */
  hasMembershipRights(): boolean {
    return (
      [HSFPConstants.GlobalMemberType.Pro, HSFPConstants.GlobalMemberType.Master].includes(
        adskUser.memberInfo.memberType
      ) ||
      !!(adskUser?.isEnterprise && adskUser?.memberInfo?.validMember) ||
      !!adskUser?.apartmentCustomizedUI
    );
  }

  /**
   * Get trial amount for user
   * @param skipCache - Whether to skip cache
   */
  async getTrialAmount(skipCache: boolean = false): Promise<TrialAmountResponse> {
    const plugin = HSApp.App.getApp().pluginManager.getPlugin(
      "hsw.brand.ezhome.firstlogin.Plugin"
    );
    return plugin.checkEnterRights(TRIAL_TYPE, !skipCache);
  }

  /**
   * Internal method to pay trial cost
   */
  private async _tryPayTrialCost(): Promise<boolean> {
    const plugin = HSApp.App.getApp().pluginManager.getPlugin(
      "hsw.brand.ezhome.firstlogin.Plugin"
    );
    return plugin.payTrialCost(TRIAL_TYPE);
  }

  /**
   * Check if user has rights to enter, returns VIP status and free amount
   * @param skipCache - Whether to skip cache
   */
  async checkEnterRights(skipCache: boolean = false): Promise<EnterRightsResult> {
    const defaultFreeAmount = -1;

    if (this.hasMembershipRights()) {
      return Promise.resolve({
        isVip: true,
        freeAmount: defaultFreeAmount,
      });
    }

    return this.getTrialAmount(skipCache)
      .then((response) => {
        if (!response.success) {
          return { freeAmount: defaultFreeAmount };
        }

        if (HSApp.Config.TENANT === "ezhome" && response.amount < 0) {
          return {
            isVip: true,
            freeAmount: defaultFreeAmount,
          };
        }

        return { freeAmount: response.amount };
      })
      .catch(() => {
        return { freeAmount: defaultFreeAmount };
      });
  }

  /**
   * Pay trial cost for user
   */
  async payTrialCost(): Promise<boolean> {
    return this._tryPayTrialCost()
      .then((result) => result)
      .catch(() => false);
  }
}