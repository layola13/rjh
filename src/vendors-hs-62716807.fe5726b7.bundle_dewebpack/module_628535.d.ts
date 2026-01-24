/**
 * Ant Design Message 组件类型定义
 * 用于在页面顶部显示全局提示消息
 */

import { ReactNode, CSSProperties } from 'react';

/**
 * 消息配置选项接口
 */
export interface MessageConfig {
  /** 消息距离顶部的位置（像素） */
  top?: number;
  /** 消息默认持续时间（秒），默认为 3 秒 */
  duration?: number;
  /** 消息的类名前缀，默认为 'ant-message' */
  prefixCls?: string;
  /** 获取消息容器的函数 */
  getContainer?: () => HTMLElement;
  /** 过渡动画名称，默认为 'move-up' */
  transitionName?: string;
  /** 同时显示的最大消息数量 */
  maxCount?: number;
  /** 是否启用 RTL（从右到左）模式 */
  rtl?: boolean;
}

/**
 * 消息类型枚举
 */
export type MessageType = 'info' | 'success' | 'error' | 'warning' | 'loading';

/**
 * 消息内容配置接口
 */
export interface MessageContentConfig {
  /** 唯一标识符，用于更新或删除消息 */
  key?: string | number;
  /** 消息持续时间（秒），0 表示不自动关闭 */
  duration?: number;
  /** 消息类型 */
  type?: MessageType;
  /** 消息内容 */
  content: ReactNode;
  /** 自定义图标 */
  icon?: ReactNode;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 关闭时的回调函数 */
  onClose?: () => void;
  /** 点击消息时的回调函数 */
  onClick?: () => void;
}

/**
 * 消息通知实例接口
 */
export interface NoticeInstance {
  /** 添加通知 */
  notice: (config: NoticeConfig) => void;
  /** 移除指定通知 */
  removeNotice: (key: string | number) => void;
  /** 销毁所有通知 */
  destroy: () => void;
}

/**
 * 通知配置接口
 */
export interface NoticeConfig {
  /** 通知的唯一标识 */
  key: string | number;
  /** 持续时间（秒） */
  duration?: number;
  /** 通知内容 */
  content: ReactNode;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 关闭回调 */
  onClose?: () => void;
  /** 点击回调 */
  onClick?: () => void;
}

/**
 * 消息实例创建回调接口
 */
export interface MessageInstanceCallback {
  /** 类名前缀 */
  prefixCls: string;
  /** 通知实例 */
  instance: NoticeInstance;
}

/**
 * 消息返回函数类型
 * 可以直接调用以关闭消息，也可以作为 Promise 使用
 */
export interface MessagePromiseReturn extends Promise<boolean> {
  /** 调用以关闭消息 */
  (): void;
  /** Promise 对象 */
  promise: Promise<boolean>;
  /** Promise 的 then 方法 */
  then: <TResult1 = boolean, TResult2 = never>(
    onfulfilled?: ((value: boolean) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null
  ) => Promise<TResult1 | TResult2>;
}

/**
 * 消息 API 接口
 */
export interface MessageApi {
  /**
   * 显示信息提示
   * @param content - 消息内容或配置对象
   * @param duration - 持续时间（秒）
   * @param onClose - 关闭回调函数
   * @returns 可关闭消息的函数
   */
  info(content: ReactNode | MessageContentConfig, duration?: number, onClose?: () => void): MessagePromiseReturn;

  /**
   * 显示成功提示
   * @param content - 消息内容或配置对象
   * @param duration - 持续时间（秒）
   * @param onClose - 关闭回调函数
   * @returns 可关闭消息的函数
   */
  success(content: ReactNode | MessageContentConfig, duration?: number, onClose?: () => void): MessagePromiseReturn;

  /**
   * 显示错误提示
   * @param content - 消息内容或配置对象
   * @param duration - 持续时间（秒）
   * @param onClose - 关闭回调函数
   * @returns 可关闭消息的函数
   */
  error(content: ReactNode | MessageContentConfig, duration?: number, onClose?: () => void): MessagePromiseReturn;

  /**
   * 显示警告提示
   * @param content - 消息内容或配置对象
   * @param duration - 持续时间（秒）
   * @param onClose - 关闭回调函数
   * @returns 可关闭消息的函数
   */
  warning(content: ReactNode | MessageContentConfig, duration?: number, onClose?: () => void): MessagePromiseReturn;

  /**
   * 显示警告提示（warning 的别名）
   * @param content - 消息内容或配置对象
   * @param duration - 持续时间（秒）
   * @param onClose - 关闭回调函数
   * @returns 可关闭消息的函数
   */
  warn(content: ReactNode | MessageContentConfig, duration?: number, onClose?: () => void): MessagePromiseReturn;

  /**
   * 显示加载提示
   * @param content - 消息内容或配置对象
   * @param duration - 持续时间（秒）
   * @param onClose - 关闭回调函数
   * @returns 可关闭消息的函数
   */
  loading(content: ReactNode | MessageContentConfig, duration?: number, onClose?: () => void): MessagePromiseReturn;

  /**
   * 打开自定义类型的消息
   * @param config - 消息配置对象
   * @returns 可关闭消息的函数
   */
  open(config: MessageContentConfig): MessagePromiseReturn;

  /**
   * 全局配置消息
   * @param config - 全局配置对象
   */
  config(config: MessageConfig): void;

  /**
   * 销毁消息
   * @param key - 要销毁的消息的 key，不传则销毁所有消息
   */
  destroy(key?: string | number): void;

  /**
   * React Hook：在函数组件中使用消息
   * @returns [messageApi, contextHolder] - 消息 API 实例和上下文容器
   */
  useMessage(): [MessageApi, ReactNode];
}

/**
 * 获取消息实例
 * @returns 消息实例（可能为 null）
 * @deprecated 此方法已废弃
 */
export function getInstance(): NoticeInstance | null;

/**
 * 获取当前 key 值并自动递增
 * @returns 当前的 key 值
 */
export function getKeyThenIncreaseKey(): number;

/**
 * 为消息 API 附加类型方法
 * @param api - 消息 API 对象
 * @param type - 消息类型
 */
export function attachTypeApi(api: MessageApi, type: MessageType): void;

/**
 * 默认导出的消息 API
 */
declare const message: MessageApi;

export default message;