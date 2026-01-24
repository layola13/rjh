/**
 * Ant Design Notification 组件类型定义
 * 模块ID: 474175
 * 提供全局通知提醒功能，支持多种类型(success/info/warning/error)和位置配置
 */

import type { ReactNode, CSSProperties } from 'react';

/**
 * 通知位置类型
 * - topLeft: 左上角
 * - topRight: 右上角（默认）
 * - bottomLeft: 左下角
 * - bottomRight: 右下角
 */
export type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

/**
 * 通知类型
 * - success: 成功提示
 * - info: 信息提示
 * - warning: 警告提示
 * - error: 错误提示
 */
export type NotificationType = 'success' | 'info' | 'warning' | 'error';

/**
 * 通知配置选项
 */
export interface NotificationConfig {
  /**
   * 通知消息内容（必填）
   */
  message: ReactNode;

  /**
   * 通知描述内容
   */
  description?: ReactNode;

  /**
   * 自定义图标
   */
  icon?: ReactNode;

  /**
   * 通知类型（会自动显示对应的图标）
   */
  type?: NotificationType;

  /**
   * 自动关闭延迟时间（秒）
   * @default 4.5
   */
  duration?: number;

  /**
   * 通知弹出位置
   * @default 'topRight'
   */
  placement?: NotificationPlacement;

  /**
   * 距离顶部的距离（像素）
   * @default 24
   */
  top?: number;

  /**
   * 距离底部的距离（像素）
   * @default 24
   */
  bottom?: number;

  /**
   * 自定义类名前缀
   * @default 'ant-notification'
   */
  prefixCls?: string;

  /**
   * 自定义关闭图标
   */
  closeIcon?: ReactNode;

  /**
   * 配置渲染节点的输出位置
   */
  getContainer?: () => HTMLElement;

  /**
   * 唯一标识，可用于更新或关闭通知
   */
  key?: string;

  /**
   * 自定义样式
   */
  style?: CSSProperties;

  /**
   * 自定义类名
   */
  className?: string;

  /**
   * 自定义按钮
   */
  btn?: ReactNode;

  /**
   * 点击通知时的回调
   */
  onClick?: () => void;

  /**
   * 关闭通知时的回调
   */
  onClose?: () => void;

  /**
   * 是否支持 RTL（从右到左）
   * @default false
   */
  rtl?: boolean;
}

/**
 * 全局配置选项
 */
export interface GlobalConfig {
  /**
   * 默认自动关闭延迟时间（秒）
   * @default 4.5
   */
  duration?: number;

  /**
   * 默认通知弹出位置
   * @default 'topRight'
   */
  placement?: NotificationPlacement;

  /**
   * 距离顶部的距离（像素）
   * @default 24
   */
  top?: number;

  /**
   * 距离底部的距离（像素）
   * @default 24
   */
  bottom?: number;

  /**
   * 自定义类名前缀
   * @default 'ant-notification'
   */
  prefixCls?: string;

  /**
   * 配置渲染节点的输出位置
   */
  getContainer?: () => HTMLElement;

  /**
   * 自定义关闭图标
   */
  closeIcon?: ReactNode;

  /**
   * 是否支持 RTL（从右到左）
   * @default false
   */
  rtl?: boolean;
}

/**
 * 通知实例接口
 */
export interface NotificationInstance {
  /**
   * 打开通知
   */
  notice: (config: NotificationConfig) => void;

  /**
   * 移除指定通知
   */
  removeNotice: (key: string) => void;

  /**
   * 销毁通知实例
   */
  destroy: () => void;
}

/**
 * useNotification Hook 返回值
 */
export interface UseNotificationResult {
  /**
   * 打开通知
   */
  open: (config: NotificationConfig) => void;

  /**
   * 成功通知
   */
  success: (config: Omit<NotificationConfig, 'type'>) => void;

  /**
   * 信息通知
   */
  info: (config: Omit<NotificationConfig, 'type'>) => void;

  /**
   * 警告通知
   */
  warning: (config: Omit<NotificationConfig, 'type'>) => void;

  /**
   * 错误通知
   */
  error: (config: Omit<NotificationConfig, 'type'>) => void;

  /**
   * 关闭指定通知
   */
  close: (key: string) => void;

  /**
   * 销毁所有通知
   */
  destroy: () => void;
}

/**
 * Notification API 接口
 */
export interface NotificationAPI {
  /**
   * 打开通知提醒框
   * @param config 通知配置
   */
  open: (config: NotificationConfig) => void;

  /**
   * 成功通知
   * @param config 通知配置（自动设置 type='success'）
   */
  success: (config: Omit<NotificationConfig, 'type'>) => void;

  /**
   * 信息通知
   * @param config 通知配置（自动设置 type='info'）
   */
  info: (config: Omit<NotificationConfig, 'type'>) => void;

  /**
   * 警告通知（warn 是 warning 的别名）
   * @param config 通知配置（自动设置 type='warning'）
   */
  warning: (config: Omit<NotificationConfig, 'type'>) => void;

  /**
   * 警告通知（warning 的别名）
   * @param config 通知配置（自动设置 type='warning'）
   */
  warn: (config: Omit<NotificationConfig, 'type'>) => void;

  /**
   * 错误通知
   * @param config 通知配置（自动设置 type='error'）
   */
  error: (config: Omit<NotificationConfig, 'type'>) => void;

  /**
   * 关闭指定的通知
   * @param key 通知的唯一标识
   */
  close: (key: string) => void;

  /**
   * 全局配置
   * @param config 全局配置选项
   */
  config: (config: GlobalConfig) => void;

  /**
   * 销毁所有通知
   */
  destroy: () => void;

  /**
   * React Hook 用法，获取 contextHolder 和 api
   * @returns [api, contextHolder]
   */
  useNotification: () => [UseNotificationResult, ReactNode];
}

/**
 * 获取通知实例（异步方法）
 * @returns Promise<null> 始终返回 null（保留用于兼容性）
 * @deprecated 此方法已废弃，建议使用 useNotification Hook
 */
export declare function getInstance(): Promise<null>;

/**
 * Notification 默认导出
 * 提供全局通知提醒功能
 */
declare const notification: NotificationAPI;

export default notification;