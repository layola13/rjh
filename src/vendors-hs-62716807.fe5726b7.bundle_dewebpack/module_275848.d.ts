import type { ReactNode, CSSProperties } from 'react';

/**
 * 通知消息的类型
 */
export type NotificationType = 'success' | 'info' | 'warning' | 'error';

/**
 * 通知位置类型
 */
export type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

/**
 * 通知配置选项
 */
export interface NotificationConfig {
  /** 通知消息的标题 */
  message: ReactNode;
  
  /** 通知消息的详细描述内容 */
  description?: ReactNode;
  
  /** 自定义图标 */
  icon?: ReactNode;
  
  /** 通知类型，不同类型会显示不同的图标 */
  type?: NotificationType;
  
  /** 自动关闭的延迟时间（秒），默认 4.5 秒，设置为 0 则不自动关闭 */
  duration?: number;
  
  /** 自定义关闭按钮 */
  btn?: ReactNode;
  
  /** 唯一标识，用于更新或关闭特定通知 */
  key?: string;
  
  /** 点击通知时的回调函数 */
  onClick?: () => void;
  
  /** 关闭通知时的回调函数 */
  onClose?: () => void;
  
  /** 自定义内联样式 */
  style?: CSSProperties;
  
  /** 自定义 CSS 类名 */
  className?: string;
  
  /** 通知弹出位置，默认 'topRight' */
  placement?: NotificationPlacement;
  
  /** 距离顶部的距离（像素），默认 24 */
  top?: number;
  
  /** 距离底部的距离（像素），默认 24 */
  bottom?: number;
  
  /** 自定义渲染容器的函数 */
  getContainer?: () => HTMLElement;
  
  /** 自定义关闭图标 */
  closeIcon?: ReactNode;
  
  /** 自定义样式前缀，默认 'ant-notification' */
  prefixCls?: string;
  
  /** 是否为 RTL 布局 */
  rtl?: boolean;
}

/**
 * 全局配置选项（只包含可配置的部分）
 */
export interface GlobalNotificationConfig {
  /** 默认自动关闭延迟时间（秒） */
  duration?: number;
  
  /** 默认通知弹出位置 */
  placement?: NotificationPlacement;
  
  /** 默认距离顶部的距离（像素） */
  top?: number;
  
  /** 默认距离底部的距离（像素） */
  bottom?: number;
  
  /** 默认渲染容器函数 */
  getContainer?: () => HTMLElement;
  
  /** 默认关闭图标 */
  closeIcon?: ReactNode;
  
  /** 自定义样式前缀 */
  prefixCls?: string;
  
  /** 是否为 RTL 布局 */
  rtl?: boolean;
}

/**
 * 通知实例对象
 */
export interface NotificationInstance {
  /** 通知样式前缀 */
  prefixCls: string;
  
  /** 通知管理器实例 */
  instance: {
    /** 显示通知 */
    notice: (config: unknown) => void;
    
    /** 移除指定通知 */
    removeNotice: (key: string) => void;
    
    /** 销毁通知管理器 */
    destroy: () => void;
  };
}

/**
 * 通知 API 对象
 */
export interface NotificationApi {
  /**
   * 打开一个通知框
   * @param config 通知配置选项
   */
  open(config: NotificationConfig): void;
  
  /**
   * 显示成功通知
   * @param config 通知配置选项
   */
  success(config: NotificationConfig): void;
  
  /**
   * 显示信息通知
   * @param config 通知配置选项
   */
  info(config: NotificationConfig): void;
  
  /**
   * 显示警告通知
   * @param config 通知配置选项
   */
  warning(config: NotificationConfig): void;
  
  /**
   * 显示警告通知（warning 的别名）
   * @param config 通知配置选项
   */
  warn(config: NotificationConfig): void;
  
  /**
   * 显示错误通知
   * @param config 通知配置选项
   */
  error(config: NotificationConfig): void;
  
  /**
   * 关闭指定 key 的通知
   * @param key 通知的唯一标识
   */
  close(key: string): void;
  
  /**
   * 全局配置通知
   * @param config 全局配置选项
   */
  config(config: GlobalNotificationConfig): void;
  
  /**
   * 销毁所有通知
   */
  destroy(): void;
  
  /**
   * 使用 Hook 方式调用通知（用于函数组件）
   * @returns 返回通知 API 和上下文持有者组件
   */
  useNotification(): [NotificationApi, ReactNode];
}

/**
 * 获取通知实例（异步方法）
 * @returns Promise，resolve 时返回 null（此方法可能是占位实现）
 */
export declare function getInstance(): Promise<null>;

declare const notification: NotificationApi;

export default notification;