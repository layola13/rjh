/**
 * 屋顶障碍物材质管理插件
 * 负责处理屋顶障碍物的材质选择、应用和属性栏显示
 */

import type { SignalHook } from 'HSCore.Util';
import type { App, CmdManager, SelectionManager, TransManager, CatalogManager } from 'HSApp';
import type { Beam } from 'HSCore.Model';
import type { MaterialData, CustomizedModelMaterialData } from 'HSCore.Material';
import type { ProductTypeEnum, CategoryTypeEnum, CatalogMeta } from 'HSCatalog';

/**
 * 请求类型枚举
 */
declare enum RequestType {
  ApplyMaterialToRoofObstacleRequest = 'ApplyMaterialToRoofObstacleRequest'
}

/**
 * 插件类型枚举
 */
declare enum PluginType {
  ContextualTools = 'ContextualTools',
  PropertyBar = 'PropertyBar',
  MaterialImage = 'MaterialImage',
  Catalog = 'Catalog',
  LeftMenu = 'LeftMenu'
}

/**
 * 插件集合映射
 */
interface PluginMap {
  [PluginType.ContextualTools]: ContextualToolsPlugin;
  [PluginType.PropertyBar]: PropertyBarPlugin;
  [PluginType.MaterialImage]: MaterialImagePlugin;
  [PluginType.Catalog]: CatalogPlugin;
  [PluginType.LeftMenu]: LeftMenuPlugin;
}

/**
 * 上下文工具栏插件接口
 */
interface ContextualToolsPlugin {
  /** 状态栏退出信号 */
  signalRetiringStatusBar: Signal<void>;
  /** 根据ID获取状态栏控件 */
  getStatusBarControlById(id: string): StatusBarControl | undefined;
}

/**
 * 属性栏插件接口
 */
interface PropertyBarPlugin {
  /** 填充属性栏信号 */
  signalPopulatePropertyBar: Signal<PropertyBarPopulateEvent>;
}

/**
 * 材质图像插件接口
 */
interface MaterialImagePlugin {
  /**
   * 获取带缝隙填充的材质URL
   * @param textureUri 原始纹理URI
   * @param seamWidth 缝隙宽度
   * @param seamColor 缝隙颜色
   * @param aspectRatio 宽高比
   */
  getMaterialUrlWithSeamFiller(
    textureUri: string,
    seamWidth: number,
    seamColor: string,
    aspectRatio: number
  ): Promise<string>;
}

/**
 * 目录插件接口
 */
interface CatalogPlugin {
  /** 目录项点击信号 */
  signalItemClicked: Signal<CatalogItemClickEvent>;
  /** 独立面板隐藏信号 */
  signalIndependentHidden: Signal<void>;
  /**
   * 打开独立面板
   * @param options 面板配置选项
   */
  openIndependentPanel(options: CatalogPanelOptions): void;
}

/**
 * 左侧菜单插件接口
 */
interface LeftMenuPlugin {
  /** 填充自定义菜单项信号 */
  signalPopulateCustomizedItems: Signal<PopulateCustomizedItemsEvent>;
}

/**
 * 目录面板配置选项
 */
interface CatalogPanelOptions {
  /** 目录类型 */
  types: CategoryTypeEnum;
  /** 查询参数 */
  query?: {
    /** 搜索ID */
    seekId: string;
    /** 分类ID */
    categoryId: string;
  };
}

/**
 * 目录项点击事件
 */
interface CatalogItemClickEvent {
  /** 事件数据 */
  data: CatalogMeta;
}

/**
 * 属性栏填充事件
 */
interface PropertyBarPopulateEvent {
  /** 事件数据 */
  data: {
    /**
     * 在指定位置插入集合
     * @param index 插入位置索引
     * @param items 要插入的项目列表
     */
    xInsertCollection(index: number, items: PropertyBarItem[]): void;
  };
}

/**
 * 填充自定义菜单项事件
 */
interface PopulateCustomizedItemsEvent {
  /** 事件数据 */
  data: {
    /** 自定义菜单项列表 */
    customizedItems: MenuItem[];
  };
}

/**
 * 状态栏控件接口
 */
interface StatusBarControl {
  /**
   * 更新控件状态
   * @param state 新状态
   */
  update(state: { isActive: boolean }): void;
}

/**
 * 属性栏项目
 */
interface PropertyBarItem {
  id: string;
  label: string;
  value: unknown;
}

/**
 * 菜单项
 */
interface MenuItem {
  id: string;
  label: string;
  action: () => void;
}

