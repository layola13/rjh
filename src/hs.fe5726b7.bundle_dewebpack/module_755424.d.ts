/**
 * 应用功能配置管理器
 * 管理应用各模块的启用/禁用状态，包括商家功能、自动推荐、样板间、落地页等
 */

/**
 * 功能配置选项接口
 */
export interface FeatureConfig {
  /** 是否禁用商家/店铺功能 */
  disableStore?: boolean;
  /** 是否禁用布局算法/自动推荐 */
  disableLayoutAlg?: boolean;
  /** 是否禁用样板间功能 */
  disableSampleRoom?: boolean;
  /** 是否禁用落地页功能 */
  disableLandingPage?: boolean;
}

/**
 * HSApp 全局对象类型定义
 */
declare global {
  const HSApp: {
    /** 工具类集合 */
    Util: {
      /** 本地存储工具类 */
      Storage: new (pluginType: string) => {
        set(key: string, value: boolean): void;
      };
    };
    /** 应用配置 */
    Config: {
      /** 应用版本标识 */
      VERSION: string;
    };
  };

  /** HSFPConstants 常量对象 */
  const HSFPConstants: {
    /** 插件类型枚举 */
    PluginType: {
      /** 自动推荐插件类型 */
      AutoRecommend: string;
    };
  };
}

/**
 * 应用功能配置管理类
 * 负责初始化和管理应用的功能开关配置
 */
export default class AppFeatureManager {
  /** 功能配置对象 */
  private config: FeatureConfig;

  /**
   * 构造函数
   * @param config - 初始功能配置，默认为空对象
   */
  constructor(config?: FeatureConfig);

  /**
   * 初始化配置管理器
   * @param config - 功能配置对象
   */
  init(config: FeatureConfig): void;

  /**
   * 设置本地存储
   * 当自动推荐功能禁用时，将状态写入本地存储
   * @private
   */
  private _setStorage(): void;

  /**
   * 获取配置项的值
   * @param key - 配置项的键名
   * @returns 配置项的值，如果未定义则返回 false
   * @private
   */
  private _getConfigItem(key: keyof FeatureConfig): boolean;

  /**
   * 判断是否为 EA（企业版）账户
   * @returns 如果应用版本为 "ea" 则返回 true
   * @private
   */
  private _isEAAccount(): boolean;

  /**
   * 商家功能是否启用
   * @returns 当 disableStore 为 false 或未配置时返回 true
   */
  get enableMerchant(): boolean;

  /**
   * 自动推荐功能是否启用
   * @returns 当 disableLayoutAlg 为 false 或未配置时返回 true
   */
  get enableAutoRecommend(): boolean;

  /**
   * 样板间功能是否启用
   * @returns 当 disableSampleRoom 为 false 或未配置时返回 true
   */
  get enableSampleRoom(): boolean;

  /**
   * 落地页功能是否启用
   * @returns 当 disableLandingPage 为 false 或未配置时返回 true
   */
  get enableLandingPage(): boolean;
}