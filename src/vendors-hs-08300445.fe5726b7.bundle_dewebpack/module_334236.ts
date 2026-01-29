import { ReactElement, RefObject } from 'react';

/**
 * 通知配置项接口
 */
interface NotificationConfig {
  /** 通知的唯一标识 */
  key: string;
  /** 通知的持有者元素 */
  holder?: HTMLElement;
  /** 其他配置属性 */
  [key: string]: unknown;
}

/**
 * 通知管理器接口
 */
interface NotificationManager {
  /**
   * 添加新的通知
   * @param config - 通知配置
   * @param callback - 通知创建后的回调函数
   */
  add(
    config: NotificationConfig,
    callback: (holder: HTMLElement | null, config: NotificationConfig) => void
  ): void;
}

/**
 * Hook返回值类型：[添加通知函数, 通知列表容器]
 */
type UseNotificationResult = [
  (config: NotificationConfig) => void,
  ReactElement
];

/**
 * 使用通知管理Hook
 * 
 * @description
 * 该Hook用于管理动态通知消息的渲染和状态。
 * 它维护一个通知元素列表，并提供添加通知的接口。
 * 
 * @param manager - 通知管理器实例，负责处理通知的添加逻辑
 * 
 * @returns 返回一个元组：
 *   - [0]: 添加通知的函数，接受NotificationConfig作为参数
 *   - [1]: React Fragment包裹的通知列表渲染元素
 * 
 * @example
 *