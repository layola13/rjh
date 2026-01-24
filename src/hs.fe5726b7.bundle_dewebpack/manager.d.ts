/**
 * Manager模块 - 目录管理器
 * 负责管理目录系统的初始化、显示/隐藏、环境注册、数据处理等核心功能
 */

import type { HSApp } from './types/HSApp';
import type { HSCore } from './types/HSCore';
import type { Environment, EditStatus } from './types/enums';

/**
 * 菜单项配置
 */
export interface MenuItemConfig {
  /** 菜单项ID */
  id: string;
  /** 菜单项名称 */
  name: string;
  /** 是否禁用 */
  disable?: boolean;
  /** 图标 */
  icon?: string;
  /** 子菜单项 */
  children?: MenuItemConfig[];
  /** 自定义属性 */
  custAttr?: string;
  [key: string]: unknown;
}

/**
 * 目录状态
 */
export interface CatalogStatus {
  /** 是否显示 */
  isShow: boolean;
  /** 切换状态 */
  toggleStatus: boolean;
}

/**
 * 位置信息
 */
export interface PositionInfo {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** 左边距 */
  left?: number;
  /** 顶部距离 */
  top?: number;
  /** 宽度 */
  width?: number;
  /** 高度 */
  height?: number;
}

/**
 * 分类配置参数
 */
export interface CategoryConfig {
  /** 分类ID */
  categoryId: string;
  /** 菜单ID */
  menuId?: string;
  /** 自定义属性 */
  custAttr?: string;
  /** 刷新编号 */
  refreshNum?: number;
  [key: string]: unknown;
}

/**
 * 用户跟踪日志参数
 */
export interface UserTrackLoggerParams {
  /** 活动区域 */
  activeSection: string;
  /** 活动区域名称 */
  activeSectionName: string;
  /** 描述 */
  description: string;
  /** 点击率信息 */
  clicksRatio: {
    id: string;
    name: string;
  };
  /** 操作类型 */
  actionType: string;
}

/**
 * 事件管理器接口
 */
export interface EventsManager {
  [key: string]: unknown;
}

/**
 * 数据管理器接口
 */
export interface DataManager {
  [key: string]: unknown;
}

/**
 * 切换实例接口
 */
export interface ToggleInstance {
  /** 展开侧边栏 */
  expandSideBar(show: boolean): void;
  /** 移除侧边栏 */
  removeSideBar(): void;
  /** 恢复侧边栏 */
  recoverSideBar(): void;
  /** 改变顶部位置 */
  changeTop(top: number): void;
}

/**
 * 目录管理器类
 * 提供目录系统的完整生命周期管理
 */
export declare class Manager {
  /** 数据处理器实例 */
  static dataHandler: unknown;
  
  /** 已注册的环境列表 */
  static envList: Environment[];
  
  /** 当前环境 */
  static currentEnv: Environment;
  
  /** 基础API管理器 */
  static baseApiManager: HSApp.Catalog.BaseApiManager;
  
  /** 事件跟踪管理器 */
  static eventTrackManager: HSApp.Catalog.EventTrackManager;
  
  /** 根容器DOM元素 */
  static rootContainer: HTMLElement | undefined;
  
  /** 切换实例 */
  static toggleIns: ToggleInstance | undefined;
  
  /** 信号钩子 */
  static signalHook: HSCore.Util.SignalHook | undefined;
  
  /** 目录页面容器 */
  static catalogPageContainer: HTMLElement | null | undefined;
  
  /** 尺寸变化观察器 */
  static resizeObserver: ResizeObserver | undefined;
  
  /** 目录状态 */
  static catalogStatus: CatalogStatus;
  
  /** 刷新计数器 */
  static refreshNum: number;
  
  /** 目录信号管理器 */
  static catalogSignalManager: HSApp.Catalog.CatalogSignalManager;

  /**
   * 初始化管理器
   * 初始化各个子管理器实例并配置商品信息
   */
  static init(): void;

  /**
   * 获取商品配置
   * @returns 商品配置Promise
   */
  static getGoodsConfig(): Promise<unknown>;

  /**
   * 设置应用配置
   * 将全局配置、用户信息和语言环境传递给管理器
   */
  static setAppConfig(): void;

  /**
   * 注册环境
   * @param env - 要注册的环境标识
   * @returns 如果环境已存在返回true，新注册返回false
   */
  static registerEnv(env: Environment): boolean;

  /**
   * 设置菜单数据
   * 过滤掉禁用的菜单项并存储到当前环境
   * @param menuData - 菜单配置数组
   */
  static setMenuData(menuData: MenuItemConfig[]): void;

  /**
   * 获取菜单数据
   * @param env - 环境标识
   * @returns 菜单数据
   */
  static getMenuData(env: Environment): MenuItemConfig[];

  /**
   * 设置自定义管理器
   * @param eventsManager - 事件管理器实例（可选）
   * @param dataManager - 数据管理器实例（可选）
   */
  static setCustomManager(
    eventsManager?: EventsManager,
    dataManager?: DataManager
  ): void;

  /**
   * 设置是否需要恢复状态
   * @param needRecover - 是否需要恢复
   */
  static needRecover(needRecover: boolean): void;

  /**
   * 注册页面映射
   * @param pageMap - 页面映射配置
   */
  static registerPageMap(pageMap: Record<string, unknown>): void;