/**
 * 信号接口
 */
interface Signal<T> {
  dispatch(data?: T): void;
  listen(callback: (event: { data: T }) => void, context?: unknown): void;
  unlisten(callback: (event: { data: T }) => void, context?: unknown): void;
}

/**
 * 初始化上下文
 */
interface InitContext {
  /** 应用实例 */
  app: App;
}

/**
 * UI管理器接口
 */
interface UIManager {
  /**
   * 初始化属性栏项目（V2版本）
   * @param entity 实体对象
   * @param view 视图对象
   */
  initPropertyBarItemsV2(entity: Beam, view: unknown): PropertyBarItem[];
  /**
   * 初始化右键菜单项
   * @param entity 实体对象
   */
  initRightMenuItems(entity: Beam): MenuItem[];
}

/**
 * 选中实体包装器
 */
interface SelectedEntityWrapper {
  /** 实体对象 */
  entity: Beam;
}

/**
 * 屋顶障碍物材质管理插件
 * 提供材质选择、应用、属性编辑等功能
 */
export default class RoofObstacleMaterialPlugin {
  /** 信号钩子管理器 */
  private _signalHook: SignalHook;
  
  /** 应用实例 */
  private _app: App;
  
  /** 命令管理器 */
  private _cmdManager: CmdManager;
  
  /** 选择管理器 */
  private _selectionManager: SelectionManager;
  
  /** 事务管理器 */
  private _transManager: TransManager;
  
  /** 目录管理器 */
  private _catalogManager: CatalogManager;
  
  /** 上下文工具栏插件 */
  private _contextToolsPlugin: ContextualToolsPlugin;
  
  /** 属性栏插件 */
  private _propertyBarPlugin: PropertyBarPlugin;
  
  /** 材质图像插件 */
  private _materialImagePlugin: MaterialImagePlugin;
  
  /** 目录插件 */
  private _catalogPlugin: CatalogPlugin;
  
  /** 左侧菜单插件 */
  private _menuPlugin: LeftMenuPlugin;
  
  /** UI管理器 */
  private _ui: UIManager;
  
  /** 当前选中的实体列表 */
  private _entities: Beam[];
  
  /** 命令映射表 */
  private _commands: Map<string, unknown>;
  
  /** 原始材质映射表 */
  private _originalMateriapMaps: Map<string, MaterialData>;
  
  /** 目录项点击处理器 */
  private _catalogItemClickHandler?: (catalogMeta: CatalogMeta) => void;
  
  /** 临时处理器 */
  private _temphandler?: (catalogMeta: CatalogMeta) => void;

  constructor();

  /**
   * 初始化插件
   * @param context 初始化上下文
   * @param plugins 插件映射表
   */
  init(context: InitContext, plugins: PluginMap): void;

  /**
   * 反初始化插件，清理所有监听器
   */
  uninit(): void;

  /**
   * 刷新状态栏显示
   */
  refreshStatusBar(): void;

  /**
   * 刷新属性栏显示（V2版本）
   */
  refreshPropertyBarV2(): void;

  /**
   * 获取当前材质的搜索ID
   * @returns 材质搜索ID，如果无法获取则返回空字符串
   */
  getMaterialSeekId(): string;

  /**
   * 处理障碍物材质按钮点击事件
   * 打开材质选择面板
   */
  onObstacleMaterialClicked(): void;

  /**
   * 处理目录项点击事件（内部）
   * @param event 目录项点击事件
   */
  private _onCatalogItemClick(event: CatalogItemClickEvent): void;

  /**
   * 处理障碍物材质选择事件
   * 将选中的材质应用到障碍物
   * @param catalogMeta 目录元数据
   */
  onObstacleMaterialSelected(catalogMeta: CatalogMeta): void;

  /**
   * 处理选择变化事件（内部）
   * 清理未选中实体的命令
   */
  private _onSelectionChanged(): void;

  /**
   * 处理独立面板隐藏事件（内部）
   * 更新材质按钮状态
   */
  private _onIndependentHidden(): void;

  /**
   * 处理状态栏退出事件（内部）
   */
  private _onRetiringStatusBar(): void;

  /**
   * 处理属性栏填充事件（内部，V2版本）
   * @param event 属性栏填充事件
   */
  private _onPopulatePropertyBarV2(event: PropertyBarPopulateEvent): void;

  /**
   * 处理右键菜单自定义项填充事件（内部）
   * @param event 填充自定义菜单项事件
   */
  private _onPopulateRightmenuCustomized(event: PopulateCustomizedItemsEvent): void;
}