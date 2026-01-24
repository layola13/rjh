/**
 * 编辑状态插件模块
 * 提供设计编辑状态管理功能
 */

import { HSApp } from './path/to/HSApp';
import { Handler } from './path/to/Handler';

/**
 * 插件类型常量
 */
declare const HSFPConstants: {
  PluginType: {
    /** 消息中心插件 */
    MessageCenter: string;
    /** 紧急通知插件 */
    EmergencyNoticePlugin: string;
  };
};

/**
 * 插件配置选项
 */
interface PluginConfig {
  /** 插件名称 */
  name: string;
  /** 插件描述 */
  description: string;
  /** 依赖的插件类型列表 */
  dependencies: string[];
}

/**
 * 插件激活时的应用上下文
 */
interface PluginAppContext {
  /** 应用实例 */
  app: HSApp;
}

/**
 * 插件激活参数类型（待补充具体结构）
 */
type PluginActivationParams = unknown;

/**
 * 编辑状态插件类
 * 继承自 HSApp 插件基类，提供设计编辑状态管理能力
 */
declare class EditStatusPlugin extends HSApp.Plugin.IPlugin {
  /**
   * 内部处理器实例
   * @private
   */
  private _handler: Handler;

  /**
   * 构造函数
   * 初始化插件配置和处理器
   */
  constructor();

  /**
   * 插件激活生命周期方法
   * @param context - 应用上下文对象
   * @param params - 激活参数
   */
  onActive(context: PluginAppContext, params: PluginActivationParams): void;
}

/**
 * HSApp 插件系统命名空间扩展
 */
declare namespace HSApp.Plugin {
  /**
   * 插件基类接口
   */
  interface IPlugin {
    /** 插件激活时调用 */
    onActive?(context: PluginAppContext, params: unknown): void;
  }

  /**
   * 注册插件到插件系统
   * @param pluginType - 插件类型标识
   * @param pluginClass - 插件类构造函数
   * @param loader - 异步加载函数，返回 Promise
   */
  function registerPlugin(
    pluginType: string,
    pluginClass: new () => IPlugin,
    loader: () => Promise<void>
  ): void;
}

/**
 * 处理器类（来自 module 262734）
 */
declare namespace Handler {
  class Handler {
    /**
     * 初始化处理器
     * @param app - 应用实例
     * @param params - 初始化参数
     */
    init(app: HSApp, params: unknown): void;
  }
}

export { EditStatusPlugin };