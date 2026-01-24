/**
 * Handler 模块
 * 
 * 用于管理应用布局模式和插件配置的核心处理器
 * 负责根据用户权限和UI定制需求动态调整界面布局
 * 
 * @module Handler
 */

import { HSCore } from './HSCore';
import { HSApp } from './HSApp';

/**
 * 插件映射接口
 * 存储应用中各类插件实例的映射关系
 */
interface PluginMap {
  /** 工具栏插件 */
  [HSFPConstants.PluginType.Toolbar]: ToolbarPlugin;
  /** 目录插件 */
  [HSFPConstants.PluginType.Catalog]: CatalogPlugin;
  /** 页面头部插件 */
  [HSFPConstants.PluginType.PageHeader]: PageHeaderPlugin;
  /** 调整大小组件插件 */
  [HSFPConstants.PluginType.ResizeWidget]: ResizeWidgetPlugin;
  /** 属性栏插件 */
  [HSFPConstants.PluginType.PropertyBar]: PropertyBarPlugin;
  /** 首次登录插件 */
  'hsw.brand.ezhome.firstlogin.Plugin': FirstLoginPlugin;
  [key: string]: any;
}

/**
 * 权限检查完成事件数据
 */
interface PermissionCheckData {
  /** 是否已完成权限检查 */
  hasChecked: boolean;
}

/**
 * 工具栏插件接口
 */
interface ToolbarPlugin {
  /**
   * 移除工具栏项
   * @param itemId - 项目ID
   * @param scope - 作用域（如 'default'）
   */
  removeItem(itemId: string, scope: string): void;
}

/**
 * 目录插件接口
 */
interface CatalogPlugin {
  /**
   * 显示或隐藏目录
   * @param visible - 是否可见
   */
  showCatalog(visible: boolean): void;
}

/**
 * 页面头部插件接口
 */
interface PageHeaderPlugin {
  /**
   * 通过ID移除页面头部项
   * @param itemId - 项目ID
   */
  removeItemById(itemId: string): void;
}

/**
 * 调整大小组件插件接口
 */
interface ResizeWidgetPlugin {
  /**
   * 折叠调整大小组件
   */
  foldResizeWidget(): void;
}

/**
 * 属性栏插件接口
 */
interface PropertyBarPlugin {
  /**
   * 折叠属性栏
   */
  foldPropertybar(): void;
}

/**
 * 首次登录插件接口
 */
interface FirstLoginPlugin {
  /** 权限检查完成信号 */
  signalCheckPermissionsCompleted: HSCore.Util.Signal<PermissionCheckData>;
}

/**
 * 应用设置字段变更事件
 */
interface AppSettingsChangeEvent {
  /** 字段名称 */
  fieldName: string;
  /** 新值 */
  value: any;
}

/**
 * 应用实例接口
 */
interface App {
  /** 应用设置 */
  appSettings: {
    /** 设置值变更信号 */
    signalValueChanged: {
      dispatch(event: AppSettingsChangeEvent): void;
    };
  };
  /** 插件管理器 */
  pluginManager: {
    /**
     * 卸载插件
     * @param pluginId - 插件ID
     */
    unload(pluginId: string): void;
  };
}

/**
 * 布局配置项排除规则
 */
interface LayoutConfigItemExclude {
  /** 需要排除的项目ID列表 */
  exclude: string[];
}

/**
 * 自动保存配置
 */
interface AutoSaveConfig {
  /** 自动保存时间间隔（秒） */
  time: number;
}

/**
 * 调整大小组件配置
 */
interface ResizeWidgetConfig {
  /** 是否折叠 */
  isFold: boolean;
}

/**
 * 属性栏配置
 */
interface PropertyBarConfig {
  /** 是否折叠 */
  isFold: boolean;
}

/**
 * 布局模式配置接口
 * 定义不同布局模式下的UI配置规则
 */
interface LayoutModeConfig {
  /** 插件配置 */
  plugin?: {
    /** 需要排除的插件列表 */
    exclude: string[];
  };
  /** 工具栏配置 */
  toolbar?: {
    /** 工具栏项配置 */
    item: LayoutConfigItemExclude;
  };
  /** 页面头部配置 */
  pageheader?: {
    /** 页面头部项配置 */
    item: LayoutConfigItemExclude;
  };
  /** 自动保存配置 */
  autoSave?: AutoSaveConfig;
  /** 调整大小组件配置 */
  resizeWidget?: ResizeWidgetConfig;
  /** 属性栏配置 */
  propertyBar?: PropertyBarConfig;
}

/**
 * 布局模式管理器接口
 */
interface LayoutModeManager {
  /** 当前布局模式 */
  mode: string;
  /** 当前布局配置 */
  config: LayoutModeConfig;
}

/**
 * Handler 类
 * 
 * 核心处理器类，负责：
 * - 监听权限检查事件
 * - 根据用户类型切换布局模式
 * - 动态配置插件和UI组件
 * - 管理自动保存等应用级设置
 */
export declare class Handler {
  /** 信号钩子，用于事件监听 */
  signalHook: HSCore.Util.SignalHook<Handler>;
  
  /** 工具栏插件实例 */
  toolbarPlugin: ToolbarPlugin;
  
  /** 目录插件实例 */
  catalogPlugin: CatalogPlugin;
  
  /** 页面头部插件实例 */
  pageHeaderPlugin: PageHeaderPlugin;
  
  /** 应用实例 */
  app: App;
  
  /** 布局模式管理器 */
  layoutModeMgr: LayoutModeManager;
  
  /** 调整大小组件插件 */
  resizeWidget: ResizeWidgetPlugin;
  
  /** 属性栏插件 */
  propertyBar: PropertyBarPlugin;

  constructor();

  /**
   * 初始化处理器
   * 
   * 从插件映射中提取各个插件实例，并监听权限检查完成事件
   * 
   * @param plugins - 插件映射对象
   */
  init(plugins: PluginMap): void;

  /**
   * 处理布局模式变更
   * 
   * 根据用户权限和定制UI设置，切换到相应的布局模式：
   * - apartmentCustomizedUI: 天猫好房/houseme 模式
   * - kanfangCustomizedUI: 看房模式
   * - storeSmartLayout: Apple Store 模式
   * 
   * @param event - 权限检查事件数据
   */
  handleLayoutModeChanged(event: { data: PermissionCheckData }): void;

  /**
   * 处理插件变更
   * 
   * 根据布局配置卸载需要排除的插件
   */
  handlePluginChanged(): void;

  /**
   * 处理工具栏变更
   * 
   * 根据布局配置移除需要排除的工具栏项
   */
  handleToolbarChanged(): void;

  /**
   * 处理页面头部变更
   * 
   * 根据布局配置移除需要排除的页面头部项
   */
  handlePageHeaderChanged(): void;

  /**
   * 处理自动保存设置
   * 
   * 根据布局配置更新自动保存时间间隔
   * 将秒转换为分钟后应用到应用设置
   */
  handleAutoSave(): void;

  /**
   * 处理调整大小组件
   * 
   * 根据布局配置决定是否折叠调整大小组件
   */
  handleResizeWidget(): void;

  /**
   * 处理属性栏
   * 
   * 根据布局配置决定是否折叠属性栏
   */
  handlePropertyBar(): void;
}