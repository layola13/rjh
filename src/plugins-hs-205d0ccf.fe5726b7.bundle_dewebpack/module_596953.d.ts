/**
 * 屋顶障碍物插件模块
 * 用于处理屋顶上的障碍物对象
 */

import { IPlugin, PluginConfig } from './IPlugin';
import { Application } from './Application';
import { PluginType } from './PluginType';

/**
 * 屋顶障碍物处理器接口
 * 负责初始化和清理屋顶障碍物的相关逻辑
 */
interface IRoofObstacleHandler {
  /**
   * 初始化处理器
   * @param app - 应用程序实例
   * @param config - 插件配置对象
   */
  init(app: Application, config: unknown): void;

  /**
   * 清理处理器资源
   */
  uninit(): void;
}

/**
 * 屋顶障碍物处理器类
 */
declare class RoofObstacleHandler implements IRoofObstacleHandler {
  constructor();
  init(app: Application, config: unknown): void;
  uninit(): void;
}

/**
 * 屋顶障碍物插件类
 * 继承自HSApp插件系统的基础插件接口
 * 
 * @remarks
 * 该插件依赖以下插件：
 * - ContextualTools: 上下文工具
 * - PropertyBar: 属性栏
 * - Catalog: 目录
 * - MaterialImage: 材质图像
 * - LeftMenu: 左侧菜单
 * - RightMenu: 右侧菜单
 */
declare class RoofObstaclePlugin extends IPlugin {
  /**
   * 内部处理器实例
   */
  private readonly _handler: RoofObstacleHandler;

  /**
   * 构造函数
   * 初始化插件配置和处理器
   */
  constructor();

  /**
   * 插件激活时的回调
   * @param app - 应用程序实例
   * @param config - 插件配置对象
   */
  onActive(app: Application, config: unknown): void;

  /**
   * 插件停用时的回调
   * 清理所有资源和事件监听器
   */
  onDeactive(): void;
}

/**
 * 插件注册声明
 * 将屋顶障碍物插件注册到HSApp插件系统
 */
declare namespace HSApp.Plugin {
  /**
   * 注册插件到应用程序
   * @param pluginType - 插件类型标识符
   * @param pluginClass - 插件类构造函数
   */
  function registerPlugin(
    pluginType: PluginType.RoofObstacle,
    pluginClass: typeof RoofObstaclePlugin
  ): void;
}

/**
 * 插件类型常量
 */
declare enum PluginType {
  /** 屋顶障碍物插件 */
  RoofObstacle = 'RoofObstacle',
  /** 上下文工具插件 */
  ContextualTools = 'ContextualTools',
  /** 属性栏插件 */
  PropertyBar = 'PropertyBar',
  /** 目录插件 */
  Catalog = 'Catalog',
  /** 材质图像插件 */
  MaterialImage = 'MaterialImage',
  /** 左侧菜单插件 */
  LeftMenu = 'LeftMenu',
  /** 右侧菜单插件 */
  RightMenu = 'RightMenu',
}

export { RoofObstaclePlugin, RoofObstacleHandler, PluginType };