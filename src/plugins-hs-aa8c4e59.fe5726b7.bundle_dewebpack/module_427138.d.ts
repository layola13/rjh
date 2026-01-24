/**
 * 阿里云Web追踪服务
 * 用于收集和上报用户行为事件数据
 */

/**
 * 事件数据结构
 */
interface EventData {
  /** 事件分组 */
  group: string;
  /** 事件动作 */
  action: string;
  /** 事件参数 */
  param?: Record<string, unknown>;
}

/**
 * 信号事件结构
 */
interface SignalEvent {
  /** 事件携带的数据 */
  data: EventData;
}

/**
 * 追踪配置项
 */
interface TrackingConfig {
  /** 主题标识 */
  topic: string;
}

/**
 * 追踪日志参数
 */
interface TrackingLogParams {
  /** 事件分类 */
  category: string;
  /** 发布版本号 */
  publishVersion: string;
  /** 按类型区分的发布版本 */
  publishVersionByType: string;
  /** 应用版本 */
  appVersion: string;
  /** 事件主题 */
  topic: string;
  /** 其他自定义参数 */
  [key: string]: unknown;
}

/**
 * 日志记录器接口
 */
interface Logger {
  /** 是否静默模式（不输出日志） */
  silence: boolean;
  /**
   * 记录信息级别日志
   * @param message - 日志消息
   * @param force - 是否强制输出（忽略silence设置）
   */
  info(message: string, force?: boolean): void;
}

/**
 * 全局window扩展
 */
declare global {
  interface Window {
    /** 发布版本号 */
    publishVersion: string;
    /** 按类型区分的发布版本 */
    publishVersionByType: string;
    /** HSApp全局对象 */
    HSApp: {
      Util: {
        EventTrack: {
          /** 获取事件追踪单例 */
          instance(): {
            signalEventTrack: {
              /** 监听事件追踪信号 */
              listen(callback: (event: SignalEvent) => void, context: unknown): void;
            };
          };
        };
      };
    };
  }
  /** 日志工具 */
  const log: {
    /**
     * 创建日志记录器
     * @param name - 日志记录器名称
     */
    logger(name: string): Logger;
  };
}

/**
 * 阿里云Web行为追踪服务
 * 负责监听应用内事件并上报到日志系统
 */
export default class AliWebTracking {
  /** 日志记录器实例 */
  private logger?: Logger;

  /**
   * 启动追踪服务
   * 初始化日志记录器并开始监听事件
   */
  start(): void;

  /**
   * 处理追踪事件
   * @param event - 信号事件对象
   */
  track(event: SignalEvent): void;
}

/**
 * 事件配置映射表
 * 键格式：`${group}_${action}`
 * 值：追踪配置对象
 */
export const EventConfigMap: Record<string, TrackingConfig>;