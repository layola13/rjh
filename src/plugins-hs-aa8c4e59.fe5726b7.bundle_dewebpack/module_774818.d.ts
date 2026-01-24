/**
 * 页面统计与用户行为追踪模块
 * 负责收集用户信息、发送 PV/UV 数据到阿里云日志服务（goldlog）
 */

/**
 * 用户信息接口
 */
export interface UserInfo {
  /** 会员ID */
  memberId?: string;
  /** 用户唯一标识 */
  uid?: string;
  /** 客户端来源类型：Web | WindowsClient | MacClient */
  source?: string;
  /** 客户端版本号 */
  clientVersion?: string;
  /** 发布版本号 */
  publishVersion?: string;
  /** 按类型区分的发布版本 */
  publishVersionByType?: string;
  /** 显卡信息 */
  graphicsCard?: string | null;
  /** WebGL 版本 */
  webglVersion?: string;
  /** 应用环境标识 */
  environment?: string;
  /** 环境域名（仅国内版） */
  envDomain?: string;
  /** 语言设置 */
  hslang?: string;
  /** 浏览器语言 */
  browserLang?: string;
  /** 部署国家/地区代码 */
  deployCountry?: string;
  /** 渠道代码 */
  channelCode?: string;
  /** 广告ID（仅国际版） */
  adid?: string;
  /** HSI cookie 值（仅国际版） */
  hsi?: string;
  /** HSB cookie 值（仅国际版） */
  hsb?: string;
}

/**
 * 事件追踪数据接口
 */
export interface EventTrackData {
  /** 事件分组 */
  group: string;
  /** 事件动作 */
  action: string;
  /** 事件参数 */
  param?: Record<string, any>;
}

/**
 * 事件追踪信号接口
 */
export interface EventTrackSignal {
  data: EventTrackData;
}

/**
 * Aplus 映射配置项
 */
export interface AplusMappingItem {
  /** 事件唯一标识 */
  id: string;
  /** 需要传递的参数列表 */
  params?: string[];
}

/**
 * HSI 信息接口
 */
export interface HSInfo {
  /** 广告ID */
  adid: string | undefined;
  /** HSI cookie 值 */
  hsi: string | undefined;
  /** HSB cookie 值（格式化后） */
  hsb: string;
}

/**
 * Goldlog 日志队列项接口
 */
export interface GoldlogQueueItem {
  /** 要执行的动作 */
  action: string;
  /** 动作参数 */
  arguments: any[];
}

/**
 * WebGL 信息接口
 */
export interface WebGLInfo {
  /** 显卡信息 */
  graphicsCard?: string;
  /** WebGL 版本 */
  webglVersion?: string;
}

/**
 * 页面统计与用户行为追踪类
 * 集成阿里云 goldlog SDK，收集并上报用户行为数据
 */
export default class Analytics {
  /**
   * 用户信息对象
   */
  userInfo: UserInfo;

  /**
   * 显卡信息缓存
   * @private
   */
  private _graphicsCard: string | null;

  /**
   * WebGL 版本缓存
   * @private
   */
  private webglVersion?: string;

  /**
   * 启动统计模块
   * - 动态注入 goldlog SDK 脚本
   * - 监听登录成功信号
   * - 监听事件追踪信号
   */
  start(): void;

  /**
   * 发送页面浏览（Page View）统计
   * 收集用户信息并通过 goldlog.sendPV 上报
   */
  sendPV(): void;

  /**
   * 获取 HS 相关 Cookie 信息（仅国际版 fp）
   * @returns HSI 相关信息对象
   */
  getHSInfo(): HSInfo;

  /**
   * 获取并构建完整的用户信息
   * 根据租户类型（国内/国际）收集不同的字段
   */
  getUserInfo(): void;

  /**
   * 发送用户访问（User Visit）统计
   * @param event - Aplus 映射配置项
   * @param extraParams - 额外的统计参数
   */
  sendUV(event: AplusMappingItem, extraParams?: Record<string, any>): void;

  /**
   * 追踪事件处理器
   * 根据事件分组和动作查找对应的 Aplus 配置并上报
   * @param signal - 事件追踪信号对象
   */
  track(signal: EventTrackSignal): void;
}

/**
 * 扩展 Window 接口以支持 goldlog 相关全局变量
 */
declare global {
  interface Window {
    /** Goldlog 对象 */
    goldlog?: {
      sendPV?: (...args: any[]) => void;
      record?: (...args: any[]) => void;
    };
    /** Goldlog 队列，用于缓存日志调用 */
    goldlog_queue?: GoldlogQueueItem[];
    /** 发布版本号 */
    publishVersion?: string;
    /** 按类型区分的发布版本 */
    publishVersionByType?: string;
  }
}