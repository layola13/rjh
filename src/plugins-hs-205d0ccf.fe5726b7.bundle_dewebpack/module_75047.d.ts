/**
 * 原始设计环境插件类型定义
 * 用于空间重建插件中的原始设计编辑环境
 */

import type { HSApp } from './hsapp';
import type { LiveHint } from './livehint';
import type { ResourceManager } from './resource-manager';
import type { HSFPConstants } from './hsfp-constants';

/**
 * 工具栏配置选项
 */
interface ToolbarConfig {
  /** 排除的工具栏项 */
  excludeItems: string[];
  /** 添加的工具栏项配置 */
  addItems: [ToolbarItemConfig, string][];
}

/**
 * 工具栏项配置
 */
interface ToolbarItemConfig {
  /** 工具栏项名称 */
  name: string;
  /** 工具栏项类型 */
  type: 'button' | 'dropdown' | 'divider';
  /** 排序顺序 */
  order: number;
  /** 显示标签 */
  label: string;
  /** 图标类名 */
  icon: string;
  /** 快捷键配置 */
  hotkey: {
    /** Windows 快捷键 */
    win: string;
    /** macOS 快捷键 */
    mac: string;
  };
  /** 点击事件处理函数 */
  onclick: () => void;
}

/**
 * 激活参数
 */
interface ActivateParams {
  /** 原始配件资产ID */
  originalAccessoryAssetId?: string;
  /** 前一个环境ID */
  preEnvironmentId?: string;
  /** 前一个资产ID */
  preAssetId?: string;
  /** 退出环境回调 */
  escEnvironment?: () => void;
  /** 执行保存原始扩展回调 */
  executeSaveOriginExtend?: (assetId: string, onSave: () => void, onCancel?: () => void) => void;
}

/**
 * 保存结果
 */
interface SaveResult {
  /** 是否保存成功 */
  saveOK: boolean;
}

/**
 * 保存响应
 */
interface SaveResponse {
  /** 是否已保存 */
  isSave: boolean;
}

/**
 * 页面头部按钮配置
 */
interface PageHeaderButtonConfig {
  /** 环境名称 */
  envName: string;
  /** 点击处理函数 */
  handleClick: () => void;
}

/**
 * 页面头部按钮渲染配置
 */
interface PageHeaderButtonRender {
  /** 获取渲染项 */
  getRenderItem: () => JSX.Element;
}

/**
 * 目录入口数据
 */
interface CatalogEntryData {
  /** 菜单ID */
  id: string;
  /** 图标类名 */
  icon: string;
  /** 显示文本 */
  text: string;
  /** 子数据列表 */
  data: Array<{ id: string; name: string }>;
  /** 选中的分类ID */
  selectCategoryId: string;
  /** 是否选中 */
  isSelected: boolean;
}

/**
 * 视图模式配置
 */
interface ViewModeConfig {
  /** 视图模式ID */
  id: string;
  /** 是否启用切换提示 */
  enableSwitchTip: boolean;
  /** 图标配置 */
  icons?: Array<{ id: string; fieldName: string }>;
  /** 字符串配置 */
  strings: Array<{ id: string; fieldName: string; hotKey?: string }>;
  /** 视图类型 */
  view?: '2D' | '3D';
}

/**
 * 视图选项下拉配置
 */
interface ViewModeDropdownData {
  /** 视图模式选项列表 */
  options: ViewModeConfig[];
  /** 默认选中的模式 */
  defaultKey: string;
  /** 变更回调 */
  onchange?: (target: unknown, mode: string, callback: (t: unknown, m: string) => void) => void;
  /** 是否扩展变更 */
  isExtendsChange?: boolean;
}

/**
 * 视图选项配置
 */
interface ViewOptionConfig {
  /** 类型 */
  type: 'nottoplevel' | 'toplevel';
  /** 选项ID */
  id: string;
  /** 排序顺序 */
  order: number;
  /** 下拉数据 */
  data: ViewModeDropdownData;
}

/**
 * 视图选项集合
 */
interface ViewOptions {
  /** 2D视图选项 */
  viewOptions2D: ViewOptionConfig[];
  /** 3D视图选项 */
  viewOptions3D: ViewOptionConfig[];
  /** 次级视图选项 */
  secondaryViewOptions: unknown[];
  /** 是否显示提示 */
  showTip: boolean;
  /** 是否显示弹出层 */
  showPopOver: boolean;
}

