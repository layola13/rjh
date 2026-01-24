/**
 * Sketch2D 插件模块
 * 提供二维草图绘制功能的插件实现
 */

import { HSApp } from './HSApp';
import { Handler } from './Handler';

/**
 * 插件依赖项配置
 */
interface PluginDependencies {
  [HSFPConstants.PluginType.PropertyBar]: unknown;
  [HSFPConstants.PluginType.LeftMenu]: unknown;
}

/**
 * 插件元数据
 */
interface PluginMetadata {
  /** 插件名称 */
  name: string;
  /** 插件描述 */
  description: string;
  /** 依赖的其他插件类型 */
  dependencies: string[];
}

/**
 * 插件初始化上下文
 */
interface PluginContext {
  /** 上下文特定配置 */
  [key: string]: unknown;
}

/**
 * 插件激活选项
 */
interface ActivationOptions {
  [key: string]: unknown;
}

/**
 * Handler 初始化配置
 */
interface HandlerInitConfig {
  /** 插件上下文 */
  context: PluginContext;
  /** 依赖项实例 */
  dependencies: PluginDependencies;
}

/**
 * Sketch2D 插件类
 * 继承自 HSApp 插件基类，提供二维草图绘制功能
 */
declare class Sketch2DPlugin extends HSApp.Plugin.IPlugin {
  /**
   * 草图处理器实例
   */
  handler: Handler;

  /**
   * 构造函数
   * 初始化 Sketch2D 插件及其处理器
   */
  constructor();

  /**
   * 插件激活回调
   * 当插件被激活时调用，初始化处理器并设置上下文
   * 
   * @param context - 插件运行上下文
   * @param dependencies - 已加载的依赖插件实例
   */
  onActive(
    context: PluginContext,
    dependencies: PluginDependencies
  ): void;
}

/**
 * 全局常量命名空间
 */
declare namespace HSFPConstants {
  /**
   * 插件类型枚举
   */
  enum PluginType {
    /** 属性栏插件 */
    PropertyBar = 'PropertyBar',
    /** 左侧菜单插件 */
    LeftMenu = 'LeftMenu',
    /** Sketch2D 插件 */
    Sketch2d = 'Sketch2d'
  }
}

/**
 * 注册 Sketch2D 插件到应用程序
 */
declare function registerSketch2DPlugin(): void;

export { Sketch2DPlugin, PluginContext, PluginDependencies, HandlerInitConfig };