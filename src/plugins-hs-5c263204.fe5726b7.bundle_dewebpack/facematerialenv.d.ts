/**
 * 面材质环境模块
 * 用于管理3D场景中模型表面的材质编辑环境
 */

import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { HSCatalog } from './HSCatalog';
import { HSFPConstants } from './HSFPConstants';

/**
 * UI组件接口
 */
interface UIComponent {
  /**
   * 激活UI组件
   */
  activate(): void;

  /**
   * 停用UI组件
   */
  deactivate(): void;

  /**
   * 更新工具栏重置项
   */
  updateToolbarResetItem(): void;

  /**
   * 填充菜单自定义项
   * @param items - 菜单项数组
   */
  populateMenuCustomizedItems(items: unknown[]): void;

  /**
   * 获取工具栏ID
   * @returns 工具栏标识符
   */
  getToolbarId(): string | undefined;
}

/**
 * 面网格处理器接口
 */
interface FaceMeshHandler {
  /**
   * 命令是否处于激活状态
   */
  isCmdActive: boolean;

  /**
   * 3D实体对象
   */
  entity3d: {
    groupMesh: boolean;
  };

  /**
   * 初始化处理器
   * @param entity - 选中的实体对象
   */
  init(entity: HSCore.Model.Entity): void;

  /**
   * 释放资源
   */
  dispose(): void;

  /**
   * 获取选中的材质数据
   * @returns 材质数据对象，可能包含纹理URI
   */
  getSelectedMaterialData(): { textureURI?: string } | null;

  /**
   * 处理ESC键事件
   */
  onESC(): void;
}

/**
 * 材质处理器接口
 */
interface MaterialHandler {
  /**
   * 激活处理器
   */
  activate(): void;

  /**
   * 停用处理器
   */
  deactivate(): void;

  /**
   * 填充属性栏
   * @param data - 属性栏数据
   */
  onPopulatePropertyBar(data: unknown): void;

  /**
   * 来源环境ID
   */
  fromEnvironmentId: string | number;
}

/**
 * 插件基础接口
 */
interface BasePlugin {
  // 插件基础属性
}

/**
 * 目录插件接口
 */
interface CatalogPlugin extends BasePlugin {
  // 目录相关功能
}

/**
 * 页面头部插件接口
 */
interface PageHeaderPlugin extends BasePlugin {
  // 页面头部相关功能
}

/**
 * 工具栏插件接口
 */
interface ToolbarPlugin extends BasePlugin {
  // 工具栏相关功能
}

/**
 * 调整大小控件插件接口
 */
interface ResizeWidgetPlugin extends BasePlugin {
  // 调整大小控件相关功能
}

/**
 * 菜单插件接口
 */
interface MenuPlugin extends BasePlugin {
  /**
   * 填充自定义项信号
   */
  signalPopulateCustomizedItems: {
    listen(callback: (items: unknown[]) => void): void;
    unlisten(callback: (items: unknown[]) => void): void;
  };
}

/**
 * 属性栏插件接口
 */
interface PropertyBarPlugin extends BasePlugin {
  /**
   * 填充属性栏信号
   */
  signalPopulatePropertyBar: {
    listen(callback: (data: unknown) => void): void;
    unlisten(callback: (data: unknown) => void): void;
  };
}

/**
 * 面材质目录接口
 */
interface FaceMaterialCatalog {
  /**
   * 初始化目录
   */
  init(): void;
}

/**
 * 事务会话接口
 */
interface TransactionSession {
  /**
   * 提交事务
   */
  commit(): void;
}

/**
 * 面材质环境配置选项
 */
interface FaceMaterialEnvOptions {
  /**
   * 应用程序实例
   */
  app: HSApp.App;

  /**
   * 材质处理器
   */
  handler: MaterialHandler;

  /**
   * 目录插件
   */
  catalogPlugin: CatalogPlugin;

  /**
   * 页面头部插件
   */
  pageHeaderPlugin: PageHeaderPlugin;

