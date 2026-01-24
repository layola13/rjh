/**
 * 通知反馈处理器
 * 用于处理和显示系统通知消息
 */

import type { ReactNode } from 'react';

/**
 * 状态枚举类型
 * 扩展自 StateEnum，增加了 MESSAGE 状态
 */
export type StateType = 'MESSAGE' | string;

/**
 * 通知内容模板参数
 */
export interface ContentTemplateParams {
  /** 通知描述文本 */
  description?: string;
  /** 消息数量 */
  msgNumber?: number;
}

/**
 * 通知内容结构
 */
export interface NotificationContent {
  /** 通知标题 */
  title: string;
  /** 通知描述 */
  description: string;
  /** 图标名称 */
  iconName: string;
}

/**
 * 反馈通知处理器类
 * 负责管理和显示应用内的通知消息，支持消息频率计算
 */
export default class FeedbackNotificationHandler {
  /**
   * 消息时间戳数组
   * 用于计算特定时间窗口内的消息数量
   * @private
   */
  private _msgTimeArr: number[];

  /**
   * 构造函数
   * 初始化消息时间戳数组
   */
  constructor();

  /**
   * 处理通知显示
   * @param state - 通知状态类型
   * @param description - 通知描述内容
   * @param callback - 点击通知后的回调函数
   */
  handle(state: StateType, description: string, callback: () => void): void;

  /**
   * 显示通知弹窗
   * @param content - 通知内容对象
   * @param callback - 点击通知后的回调函数
   * @private
   */
  private showNotification(content: NotificationContent, callback: () => void): void;

  /**
   * 根据状态类型生成通知内容模板
   * @param state - 通知状态类型
   * @param params - 模板参数
   * @returns 格式化后的通知内容
   * @private
   */
  private contentTemplate(state: StateType, params: ContentTemplateParams): NotificationContent;

  /**
   * 计算消息数量
   * 统计最近30秒内的消息数量
   * @returns 消息数量
   * @private
   */
  private calculateMsgNumber(): number;
}

/**
 * 状态枚举常量
 */
export const StateEnum: {
  readonly MESSAGE: 'MESSAGE';
  [key: string]: string;
};