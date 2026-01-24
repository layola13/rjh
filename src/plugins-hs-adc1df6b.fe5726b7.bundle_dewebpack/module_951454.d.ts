/**
 * 参数化开孔建模插件模块
 * 提供自定义参数化建模功能，包括开孔的添加、移动、编辑、旋转等操作
 */

import { HSApp } from './core/HSApp';
import { HSCore } from './core/HSCore';
import { IPlugin } from './core/IPlugin';
import { SignalHook } from './core/SignalHook';
import { CommandManager } from './core/CommandManager';
import { TransactionManager } from './core/TransactionManager';

/**
 * 插件激活上下文
 */
export interface PluginContext {
  /** 应用程序实例 */
  app: {
    /** 命令管理器 */
    cmdManager: CommandManager;
    /** 事务管理器 */
    transManager: TransactionManager;
  };
}

/**
 * 属性栏插件接口
 */
export interface PropertyBarPlugin extends IPlugin {
  /** 属性栏填充信号 */
  signalPopulatePropertyBar: unknown;
}

/**
 * 插件依赖映射
 */
export interface PluginDependencies {
  [HSFPConstants.PluginType.PropertyBar]: PropertyBarPlugin;
  [key: string]: IPlugin;
}

/**
 * 属性栏填充事件参数
 */
export interface PopulatePropertyBarEvent {
  /** 目标对象 */
  target?: unknown;
  /** 属性数据 */
  properties?: Record<string, unknown>;
}

/**
 * 插件元数据
 */
export interface PluginMetadata {
  /** 插件名称 */
  name: string;
  /** 插件描述 */
  description: string;
  /** 依赖的插件类型列表 */
  dependencies: string[];
}

/**
 * 参数化开孔事件处理器
 * 负责处理参数化开孔相关的UI交互和业务逻辑
 */
export interface ParametricOpeningHandler {
  /**
   * 处理属性栏填充事件
   * @param event - 属性栏填充事件参数
   */
  onPopulatePropertyBar(event: PopulatePropertyBarEvent): void;
}

/**
 * 参数化开孔插件
 * 提供自定义参数化建模功能，支持对开孔进行各种操作
 * 
 * @remarks
 * 该插件依赖于以下插件：
 * - ContextualTools: 上下文工具
 * - PropertyBar: 属性栏
 * - Toolbar: 工具栏
 * - Catalog: 目录
 * - PageHeader: 页面标题
 * - DoorStone: 门槛石
 * - UserGuide: 用户指南
 * - Feedback: 反馈系统
 */
export declare class ParametricOpeningPlugin extends IPlugin {
  /**
   * 信号钩子，用于监听和触发插件事件
   */
  signalHook: SignalHook;

  /**
   * 属性栏插件实例引用
   */
  propertyBarPlugin: PropertyBarPlugin | undefined;

  /**
   * 参数化开孔事件处理器
   */
  handler: ParametricOpeningHandler | undefined;

  /**
   * 构造函数
   * 初始化插件元数据和信号钩子
   */
  constructor();

  /**
   * 插件激活生命周期钩子
   * 注册命令和事务处理器，初始化事件监听
   * 
   * @param context - 插件上下文，包含应用实例
   * @param dependencies - 依赖的插件实例映射
   * 
   * @remarks
   * 注册的命令包括：
   * - MoveOpening: 移动开孔
   * - EditParametricOpening: 编辑参数化开孔
   * - ChangeParametricOpeningMeta: 修改参数化开孔元数据
   * - EditParametricopeningHole: 编辑参数化开孔洞
   * - RotateHole: 旋转孔洞
   * 
   * 注册的事务包括：
   * - MoveRoofOpening: 移动屋顶开孔请求
   * - MoveOpening: 移动开孔请求
   * - AddOpening: 添加开孔请求
   * - EditParametricOpening: 编辑参数化开孔请求
   * - AddParametricOpening: 添加参数化开孔请求
   * - EditParametricOpeningHoleRequest: 编辑参数化开孔洞请求
   * - RotateHole: 旋转孔洞请求
   */
  onActive(context: PluginContext, dependencies: PluginDependencies): void;

  /**
   * 属性栏填充事件处理函数
   * 当属性栏需要显示内容时调用
   * 
   * @param event - 属性栏填充事件参数
   */
  onPopulatePropertyBar(event: PopulatePropertyBarEvent): void;

  /**
   * 插件停用生命周期钩子
   * 清理事件监听器和资源
   */
  onDeactive(): void;
}

/**
 * 注册参数化开孔插件到插件系统
 * 
 * @remarks
 * 插件类型标识: HSFPConstants.PluginType.ParametricOpening
 */
export function registerParametricOpeningPlugin(): void;