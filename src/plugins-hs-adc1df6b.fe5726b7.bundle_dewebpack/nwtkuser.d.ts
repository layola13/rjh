/**
 * 用户权益管理模块
 * 负责检查用户会员权限、试用额度和支付试用费用
 */

/**
 * 用户会员权益检查结果
 */
export interface MembershipCheckResult {
  /** 是否为VIP用户 */
  isVip?: boolean;
  /** 剩余免费试用额度，-1表示无限制 */
  freeAmount: number;
}

/**
 * 试用额度查询结果
 */
interface TrialAmountResponse {
  /** 请求是否成功 */
  success: boolean;
  /** 剩余额度 */
  amount: number;
}

/**
 * 全局应用对象接口
 */
declare const HSApp: {
  App: {
    getApp(): {
      pluginManager: {
        getPlugin(pluginId: string): FirstLoginPlugin;
      };
    };
  };
  Config: {
    TENANT: string;
  };
};

/**
 * 全局用户对象接口
 */
declare const adskUser: {
  memberInfo: {
    memberType: string;
    validMember?: boolean;
  };
  isEnterprise?: boolean;
  apartmentCustomizedUI?: boolean;
};

/**
 * 全局会员类型常量
 */
declare const HSFPConstants: {
  GlobalMemberType: {
    Pro: string;
    Master: string;
  };
};

/**
 * 首次登录插件接口
 */
interface FirstLoginPlugin {
  /**
   * 检查进入权限
   * @param feature - 功能标识
   * @param skipCache - 是否跳过缓存
   */
  checkEnterRights(feature: string, skipCache: boolean): Promise<TrialAmountResponse>;

  /**
   * 支付试用费用
   * @param feature - 功能标识
   */
  payTrialCost(feature: string): Promise<boolean>;
}

/**
 * 用户权益管理类（单例模式）
 * 用于检查和管理用户的会员权限、试用额度等
 */
export class NWTKUser {
  /** 单例实例 */
  private static _instance?: NWTKUser;

  /** 功能标识常量 - 屋顶设计功能 */
  private static readonly FEATURE_ROOF = 'roof';

  /** 默认试用额度值（无限制） */
  private static readonly DEFAULT_FREE_AMOUNT = -1;

  /**
   * 获取单例实例
   * @returns NWTKUser实例
   */
  public static instance(): NWTKUser {
    if (!NWTKUser._instance) {
      NWTKUser._instance = new NWTKUser();
    }
    return NWTKUser._instance;
  }

  /**
   * 私有构造函数，防止外部实例化
   */
  private constructor() {}

  /**
   * 检查用户是否拥有会员权限
   * 满足以下任一条件即拥有权限：
   * 1. 用户为Pro或Master会员
   * 2. 用户为有效的企业会员
   * 3. 用户拥有公寓定制UI权限
   * 
   * @returns 是否拥有会员权限
   */
  public hasMembershipRights(): boolean {
    const isPremiumMember = [
      HSFPConstants.GlobalMemberType.Pro,
      HSFPConstants.GlobalMemberType.Master
    ].includes(adskUser.memberInfo.memberType);

    const isValidEnterpriseMember =
      adskUser?.isEnterprise === true &&
      adskUser?.memberInfo?.validMember === true;

    const hasCustomizedUI = adskUser?.apartmentCustomizedUI === true;

    return isPremiumMember || isValidEnterpriseMember || hasCustomizedUI;
  }

  /**
   * 获取用户的试用额度
   * 
   * @param forceRefresh - 是否强制刷新（跳过缓存），默认false
   * @returns 试用额度查询结果
   */
  public async getTrialAmount(forceRefresh: boolean = false): Promise<TrialAmountResponse> {
    const plugin = HSApp.App.getApp().pluginManager.getPlugin('hsw.brand.ezhome.firstlogin.Plugin');
    return plugin.checkEnterRights(NWTKUser.FEATURE_ROOF, !forceRefresh);
  }

  /**
   * 尝试支付试用费用（内部方法）
   * 
   * @returns 支付结果
   * @private
   */
  private async _tryPayTrialCost(): Promise<boolean> {
    const plugin = HSApp.App.getApp().pluginManager.getPlugin('hsw.brand.ezhome.firstlogin.Plugin');
    return plugin.payTrialCost(NWTKUser.FEATURE_ROOF);
  }

  /**
   * 检查用户是否有权进入功能
   * 优先检查会员权限，若无会员权限则检查试用额度
   * 
   * @param forceRefresh - 是否强制刷新试用额度，默认false
   * @returns 会员权益检查结果
   */
  public async checkEnterRights(forceRefresh: boolean = false): Promise<MembershipCheckResult> {
    // 如果用户拥有会员权限，直接返回VIP状态
    if (this.hasMembershipRights()) {
      return Promise.resolve({
        isVip: true,
        freeAmount: NWTKUser.DEFAULT_FREE_AMOUNT
      });
    }

    // 查询试用额度
    try {
      const result = await this.getTrialAmount(forceRefresh);

      if (!result.success) {
        return { freeAmount: NWTKUser.DEFAULT_FREE_AMOUNT };
      }

      // EZHome租户特殊处理：负数额度视为VIP
      if (HSApp.Config.TENANT === 'ezhome' && result.amount < 0) {
        return {
          isVip: true,
          freeAmount: NWTKUser.DEFAULT_FREE_AMOUNT
        };
      }

      return { freeAmount: result.amount };
    } catch (error) {
      return { freeAmount: NWTKUser.DEFAULT_FREE_AMOUNT };
    }
  }

  /**
   * 支付试用费用
   * 用户使用试用功能时扣减额度
   * 
   * @returns 是否支付成功
   */
  public async payTrialCost(): Promise<boolean> {
    try {
      return await this._tryPayTrialCost();
    } catch (error) {
      return false;
    }
  }
}