/**
 * 左侧菜单项
 */
interface LeftMenuItem {
  /** 菜单项ID */
  id: string;
  [key: string]: unknown;
}

/**
 * 原始设计环境类
 * 继承自通用环境，提供原始设计编辑功能
 */
declare class OriginalDesignEnvironment extends HSApp.Environment.CommonEnvironment {
  /** 菜单ID枚举 */
  readonly menuIdEnum: typeof HSApp.Catalog.DataConfig.MenuIdEnum;
  
  /** 工具栏插件实例 */
  private toolbarPlugin: unknown;
  
  /** 应用目录管理器 */
  private appCatalogManager: typeof HSApp.Catalog.Manager;
  
  /** 工具栏ID */
  private toolbarId: string;
  
  /** 原始配件资产ID */
  private originalAccessoryAssetId?: string;
  
  /** 前一个环境ID */
  private preEnvironmentId?: string;
  
  /** 前一个资产ID */
  private preAssetId?: string;
  
  /** 退出环境回调函数 */
  private escEnvironment?: () => void;
  
  /** 执行保存原始扩展回调 */
  private executeSaveOriginExtend?: (assetId: string, onSave: () => void, onCancel?: () => void) => void;
  
  /** 工具栏是否已创建 */
  private toolbarCreated?: boolean;
  
  /** 上次2D默认视图模式键 */
  private laster2DdefaultKey?: string;
  
  /** 3D视图模式 */
  private viewMode3D: string;
  
  /** 上次3D视图模式 */
  private lasterViewMode3D?: string;

  /**
   * 构造函数
   * @param app - 应用实例
   * @param plugins - 插件集合
   */
  constructor(app: unknown, plugins: Record<string, unknown>);

  /**
   * 激活环境
   * @param params - 激活参数
   */
  onActivate(params: ActivateParams): void;

  /**
   * 打开后激活环境
   * @private
   */
  private _actiateAfterOpen(): void;

  /**
   * 初始化目录
   */
  initCatalog(): void;

  /**
   * 初始化工具栏
   */
  initToolbar(): void;

  /**
   * 保存操作
   */
  save(): void;

  /**
   * 停用环境
   */
  onDeactivate(): void;

  /**
   * 保存原始设计
   * @returns 保存结果Promise
   */
  saveOriginDesgin(): Promise<SaveResult>;

  /**
   * 过滤左侧菜单项
   * @param items - 原始菜单项列表
   * @returns 过滤后的菜单项列表
   */
  filterLeftItems(items: LeftMenuItem[]): LeftMenuItem[];

  /**
   * 退出当前环境
   */
  esc(): void;

  /**
   * 获取页面头部完成按钮配置
   * @returns 页面头部按钮渲染配置
   * @private
   */
  private _getPageHeaderCompleteBtn(): PageHeaderButtonRender;

  /**
   * 显示实时提示
   * @param status - 提示状态
   */
  showLiveHint(status: LiveHint.statusEnum): void;

  /**
   * 获取目录页面映射
   * @returns 目录页面Map
   * @private
   */
  private _getCatalogPageMap(): Map<string, JSX.Element>;

  /**
   * 获取入口数据
   * @returns 目录入口数据数组
   * @private
   */
  private _getEntryData(): CatalogEntryData[];

  /**
   * 获取视图选项配置
   * @returns 视图选项配置对象或空数组
   */
  getViewOptions(): ViewOptions | [];

  /**
   * 获取2D视图选项
   * @returns 2D视图选项配置数组
   */
  get2DViewOptions(): ViewOptionConfig[];

  /**
   * 获取3D视图选项
   * @returns 3D视图选项配置数组
   */
  get3DViewOptions(): ViewOptionConfig[];

  /**
   * 切换到立面图视图
   * @param target - 目标对象
   * @param mode - 视图模式
   * @param callback - 回调函数
   * @private
   */
  private toElevation(target: unknown, mode: string, callback: (t: unknown, m: string) => void): void;

  /**
   * 获取次级视图选项
   * @returns 次级视图选项数组
   */
  getSecondaryViewOptions(): unknown[];
}

export default OriginalDesignEnvironment;