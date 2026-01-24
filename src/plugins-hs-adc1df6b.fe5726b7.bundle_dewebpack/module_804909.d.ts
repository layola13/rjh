/**
 * 参数化楼梯插件模块
 * 提供自定义楼梯功能，依赖属性栏和首次登录插件
 */

import { HSApp } from 'hsw-core';

/**
 * 楼梯类型处理器接口
 * 负责楼梯类型的获取和管理
 */
interface IStairHandler {
  /**
   * 初始化处理器
   * @param context - 插件上下文
   * @param options - 初始化选项
   */
  init(context: unknown, options: unknown): void;

  /**
   * 反初始化处理器，清理资源
   */
  uninit(): void;

  /**
   * 获取楼梯类型数据
   */
  fetchStairTypes(): void;
}

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
 * 插件类型常量命名空间
 */
declare namespace HSFPConstants {
  enum PluginType {
    /** 属性栏插件 */
    PropertyBar = 'PropertyBar',
    /** 参数化楼梯插件 */
    ParametricStair = 'ParametricStair'
  }
}

/**
 * 自定义楼梯插件类
 * 继承自HSApp插件基类，提供参数化楼梯功能
 */
export declare class CustomizedStairPlugin extends HSApp.Plugin.IPlugin {
  /**
   * 楼梯处理器实例
   */
  private handler: IStairHandler;

  /**
   * 构造函数
   * 初始化插件配置和楼梯处理器
   */
  constructor();

  /**
   * 插件激活时的回调
   * @param context - 插件运行上下文
   * @param options - 激活选项参数
   */
  onActive(context: unknown, options: unknown): void;

  /**
   * 插件停用时的回调
   * 清理资源和事件监听
   */
  onDeactive(): void;
}

/**
 * 插件注册声明
 * 将自定义楼梯插件注册到HSApp插件系统
 */
declare module 'hsw-core' {
  namespace HSApp.Plugin {
    /**
     * 注册插件到指定类型
     * @param pluginType - 插件类型标识
     * @param pluginClass - 插件类构造函数
     */
    function registerPlugin(
      pluginType: HSFPConstants.PluginType,
      pluginClass: typeof CustomizedStairPlugin
    ): void;

    /**
     * 插件基类接口
     */
    abstract class IPlugin {
      /**
       * 插件激活回调
       * @param context - 上下文对象
       * @param options - 选项参数
       */
      abstract onActive(context: unknown, options: unknown): void;

      /**
       * 插件停用回调
       */
      abstract onDeactive(): void;
    }
  }
}