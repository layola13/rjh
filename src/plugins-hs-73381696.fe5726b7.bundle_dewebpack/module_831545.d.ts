import { HSApp } from './HSApp';
import { Handler } from './Handler';

declare namespace HSFPConstants {
  /**
   * 插件类型枚举
   */
  enum PluginType {
    /** 工具栏插件 */
    Toolbar = 'Toolbar',
    /** 属性栏插件 */
    PropertyBar = 'PropertyBar',
    /** 左侧菜单插件 */
    LeftMenu = 'LeftMenu',
    /** 目录插件 */
    Catalog = 'Catalog',
    /** 页面头部插件 */
    PageHeader = 'PageHeader',
    /** 布局模式插件 */
    LayoutMode = 'LayoutMode',
    /** 调整组件大小插件 */
    ResizeWidget = 'ResizeWidget'
  }
}

/**
 * 插件配置接口
 */
interface PluginConfig {
  /** 插件名称 */
  name: string;
  /** 插件描述 */
  description: string;
  /** 依赖的插件类型列表 */
  dependencies: Array<HSFPConstants.PluginType | string>;
}

/**
 * 插件基类接口
 */
declare abstract class IPlugin {
  /**
   * 构造函数
   * @param config - 插件配置
   */
  constructor(config: PluginConfig);

  /**
   * 插件激活时的回调方法
   * @param event - 激活事件对象
   * @param context - 上下文对象
   */
  onActive(event: unknown, context: unknown): void;
}

/**
 * 布局模式插件类
 * 用于管理编辑器的布局模式切换和相关功能
 */
declare class LayoutModePlugin extends IPlugin {
  /** 布局模式处理器实例 */
  private handler: Handler;

  /**
   * 创建布局模式插件实例
   */
  constructor();

  /**
   * 插件激活时的回调方法
   * 初始化布局模式处理器并传递上下文
   * @param event - 激活事件对象
   * @param context - 应用上下文对象
   */
  onActive(event: unknown, context: unknown): void;
}

declare namespace HSApp.Plugin {
  /**
   * 注册插件到应用中
   * @param pluginType - 插件类型标识
   * @param pluginClass - 插件类构造函数
   */
  function registerPlugin(
    pluginType: HSFPConstants.PluginType,
    pluginClass: new () => IPlugin
  ): void;

  export { IPlugin };
}

// 模块导出
export { LayoutModePlugin, HSFPConstants, HSApp };