  /**
   * 工具栏插件
   */
  toolbarPlugin: ToolbarPlugin;

  /**
   * 调整大小控件插件
   */
  resizeWidgetPlugin: ResizeWidgetPlugin;

  /**
   * 属性栏插件
   */
  propertyBarPlugin: PropertyBarPlugin;

  /**
   * 菜单插件
   */
  menuPlugin: MenuPlugin;

  /**
   * 面网格处理器
   */
  faceMeshHandler: FaceMeshHandler;
}

/**
 * 面材质环境类
 * 继承自通用环境，用于处理3D模型表面材质的编辑和管理
 */
export declare class FaceMaterialEnv extends HSApp.Environment.CommonEnvironment {
  /**
   * 应用程序实例
   */
  private _app: HSApp.App;

  /**
   * 材质处理器
   */
  private _handler: MaterialHandler;

  /**
   * 目录插件
   */
  private _catalogPlugin: CatalogPlugin;

  /**
   * 页面头部插件
   */
  private _pageHeaderPlugin: PageHeaderPlugin;

  /**
   * 工具栏插件
   */
  private _toolbarPlugin: ToolbarPlugin;

  /**
   * 调整大小控件插件
   */
  private _resizeWidgetPlugin: ResizeWidgetPlugin;

  /**
   * 菜单插件
   */
  private _menuPlugin: MenuPlugin;

  /**
   * 属性栏插件
   */
  private _propertyBarPlugin: PropertyBarPlugin;

  /**
   * UI组件实例
   */
  private _ui: UIComponent | null;

  /**
   * 选中的实体对象
   */
  private _selEntity: HSCore.Model.Entity | null;

  /**
   * 面网格处理器
   */
  private _meshHandler: FaceMeshHandler;

  /**
   * 面材质目录实例
   */
  private _faceMaterialCatalogIns?: FaceMaterialCatalog;

  /**
   * 事务会话
   */
  private _session?: TransactionSession | null;

  /**
   * 命令启动时可见的内容列表
   */
  private _visibleContentsOnCmdStart?: HSCore.Model.Entity[] | null;

  /**
   * 构造函数
   * @param options - 环境配置选项
   */
  constructor(options: FaceMaterialEnvOptions);

  /**
   * 激活环境
   * @param entity - 要编辑的实体对象
   */
  onActivate(entity: HSCore.Model.Entity): void;

  /**
   * 停用环境
   */
  onDeactivate(): void;

  /**
   * 注册材质目录
   */
  registerCatalog(): void;

  /**
   * 挂起环境（临时暂停）
   */
  onSuspend(): void;

  /**
   * 恢复环境
   */
  onResume(): void;

  /**
   * 获取工具栏ID
   * @returns 工具栏标识符
   */
  getToolbarId(): string | undefined;

  /**
   * 显示或隐藏其他内容
   * @param visible - true为显示，false为隐藏
   */
  displayOtherContents(visible: boolean): void;

  /**
   * 判断是否为指定环境
   * @returns 是否为墙体/天花板平台环境
   */
  isSpecifiedEnv(): boolean;

  /**
   * 填充属性栏回调
   * @param data - 属性栏数据
   */
  private onPopulatePropertyBar(data: unknown): void;

  /**
   * 执行添加材质命令
   */
  private _executeCmd(): void;

  /**
   * 完成当前命令
   */
  private _completeCmd(): void;

  /**
   * 绑定事件监听器
   */
  private _hookEvents(): void;

  /**
   * 解绑事件监听器
   */
  private _unhookEvents(): void;

  /**
   * 产品页面显示时的回调
   */
  private _onProductPageShown(): void;

  /**
   * 更新工具栏重置项
   */
  private _updateToolbarResetItem(): void;

  /**
   * 填充菜单自定义项
   * @param items - 菜单项数组
   */
  private _populateMenuCustomizedItems(items: unknown[]): void;
}