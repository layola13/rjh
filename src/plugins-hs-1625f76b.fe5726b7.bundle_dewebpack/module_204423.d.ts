/**
 * 内容部件材质插件模块
 * 提供内容部件材质替换和管理功能
 * @module ContentPartMaterialPlugin
 */

/**
 * 插件上下文接口
 */
interface IPluginContext {
  /** 应用实例 */
  app: {
    /** 应用参数 */
    appParams: {
      /** 运行环境标识 */
      env: string;
    };
  };
}

/**
 * 插件依赖集合接口
 */
interface IPluginDependencies {
  [key: string]: unknown;
}

/**
 * 插件配置选项
 */
interface IPluginOptions {
  /** 插件名称 */
  name: string;
  /** 插件描述 */
  description: string;
  /** 依赖的插件类型列表 */
  dependencies: string[];
}

/**
 * 材质处理器初始化配置
 */
interface IHandlerInitConfig {
  /** 插件依赖 */
  dependencies: IPluginDependencies;
  /** 插件上下文 */
  context: IPluginContext;
}

/**
 * 实体对象接口
 */
interface IEntity {
  [key: string]: unknown;
}

/**
 * 材质列表项接口
 */
interface IMaterial {
  [key: string]: unknown;
}

/**
 * 材质处理器接口
 * 负责处理内容部件的材质替换逻辑
 */
interface IMaterialHandler {
  /**
   * 初始化处理器
   * @param config - 初始化配置
   */
  init(config: IHandlerInitConfig): void;

  /**
   * 启动样式替换器
   * @param entity - 目标实体对象
   */
  startStyler(entity: IEntity): void;

  /**
   * 获取部件材质列表
   * @param partId - 部件ID
   * @param category - 材质分类
   * @returns 材质列表
   */
  getPartMaterialList(partId: string, category: string): IMaterial[];

  /**
   * 获取当前选中的实体
   * @returns 选中的实体对象，未选中返回undefined
   */
  getSelectedEntity(): IEntity | undefined;

  /**
   * 获取选中网格的名称
   * @returns 网格名称，未选中返回undefined
   */
  getSelectMeshName(): string | undefined;

  /**
   * 获取所有内容部件的ID列表
   * @returns 部件ID数组
   */
  getContentPartIds(): string[];
}

/**
 * 插件基类接口
 */
interface IPlugin {
  /**
   * 插件激活时调用
   * @param context - 插件上下文
   * @param dependencies - 插件依赖
   */
  onActive(context: IPluginContext, dependencies: IPluginDependencies): void;

  /**
   * 插件停用时调用
   */
  onDeactive(): void;
}

/**
 * 内容部件材质插件类
 * 支持在ihomexmerchant环境中进行内容部件的材质重置和替换
 * @extends IPlugin
 */
declare class ContentPartMaterialPlugin implements IPlugin {
  /**
   * 材质处理器实例
   */
  private handler: IMaterialHandler | undefined;

  /**
   * 信号钩子（预留）
   */
  private signalHook: unknown | undefined;

  /**
   * 构造函数
   * 初始化插件配置和依赖项
   */
  constructor();

  /**
   * 插件激活生命周期方法
   * 仅在ihomexmerchant环境下初始化处理器
   * @param context - 插件上下文
   * @param dependencies - 插件依赖项
   */
  onActive(context: IPluginContext, dependencies: IPluginDependencies): void;

  /**
   * 启动部件材质替换流程
   * @param entity - 需要替换材质的实体对象
   */
  startPartMaterialReplace(entity: IEntity): void;

  /**
   * 获取指定部件的材质列表
   * @param partId - 部件唯一标识
   * @param category - 材质分类
   * @returns 可用的材质列表
   */
  getContentPartMaterial(partId: string, category: string): IMaterial[];

  /**
   * 获取当前选中的实体对象
   * @returns 选中的实体，未选中时返回undefined
   */
  getSelectedEntity(): IEntity | undefined;

  /**
   * 获取当前选中网格的名称
   * @returns 网格名称字符串，未选中时返回undefined
   */
  getSelectedMeshName(): string | undefined;

  /**
   * 获取所有内容部件的ID列表
   * @returns 包含所有部件ID的数组
   */
  getContentPartIds(): string[];

  /**
   * 插件停用生命周期方法
   * 清理处理器资源
   */
  onDeactive(): void;
}

/**
 * 插件类型常量命名空间
 */
declare namespace HSFPConstants {
  enum PluginType {
    /** 上下文工具插件 */
    ContextualTools = "ContextualTools",
    /** 工具栏插件 */
    Toolbar = "Toolbar",
    /** 左侧菜单插件 */
    LeftMenu = "LeftMenu",
    /** 视图切换插件 */
    ViewSwitch = "ViewSwitch",
    /** 页面头部插件 */
    PageHeader = "PageHeader",
    /** 属性栏插件 */
    PropertyBar = "PropertyBar",
    /** 调整大小组件插件 */
    ResizeWidget = "ResizeWidget",
    /** 目录插件 */
    Catalog = "Catalog",
    /** 单房间插件 */
    SingleRoom = "SingleRoom",
    /** 定制产品插件 */
    CustomizedProductPlugin = "CustomizedProductPlugin",
  }
}

/**
 * 应用插件命名空间
 */
declare namespace HSApp.Plugin {
  /**
   * 注册插件到应用系统
   * @param pluginType - 插件类型标识
   * @param pluginClass - 插件类构造函数
   */
  function registerPlugin(
    pluginType: HSFPConstants.PluginType,
    pluginClass: new () => IPlugin
  ): void;

  export { IPlugin };
}

export { ContentPartMaterialPlugin, IPluginContext, IPluginDependencies, IMaterialHandler, IEntity, IMaterial };