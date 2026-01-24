/**
 * 协作编辑插件模块
 * 提供多人协同编辑功能，依赖持久化插件进行数据存储
 */

import { HSApp } from 'hsw-core';
import { CollaborateEditHandle } from './CollaborateEditHandle';

/**
 * 插件依赖配置
 */
interface PluginDependencies {
  /** 持久化插件实例 */
  'hsw.plugin.persistence.Plugin': PersistencePlugin;
}

/**
 * 持久化插件接口
 */
interface PersistencePlugin {
  // 根据实际持久化插件的API定义具体方法
  [key: string]: unknown;
}

/**
 * 协作编辑插件
 * 继承自HSApp插件系统的基础插件接口
 */
declare class CollaborateEditPlugin extends HSApp.Plugin.IPlugin {
  /**
   * 协作编辑处理器实例
   * 负责协作编辑的核心逻辑处理
   */
  handle: CollaborateEditHandle;

  /**
   * 构造函数
   * 初始化插件并声明依赖项
   */
  constructor();

  /**
   * 插件激活钩子
   * 当插件被激活时调用，用于初始化协作编辑功能
   * 
   * @param context - 插件上下文对象
   * @param dependencies - 依赖的插件实例映射表
   */
  onActive(context: unknown, dependencies: PluginDependencies): void;

  /**
   * 插件停用钩子
   * 当插件被停用时调用，用于清理资源
   */
  onDeactive(): void;

  /**
   * 检查当前是否处于协作模式
   * 
   * @returns 如果当前处于协作编辑模式返回true，否则返回false
   */
  isCollaborate(): boolean;
}

/**
 * 协作编辑处理器声明
 */
declare module './CollaborateEditHandle' {
  export class CollaborateEditHandle {
    /**
     * 初始化协作编辑处理器
     * 
     * @param persistencePlugin - 持久化插件实例
     */
    init(persistencePlugin: PersistencePlugin): void;

    /**
     * 当前是否处于协作编辑模式
     */
    isCollaborate: boolean;
  }
}

/**
 * HSApp插件系统扩展
 */
declare module 'hsw-core' {
  namespace HSApp.Plugin {
    /**
     * 插件基类接口
     */
    abstract class IPlugin {
      constructor(config?: { dependencies?: string[] });
      abstract onActive(context: unknown, dependencies: Record<string, unknown>): void;
      abstract onDeactive(): void;
    }

    /**
     * 注册插件到插件系统
     * 
     * @param pluginType - 插件类型标识符
     * @param pluginClass - 插件类构造函数
     */
    function registerPlugin(
      pluginType: string,
      pluginClass: new () => IPlugin
    ): void;
  }
}

/**
 * HSF平台常量定义
 */
declare global {
  namespace HSFPConstants {
    /**
     * 插件类型枚举
     */
    enum PluginType {
      /** 协作编辑插件类型 */
      CollaborateEdit = 'CollaborateEdit'
    }
  }
}

export default CollaborateEditPlugin;