  /**
   * 注册内部页面映射
   * @param internalPageMap - 内部页面映射配置
   */
  static registerInternalPageMap(internalPageMap: Record<string, unknown>): void;

  /**
   * 注册分类配置
   * @param categoryId - 分类ID
   * @param config - 分类配置
   */
  static registerCategoryConfig(
    categoryId: string,
    config: Record<string, unknown>
  ): void;

  /**
   * 获取默认产品页面
   * @param productId - 产品ID
   * @returns 默认页面配置
   */
  static getDefaultProductPage(productId: string): unknown;

  /**
   * 获取默认页面
   * @param menuId - 菜单ID
   * @param categoryId - 分类ID
   * @returns 默认页面配置
   */
  static getDefaultPage(menuId: string, categoryId: string): unknown;

  /**
   * 注册产品项
   * @param productItem - 产品项配置
   */
  static registerProductItem(productItem: Record<string, unknown>): void;

  /**
   * 显示目录
   * @param rootElement - 根DOM元素
   * @param options - 显示选项（可选）
   */
  static showCatalog(rootElement: HTMLElement, options?: Record<string, unknown>): void;

  /**
   * 添加布局管理器
   * 注册目录页面到应用布局管理器并监听尺寸变化
   */
  static addLayoutManager(): void;

  /**
   * 更新目录展开状态
   * @param isExpanded - 是否展开
   */
  static updateCatalogOnExpend(isExpanded: boolean): void;

  /**
   * 隐藏目录
   * 清理事件监听器和观察器
   */
  static hideCatalog(): void;

  /**
   * 切换目录显示/隐藏
   * @param show - 是否显示
   */
  static toggleCatalog(show: boolean): void;

  /**
   * 设置独立面板初始位置
   * @param position - 位置信息，默认{x: 8, y: 52}
   */
  static setIndependentPanelInitialPos(position?: PositionInfo): void;

  /**
   * 显示独立面板
   * @param menuData - 菜单数据
   * @param container - 容器元素
   * @param additionalData - 附加数据数组（可选）
   * @param param4 - 额外参数4（可选）
   * @param param5 - 额外参数5（可选）
   */
  static showIndependentPanel(
    menuData: MenuItemConfig[],
    container: HTMLElement,
    additionalData?: unknown[],
    param4?: unknown,
    param5?: unknown
  ): void;

  /**
   * 显示引擎PM面板
   * @param param1 - 参数1
   * @param param2 - 参数2
   * @param param3 - 参数3
   */
  static showEnginePMPanel(param1: unknown, param2: unknown, param3: unknown): void;

  /**
   * 关闭独立面板
   */
  static closeIndependentPanel(): void;

  /**
   * 向目录发送信号
   * @param signalName - 信号名称
   * @param data - 信号数据
   */
  static signalToCatalog(signalName: string, data: unknown): void;

  /**
   * 根据分类ID显示页面
   * @param config - 分类配置
   */
  static showPageByCategoryId(config: CategoryConfig): void;

  /**
   * 显示专题页面
   * @param config - 专题配置
   */
  static showSpecialTopic(config: Partial<CategoryConfig>): void;

  /**
   * 获取页面类型枚举
   * @returns 页面类型枚举对象
   */
  static getPageType(): Record<string, string>;

  /**
   * 获取当前菜单数据
   * @returns 当前菜单数据
   */
  static getCurrentMenuData(): MenuItemConfig[];

  /**
   * 设置子菜单项数量限制
   * @param limit - 限制数量，默认10
   */
  static setSubmenuItemsLimit(limit?: number): void;

  /**
   * 设置目录页面显示状态
   * @param show - 是否显示
   */
  static setCatalogPageShow(show: boolean): void;

  /**
   * 改变目录侧边栏顶部位置
   * @param top - 顶部位置值
   */
  static changeCatalogSidebarTop(top: number): void;

  /**
   * 设置切换侧边栏实例
   * @param toggleInstance - 切换实例
   */
  static setToggleSideBar(toggleInstance: ToggleInstance): void;

  /**
   * 在列表页面头部注册组件
   * @param componentId - 组件ID
   * @param component - 组件实例
   */
  static registerComOnListPageHeader(componentId: string, component: unknown): void;

  /**
   * 取消注册列表页面头部组件
   * @param componentId - 组件ID
   */
  static unregisterComOnListPageHeader(componentId: string): void;

  /**
   * 获取目录库实例
   * @returns 目录库实例
   */
  static getHSCatalogLib(): unknown;

  /**
   * 设置编辑模式
   * @param editModel - 编辑模式枚举值
   */
  static setEditModel(editModel: EditStatus): void;

  /**
   * 启用/禁用展开模式
   * @param enable - 是否启用
   * @param param2 - 额外参数，默认true
   */
  static enableExpandModel(enable: boolean, param2?: boolean): void;

  /**
   * 设置搜索模式（仅调试模式）
   * @param mode - 搜索模式
   */
  static setSearchMode(mode: string): void;

  /**
   * 获取当前搜索模式
   * @returns 搜索模式
   */
  static getSearchMode(): string;

  /**
   * 获取当前环境
   * @returns 当前环境标识
   */
  static getCurrentEnv(): Environment;

  /**
   * 用户跟踪日志记录
   * 发送用户行为数据到跟踪系统
   */
  static userTrackLogger(): void;
}