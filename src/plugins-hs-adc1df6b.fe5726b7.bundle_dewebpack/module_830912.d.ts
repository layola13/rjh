/**
 * 页面头部Logo组件模块
 * @module PageHeaderLogo
 */

import React from 'react';

/**
 * Logo自定义级别
 */
type CustomLevel = 'DEFAULT' | 'JOINTLY';

/**
 * Logo配置状态接口
 */
interface LogoConfig {
  /** 自定义级别 */
  customLevel: CustomLevel;
  /** 图片URL */
  imageUrl: string;
  /** 是否隐藏"Powered by"文字 */
  hidePowerBy: boolean;
  /** Logo点击跳转链接 */
  link: string;
  /** 是否显示版本信息 */
  showVersion: boolean;
  /** 是否隐藏Logo */
  hideLogo: boolean;
}

/**
 * URL查询参数接口
 */
interface QueryStrings {
  /** 是否为海寻模式 */
  hxrr?: string;
  /** 环境参数 */
  env?: string;
  [key: string]: string | undefined;
}

/**
 * 用户Logo设置接口
 */
interface UserLogoSetting {
  /** 页面头部Logo配置 */
  pageHeaderLogo?: {
    /** Logo图片URL */
    logo: string;
    /** 跳转链接 */
    link: string;
    /** 是否隐藏"Powered by Homestyler"文字 */
    hidePowerByHomestyler: boolean;
    /** 是否隐藏Logo */
    hideLogo?: boolean;
  };
}

/**
 * 白标签设置信号数据接口
 */
interface WhiteLabelSignalData {
  data?: {
    /** Logo设置 */
    logoSetting?: UserLogoSetting;
  };
}

/**
 * 用户权益元数据接口
 */
interface BenefitMeta {
  /** 页面头部Logo配置 */
  pageHeaderLogo?: {
    /** 是否隐藏 */
    hide?: boolean;
  };
}

/**
 * 权益检查结果接口
 */
interface BenefitCheckResult {
  /** 是否可用 */
  useful: boolean;
}

/**
 * 全局用户对象接口
 */
interface AdskUser {
  /** Logo设置 */
  logoSetting?: UserLogoSetting;
  /** 是否为看房自定义UI */
  kanfangCustomizedUI?: boolean;
  /**
   * 获取权益元数据
   * @param benefit - 权益类型
   * @param feature - 功能特性
   */
  getBenefitMeta(benefit: string, feature: string): BenefitMeta | undefined;
  /**
   * 检查权益
   * @param benefit - 权益类型
   * @param feature - 功能特性
   */
  checkBenefit(benefit: string, feature: string): BenefitCheckResult | undefined;
}

/**
 * 插件管理器接口
 */
interface PluginManager {
  /**
   * 获取插件实例
   * @param pluginType - 插件类型标识符
   */
  getPlugin(pluginType: string): Plugin;
}

/**
 * 白标签首次登录插件接口
 */
interface WhiteLabelPlugin extends Plugin {
  /** 白标签设置信号 */
  signalWhiteLabelSetting: {
    /**
     * 监听信号
     * @param callback - 回调函数
     */
    listen(callback: (data: WhiteLabelSignalData) => void): void;
    /**
     * 取消监听信号
     * @param callback - 回调函数
     */
    unlisten(callback: (data: WhiteLabelSignalData) => void): void;
  };
}

/**
 * 用户信息插件接口
 */
interface UserInfoPlugin extends Plugin {
  /** 处理器 */
  handler: {
    /**
     * 处理打开工作台
     * @param target - 打开目标(_blank等)
     * @param url - 跳转URL
     */
    handleOpenMyWorkBench(target: string, url?: string): void;
  };
}

/**
 * 基础插件接口
 */
interface Plugin {
  [key: string]: unknown;
}

/**
 * 应用实例接口
 */
interface App {
  /** 插件管理器 */
  pluginManager: PluginManager;
}

/**
 * URL工具接口
 */
