/**
 * WhiteLabelHandler - 白标配置处理器
 * 负责管理和应用平台的白标（品牌定制）设置，包括logo、favicon、功能开关等
 */

/**
 * Logo 设置接口
 */
interface LogoSetting {
  /** 页面头部 Logo 配置 */
  pageHeaderLogo?: {
    /** Logo 图片 URL */
    logo: string;
    /** Logo 点击跳转链接 */
    link?: string;
  };
  /** 浏览器标签页图标配置 */
  favIcon?: {
    /** Favicon 图片 URL */
    logo: string;
    /** 页面标题文本 */
    text?: string;
  };
  /** 大视图默认 Logo URL */
  largeViewDefaultLogo?: string;
  /** 是否隐藏水印 */
  hideWatermark?: boolean;
}

/**
 * 操作功能设置接口
 */
interface OperationSetting {
  /** 是否隐藏收件箱 */
  hideInbox?: boolean;
  /** 是否隐藏反馈入口 */
  hideFeedback?: boolean;
  /** 是否隐藏个人模型 */
  hidePersonModel?: boolean;
  /** 是否隐藏官方课程 */
  hideOfficialCourse?: boolean;
  /** 是否隐藏新手引导 */
  hideWalkThrough?: boolean;
  /** 自定义字体配置 */
  divCustomFont?: unknown;
  /** 水印配置 */
  watermark?: {
    /** 水印是否可用 */
    useful?: boolean;
    [key: string]: unknown;
  };
}

/**
 * 素材设置接口（预留）
 */
interface MaterialSetting {
  [key: string]: unknown;
}

/**
 * 完整的白标配置接口
 */
interface WhiteLabelConfig {
  /** Logo 相关设置 */
  logoSetting: LogoSetting;
  /** 功能操作设置 */
  operationSetting: OperationSetting;
  /** 素材设置 */
  materialSetting: MaterialSetting;
}

/**
 * Favicon 更新参数接口
 */
interface FavIconUpdateParams {
  /** Favicon 图片 URL */
  logo?: string;
  /** 页面标题文本 */
  text?: string;
}

/**
 * 白标配置处理类
 * 提供获取、设置和应用白标配置的功能
 */
export declare class WhiteLabelHandler {
  constructor();

  /**
   * 获取白标设置
   * 根据租户类型（fp）从服务器获取或返回默认配置
   * 
   * @returns Promise<WhiteLabelConfig> 白标配置对象
   * 
   * @example
   * const handler = new WhiteLabelHandler();
   * const config = await handler.getWhiteLabelSetting();
   * console.log(config.logoSetting.pageHeaderLogo.logo);
   */
  getWhiteLabelSetting(): Promise<WhiteLabelConfig>;

  /**
   * 应用白标设置到全局对象和页面
   * 更新 adskUser 全局对象，并触发 UI 更新（favicon、反馈入口、新手引导等）
   * 
   * @param config - 白标配置对象
   * 
   * @example
   * const config = await handler.getWhiteLabelSetting();
   * handler.setWhiteLabel(config);
   */
  setWhiteLabel(config: WhiteLabelConfig): void;

  /**
   * 更新浏览器标签页的 favicon 和标题
   * 
   * @param favIconConfig - Favicon 配置对象
   * 
   * @remarks
   * - 如果提供 text，会更新 document.title
   * - 如果提供 logo，会更新 link[rel="shortcut icon"] 的 href 属性
   */
  updateFavTab(favIconConfig?: FavIconUpdateParams): void;

  /**
   * 更新反馈入口的显示状态
   * 如果 hideFeedback 为 true，则移除反馈插件和帮助菜单中的反馈项
   * 
   * @param hideFeedback - 是否隐藏反馈入口
   * 
   * @remarks
   * 依赖 HSApp.App 和相关插件系统
   */
  updateFeedBackEntry(hideFeedback?: boolean): void;

  /**
   * 更新新手引导（Walkthrough）的启用状态
   * 如果 hideWalkThrough 为 true，则禁用新手引导功能
   * 
   * @param hideWalkThrough - 是否隐藏新手引导
   * 
   * @remarks
   * 依赖 HSApp.App 插件管理器和 Welcome 插件
   */
  updateWalkthrough(hideWalkThrough?: boolean): void;
}