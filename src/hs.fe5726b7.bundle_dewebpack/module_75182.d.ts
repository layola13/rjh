/**
 * LiveHint 消息提示模块
 * 提供全局消息提示功能，支持多种状态和自定义配置
 */

import { Message } from 'some-ui-library';
import { uuid } from 'uuid-library';

/**
 * 消息状态枚举
 */
export enum MessageStatus {
  /** 加载中状态 */
  loading = 'loading',
  /** 警告状态 */
  warning = 'warning',
  /** 完成状态 */
  completed = 'completed',
  /** 可操作状态 */
  canops = 'canops'
}

/**
 * 应用模式类型枚举
 */
export enum ModeType {
  iframe = 'iframe'
}

/**
 * 消息显示选项配置
 */
export interface MessageShowOptions {
  /** 消息唯一标识 */
  id?: string;
  /** 消息状态 */
  status?: MessageStatus;
  /** 是否可关闭 */
  canclose?: boolean;
  /** 距离顶部距离（像素） */
  top?: number;
  /** 是否启用动画 */
  animation?: boolean;
  /** 关闭回调函数 */
  onClose?: () => void;
  /** 关闭后回调函数 */
  closeCallback?: () => void;
  /** 追加的内容 */
  append?: string;
}

/**
 * 应用参数配置
 */
export interface AppParams {
  /** 应用模式 */
  mode?: ModeType;
}

/**
 * 应用实例接口
 */
export interface AppInstance {
  /** 应用参数 */
  appParams?: AppParams;
  /** 当前激活的环境ID */
  activeEnvironmentId?: string;
  /** 插件管理器 */
  pluginManager: {
    getPlugin(type: string): {
      getToolbarHeight(): number;
    };
  };
}

/**
 * 创建的标记对象
 */
export interface DangerousHTML {
  __html: string;
}

/**
 * LiveHint 消息提示管理器
 * 用于在应用中显示各种状态的提示消息
 */
export interface LiveHintManager {
  /** 内部UUID标识 */
  readonly _uuid: string;
  
  /** 隐藏时的偏移量 */
  readonly _offsetTopHide: number;
  
  /** 应用实例 */
  readonly _app: AppInstance;
  
  /** 状态枚举 */
  readonly statusEnum: typeof MessageStatus;
  
  /** 当前消息ID */
  id: string;

  /**
   * 绑定默认操作事件
   * @param actions - 单个或多个点击事件处理函数
   */
  bindDefaultAction(actions: EventListener | EventListener[]): void;

  /**
   * 创建危险的HTML标记对象
   * @param htmlContent - HTML内容字符串
   * @returns 包含__html属性的对象
   */
  createMarkup(htmlContent: string): DangerousHTML;

  /**
   * 获取偏移类名
   * @returns 根据应用模式和配置返回对应的CSS类名
   * @private
   */
  _getOffsetClassName(): string;

  /**
   * 设置单例模式
   * @param isSingle - 是否启用单例模式（同时只显示一个消息）
   */
  setSinglePattern(isSingle: boolean): void;

  /**
   * 显示消息提示
   * @param content - 消息内容（支持HTML）
   * @param duration - 显示持续时间（毫秒），0表示不自动关闭
   * @param actions - 操作按钮的点击事件处理函数
   * @param options - 额外配置选项
   */
  show(
    content: string,
    duration: number,
    actions?: EventListener | EventListener[],
    options?: MessageShowOptions
  ): void;

  /**
   * 隐藏当前消息提示
   */
  hide(): void;

  /**
   * 改变消息提示的z-index层级
   * @param zIndex - 新的z-index值
   */
  changeZIndex(zIndex: number): void;
}

/**
 * LiveHint 单例实例
 */
declare const liveHintManager: LiveHintManager;

export default liveHintManager;