interface UrlUtil {
  /**
   * 获取查询字符串参数
   * @returns 查询参数对象
   */
  getQueryStrings(): QueryStrings;
}

/**
 * 事件追踪枚举
 */
declare enum EventGroupEnum {
  Pageheader = 'Pageheader',
}

/**
 * 事件追踪工具接口
 */
interface EventTrack {
  /**
   * 追踪事件
   * @param group - 事件组
   * @param action - 事件动作
   * @param data - 事件数据
   */
  track(group: EventGroupEnum, action: string, data: Record<string, unknown>): void;
}

/**
 * 事件追踪工具类接口
 */
interface EventTrackUtil {
  /**
   * 获取事件追踪单例
   */
  instance(): EventTrack;
  /** 事件组枚举 */
  EventGroupEnum: typeof EventGroupEnum;
}

/**
 * HSApp全局对象接口
 */
interface HSApp {
  /** 应用模块 */
  App: {
    /**
     * 获取应用实例
     */
    getApp(): App;
  };
  /** 配置 */
  Config: {
    /** 海寻Logo URL */
    HAI_XUN_LOGO: string;
    /** 资源基础路径 */
    RES_BASEPATH: string;
    /** 版本标识 */
    VERSION: string;
    /** 租户标识 */
    TENANT: string;
  };
  /** 工具模块 */
  Util: {
    /** URL工具 */
    Url: UrlUtil;
    /** 事件追踪工具 */
    EventTrack: EventTrackUtil;
  };
}

/**
 * MTOP API响应接口
 */
interface MtopResponse<T = unknown> {
  /** 返回结果 */
  ret: string[];
  /** 数据 */
  data: T;
}

/**
 * 自定义Logo数据接口
 */
interface CustomizedLogoData {
  /** 自定义级别 */
  customLevel: CustomLevel;
  /** 图片URL */
  imageUrl: string;
}

/**
 * MTOP用户API接口
 */
interface MtopUserApi {
  /**
   * 获取自定义Logo
   * @returns Promise返回Logo数据
   */
  customizedLogo(): Promise<MtopResponse<CustomizedLogoData>>;
}

/**
 * MTOP API接口
 */
interface MtopApi {
  /** 用户相关API */
  User: MtopUserApi;
}

/**
 * 网络工具包接口
 */
interface NWTK {
  /** MTOP API */
  mtop: MtopApi;
}

/**
 * 插件常量接口
 */
interface HSFPConstants {
  /** 插件类型 */
  PluginType: {
    /** 用户信息插件 */
    UserInfo: string;
  };
}

/**
 * 全局声明
 */
declare global {
  /** 全局HSApp对象 */
  const HSApp: HSApp;
  /** 全局用户对象 */
  const adskUser: AdskUser;
  /** 网络工具包 */
  const NWTK: NWTK;
  /** 插件常量 */
  const HSFPConstants: HSFPConstants;

  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: unknown;
    }
  }
}

/**
 * Logo组件函数组件
 * 渲染页面头部Logo，支持自定义Logo、白标签配置等功能
 */
declare function LogoComponent(): React.ReactElement;

/**
 * 页面头部Logo项类
 * 用于页面头部的Logo渲染项管理
 */
declare class PageHeaderLogoItem {
  /**
   * 渲染顺序
   * @default 0
   */
  order: number;

  /**
   * 构造函数
   */
  constructor();

  /**
   * 获取渲染项元素
   * @returns React元素
   */
  getRenderItem(): React.ReactElement;
}

/**
 * 默认导出的页面头部Logo项类
 */
export default PageHeaderLogoItem;

/**
 * 导出类型
 */
export type {
  LogoConfig,
  CustomLevel,
  UserLogoSetting,
  WhiteLabelSignalData,
  AdskUser,
  PluginManager,
  WhiteLabelPlugin,
  UserInfoPlugin,
  App,
  HSApp,
  QueryStrings,
  BenefitMeta,
  BenefitCheckResult,
  CustomizedLogoData,
  MtopResponse,
  EventGroupEnum,
};