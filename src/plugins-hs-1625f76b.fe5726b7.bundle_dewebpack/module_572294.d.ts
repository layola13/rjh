/**
 * Content Styler Plugin - 快速复用内容样式到其他元素
 * 提供样式复制、应用和管理功能
 */

declare namespace HSApp.Plugin {
  /**
   * 插件基类接口
   */
  interface IPlugin {
    /** 插件名称 */
    name: string;
    /** 插件描述 */
    description: string;
    /** 依赖的插件类型列表 */
    dependencies: string[];
    
    /**
     * 插件激活时的回调
     * @param context 应用上下文
     * @param dependencies 依赖的插件实例集合
     */
    onActive(context: PluginContext, dependencies: Record<string, unknown>): void;
  }

  /**
   * 插件上下文
   */
  interface PluginContext {
    /** 应用实例 */
    app: HSApp.App;
  }

  /**
   * 注册插件到系统
   * @param pluginType 插件类型标识
   * @param pluginClass 插件类构造函数
   */
  function registerPlugin(
    pluginType: string,
    pluginClass: new () => IPlugin
  ): void;
}

declare namespace HSApp {
  /**
   * 应用主类
   */
  class App {
    /** 选择管理器 */
    selectionManager: SelectionManager;

    /**
     * 获取当前应用实例
     */
    static getApp(): App;
  }

  /**
   * 选择管理器 - 管理元素的选中状态
   */
  interface SelectionManager {
    /**
     * 取消选中指定实体
     * @param entity 要取消选中的实体
     */
    unselect(entity: unknown): void;
  }
}

declare namespace HSFPConstants {
  /**
   * 插件类型常量枚举
   */
  enum PluginType {
    /** 上下文工具 */
    ContextualTools = 'hsw.plugin.contextualtools.Plugin',
    /** 属性栏 */
    PropertyBar = 'hsw.plugin.propertybar.Plugin',
    /** 工具栏 */
    Toolbar = 'hsw.plugin.toolbar.Plugin',
    /** 目录 */
    Catalog = 'hsw.plugin.catalog.Plugin',
    /** 右键菜单 */
    RightMenu = 'hsw.plugin.rightmenu.Plugin',
    /** 左侧菜单 */
    LeftMenu = 'hsw.plugin.leftmenu.Plugin',
    /** 页面头部 */
    PageHeader = 'hsw.plugin.pageheader.Plugin',
    /** 视图切换 */
    ViewSwitch = 'hsw.plugin.viewswitch.Plugin',
    /** 内容样式器 */
    ContentStyler = 'hsw.plugin.contentstyler.Plugin'
  }
}

/**
 * 样式处理器 - 负责样式的提取、存储和应用
 */
declare class ContentStyleHandler {
  /**
   * 初始化处理器
   * @param config 配置对象
   */
  init(config: {
    app: HSApp.App;
    dependencies: Record<string, unknown>;
  }): void;

  /**
   * 设置模板实体（样式源）
   * @param entity 作为样式模板的实体
   */
  setTemplateEntity(entity: unknown): void;

  /**
   * 应用样式到目标实体
   * @param targetEntity 接收样式的目标实体
   */
  applyStyle(targetEntity: unknown): void;

  /**
   * 启动样式器模式
   */
  startStyler(): void;

  /**
   * 退出样式器模式
   */
  exitStyler(): void;
}

/**
 * 内容样式插件 - 提供快速复用内容样式的能力
 * 
 * 功能特性：
 * - 从源元素提取样式
 * - 将样式应用到目标元素
 * - 提供交互式样式复制模式
 * 
 * @example
 *