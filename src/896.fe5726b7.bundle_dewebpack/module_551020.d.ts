/**
 * 用户VIP插件模块
 * 提供会员信息管理、市场弹窗控制和权益刷新功能
 * @module UserVipPlugin
 */

declare namespace HSFPConstants {
  /**
   * 插件类型枚举
   */
  enum PluginType {
    /** 营销徽章插件类型 */
    MarketingBadge = 'MarketingBadge'
  }
}

declare namespace HSApp {
  namespace Config {
    /** 租户标识 - 用于区分不同的应用环境 */
    const TENANT: string;
    /** 版本标识 */
    const VERSION: string;
  }

  namespace Plugin {
    /**
     * 插件基类接口
     * 所有插件必须继承此接口
     */
    class IPlugin {
      /**
       * 插件激活时的回调
       * @param context - 插件上下文
       * @param options - 激活选项
       */
      onActive(context: unknown, options: unknown): void;
    }

    /**
     * 注册插件到系统
     * @param pluginType - 插件类型
     * @param pluginClass - 插件类构造函数
     */
    function registerPlugin(
      pluginType: HSFPConstants.PluginType,
      pluginClass: new () => IPlugin
    ): void;
  }
}

declare namespace Handler {
  /**
   * VIP信息数据结构
   */
  interface VipInfo {
    /** 会员ID */
    id?: string;
    /** 会员等级 */
    level?: number;
    /** 会员类型 */
    type?: string;
    /** 到期时间 */
    expireTime?: number;
    /** 是否为有效会员 */
    isValid?: boolean;
    [key: string]: unknown;
  }

  /**
   * VIP信息变更信号
   * 用于订阅会员信息变化事件
   */
  interface VipInfoChangedSignal {
    /** 添加监听器 */
    add(callback: (vipInfo: VipInfo) => void): void;
    /** 移除监听器 */
    remove(callback: (vipInfo: VipInfo) => void): void;
    /** 触发信号 */
    dispatch(vipInfo: VipInfo): void;
  }

  /**
   * 市场弹窗类型枚举
   */
  enum MarketTypeEnum {
    /** 会员类型 */
    Member = 'Member',
    /** 促销类型 */
    Promotion = 'Promotion',
    /** 升级类型 */
    Upgrade = 'Upgrade'
  }

  /**
   * 市场处理器类
   * 负责处理会员信息获取、弹窗展示和权益刷新
   */
  class Handler {
    /** VIP信息变更信号实例 */
    readonly vipInfoChangedSignal: VipInfoChangedSignal;

    /**
     * 初始化处理器
     * 在特定租户和版本下初始化相关功能
     */
    init(): void;

    /**
     * 获取VIP信息
     * @returns VIP信息对象，如果未登录或未开通则返回默认值
     */
    getVipInfo(): VipInfo;

    /**
     * 显示市场营销弹窗
     * @param marketType - 市场类型，默认为会员类型
     * @param source - 来源标识，用于追踪弹窗打开来源
     * @param extraData - 额外数据，传递给弹窗的自定义参数
     */
    showMarketModal(
      marketType?: MarketTypeEnum,
      source?: string,
      extraData?: Record<string, unknown>
    ): void;

    /**
     * 关闭市场营销弹窗
     */
    closeMarketModal(): void;

    /**
     * 刷新用户权益信息
     * 从服务器重新获取最新的会员权益数据
     */
    refreshBenefits(): void;
  }
}

/**
 * 用户VIP插件类
 * 继承自HSApp插件基类，提供完整的会员功能管理
 * 
 * @example
 *