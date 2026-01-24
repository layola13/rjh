/**
 * EZHome 消息中心插件模块
 * 提供消息监听、取消监听和连接信号获取功能
 */

import { HSApp } from './518193';
import { Handler } from './607266';

/**
 * 消息中心插件类
 * 继承自HSApp插件接口，提供消息处理能力
 */
declare class MessageCenterPlugin extends HSApp.Plugin.IPlugin {
  /**
   * 消息处理器实例
   */
  private handler: Handler;

  /**
   * 构造函数
   * 初始化插件元数据和消息处理器
   */
  constructor();

  /**
   * 插件激活时的回调
   * @param e - 激活事件参数
   * @param t - 额外的上下文参数
   */
  onActive(e: unknown, t: unknown): void;

  /**
   * 插件停用时的回调
   */
  onDeactive(): void;

  /**
   * 获取连接信号
   * @returns 连接信号对象
   */
  getConnectSignal(): ReturnType<Handler['getConnectSignal']>;

  /**
   * 监听指定消息
   * @param eventName - 事件名称
   * @param callback - 事件回调函数
   * @returns 监听操作的结果
   */
  listen(eventName: unknown, callback: unknown): ReturnType<Handler['listen']>;

  /**
   * 取消监听指定消息
   * @param eventName - 事件名称
   * @param callback - 事件回调函数
   * @returns 取消监听操作的结果
   */
  unlisten(eventName: unknown, callback: unknown): ReturnType<Handler['unlisten']>;
}

/**
 * 插件元数据接口
 */
interface PluginMetadata {
  /** 插件名称 */
  name: string;
  /** 插件描述 */
  description: string;
  /** 插件依赖列表 */
  dependencies: string[];
}

/**
 * 全局常量声明
 */
declare const HSFPConstants: {
  PluginType: {
    MessageCenter: string;
  };
};

export { MessageCenterPlugin, PluginMetadata };