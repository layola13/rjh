/**
 * Vue消息提示组件模块
 * 提供success、error、warning、info四种类型的消息提示功能
 */

import Vue from 'vue';

/**
 * 消息提示位置配置
 */
export interface MessagePosition {
  /** 是否显示在顶部 */
  top?: boolean;
  /** 是否显示在底部 */
  bottom?: boolean;
  /** 是否显示在左侧 */
  left?: boolean;
  /** 是否显示在右侧 */
  right?: boolean;
}

/**
 * 消息提示配置选项
 */
export interface MessageOptions {
  /** 提示位置，可选值：'top', 'bottom', 'left', 'right' 及其组合，如 'top-right' */
  position?: string;
  /** 自动关闭时间(毫秒)，0表示不自动关闭，默认3000ms */
  timeout?: number;
  /** 是否隐藏关闭按钮 */
  hideClose?: boolean;
  /** 自定义关闭按钮文本 */
  closeText?: string;
  /** 关闭回调函数 */
  callback?: () => void;
}

/**
 * 消息类型
 */
export type MessageType = 'success' | 'error' | 'warning' | 'info';

/**
 * 颜色配置
 */
export interface ColorConfig {
  /** 背景颜色 */
  background: string;
  /** 文字颜色 */
  text: string;
}

/**
 * 组件属性定义
 */
export interface MessageProps {
  /** 是否显示消息 */
  show: boolean;
  /** 消息类型 */
  type: MessageType;
  /** 显示位置 */
  position: string;
  /** 消息文本内容 */
  text: string;
  /** 自动关闭超时时间 */
  timeout: number;
  /** 是否隐藏关闭按钮 */
  hideClose: boolean;
  /** 关闭按钮文本 */
  closeText: string;
  /** 关闭回调 */
  callback?: () => void;
}

/**
 * Vue消息组件实例
 */
export interface VMessageComponent extends Vue {
  /** 消息类型 */
  type: MessageType;
  /** 是否显示 */
  show: boolean;
  /** 显示位置 */
  position: string;
  /** 消息文本 */
  text: string;
  /** 超时时间 */
  timeout: number;
  /** 是否隐藏关闭按钮 */
  hideClose: boolean;
  /** 关闭按钮文本 */
  closeText: string;
  /** 关闭回调 */
  callback?: () => void;
  /** 颜色配置 */
  colors: ColorConfig;
  /** 最终位置配置 */
  final_position: MessagePosition;
  /** 关闭消息 */
  close(): void;
}

/**
 * 消息提示API
 */
export interface MessageAPI {
  /**
   * 显示警告消息
   * @param text 消息文本
   * @param options 配置选项
   * @returns 消息组件实例
   */
  warning(text: string, options?: MessageOptions): VMessageComponent;

  /**
   * 显示成功消息
   * @param text 消息文本
   * @param options 配置选项
   */
  success(text: string, options?: MessageOptions): void;

  /**
   * 显示信息消息
   * @param text 消息文本
   * @param options 配置选项
   */
  info(text: string, options?: MessageOptions): void;

  /**
   * 显示错误消息
   * @param text 消息文本
   * @param options 配置选项
   */
  error(text: string, options?: MessageOptions): void;
}

declare const messageAPI: MessageAPI;

export default messageAPI;