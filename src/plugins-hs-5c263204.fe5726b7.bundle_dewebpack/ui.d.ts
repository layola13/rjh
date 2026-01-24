/**
 * UI模块 - 用于管理面材编辑环境的用户界面
 * 
 * 该模块负责协调工具栏、页面头部、菜单等UI组件，
 * 并处理面材编辑相关的用户交互。
 */

import type { Application } from './Application';
import type { Handler } from './Handler';
import type { CatalogPlugin } from './plugins/CatalogPlugin';
import type { PageHeaderPlugin } from './plugins/PageHeaderPlugin';
import type { ToolbarPlugin } from './plugins/ToolbarPlugin';
import type { ResizeWidgetPlugin } from './plugins/ResizeWidgetPlugin';
import type { MenuPlugin } from './plugins/MenuPlugin';
import type { FaceMeshHandler } from './handlers/FaceMeshHandler';
import type { View } from './View';

/**
 * UI配置选项接口
 */
export interface UIOptions {
  /** 应用程序实例 */
  app: Application;
  /** 主处理器 */
  handler: Handler;
  /** 目录插件 */
  catalogPlugin: CatalogPlugin;
  /** 页面头部插件 */
  pageHeaderPlugin: PageHeaderPlugin;
  /** 工具栏插件 */
  toolbarPlugin: ToolbarPlugin;
  /** 尺寸调整组件插件 */
  resizeWidgetPlugin: ResizeWidgetPlugin;
  /** 菜单插件 */
  menuPlugin: MenuPlugin;
  /** 面网格处理器 */
  faceMeshHandler: FaceMeshHandler;
}

/**
 * 工具栏项配置接口
 */
export interface ToolbarItemConfig {
  /** 项类型 */
  type: 'button' | 'divider';
  /** 项名称 */
  name?: string;
  /** 排序顺序 */
  order?: number;
  /** 图标名称 */
  icon?: string;
  /** 显示标签 */
  label?: string;
  /** 提示文本 */
  tooltip?: string;
  /** 是否启用 */
  enable?: boolean;
  /** 关联的命令类型 */
  command?: string;
  /** 快捷键配置 */
  hotkey?: {
    win: string[];
    mac: string[];
  };
  /** 点击事件处理器 */
  onclick?: () => void;
}

/**
 * 工具栏配置接口
 */
export interface ToolbarConfig {
  /** 要排除的工具栏项ID列表 */
  excludeItems: string[];
  /** 要添加的工具栏项列表 */
  addItems: Array<Array<ToolbarItemConfig | string>>;
}

/**
 * 页面头部按钮数据接口
 */
export interface PageHeaderButtonData {
  /** 环境名称 */
  envName: string;
  /** 点击处理函数 */
  handleClick: () => void;
}

/**
 * 页面头部按钮渲染接口
 */
export interface PageHeaderButton {
  /** 获取React渲染元素 */
  getRenderItem: () => React.ReactElement;
}

/**
 * 左侧菜单项接口
 */
export interface LeftMenuItem {
  /** 菜单项ID */
  id: string;
  /** 控件类型 */
  type: PropertyBarControlTypeEnum;
  /** 图标源 */
  src: string;
  /** 排序顺序 */
  order: number;
  /** 显示标签 */
  label: string;
  /** 是否禁用 */
  disable?: boolean;
  /** 点击事件处理器 */
  onClick: (event: Event) => void;
}

/**
 * 菜单事件数据接口
 */
export interface MenuEventData {
  /** 菜单数据 */
  data: {
    /** 默认菜单项列表 */
    defaultItems: LeftMenuItem[];
    /** 自定义菜单项列表 */
    customizedItems: LeftMenuItem[];
  };
}

/**
 * 面材质工具栏ID常量
 */
export const FACE_MATERIAL_TOOLBAR_ID = 'face_material';

/**
 * UI类 - 管理面材编辑环境的用户界面
 * 
 * 职责：
 * - 激活/停用面材编辑UI环境
 * - 创建和管理工具栏
 * - 更新工具栏状态
 * - 填充左侧菜单项
 */
export class UI {
  /** 应用程序实例 */
  private readonly _app: Application;
  
  /** 主处理器 */
  private readonly _handler: Handler;
  
  /** 目录插件 */
  private readonly _catalogPlugin: CatalogPlugin;
  
  /** 页面头部插件 */
  private readonly _pageHeaderPlugin: PageHeaderPlugin;
  
  /** 工具栏插件 */
  private readonly _toolbarPlugin: ToolbarPlugin;
  
  /** 尺寸调整组件插件 */
  private readonly _resizeWidgetPlugin: ResizeWidgetPlugin;
  
  /** 菜单插件 */
  private readonly _menuPlugin: MenuPlugin;
  
  /** 面网格处理器 */
  private readonly _faceMeshHandler: FaceMeshHandler;
  
  /** 工具栏是否已创建 */
  private _toolbarCreated: boolean;
  
  /** 隐藏的2D视图 */
  private _hidden2DView?: View;

  /**
   * 构造函数
   * @param options - UI配置选项
   */
  constructor(options?: UIOptions);

  /**
   * 激活面材编辑UI环境
   * 
   * 执行操作：
   * - 隐藏2D视图
   * - 隐藏相机移动指示器
   * - 禁用Tab快捷键
   * - 创建工具栏
   * - 隐藏调整尺寸组件
   * - 更新页面头部
   */
  activate(): void;

  /**
   * 停用面材编辑UI环境
   * 
   * 执行操作：
   * - 恢复2D视图显示
   * - 恢复相机移动指示器
   * - 启用Tab快捷键
   * - 恢复页面头部
   * - 显示调整尺寸组件
   * - 关闭独立目录
   */
  deactivate(): void;

  /**
   * 获取工具栏ID
   * @returns 工具栏ID字符串
   */
  getToolbarId(): string;

  /**
   * 创建面材编辑工具栏
   * 
   * 添加的工具栏项：
   * - 全部恢复按钮
   * - 替换相同材质按钮
   * - 材质刷按钮
   */
  createToolbar(): void;

  /**
   * 更新工具栏重置按钮的启用/禁用状态
   * 根据撤销栈状态更新按钮可用性
   */
  updateToolbarResetItem(): void;

  /**
   * 获取页面头部完成按钮配置
   * @returns 页面头部按钮对象
   */
  private _getPageHeaderCompleteBtn(): PageHeaderButton;

  /**
   * 填充左侧菜单的自定义项
   * 
   * 根据当前选择状态显示不同的菜单项：
   * - 单个组选中：显示编辑组按钮
   * - 面选中且可混合绘制：显示高级装饰和清除材质按钮
   * 
   * @param event - 菜单事件数据
   */
  populateMenuCustomizedItems(event: MenuEventData): void;

  /**
   * 获取左侧菜单的组编辑项配置
   * @returns 取消组合按钮配置
   */
  private _getLeftMenuGroupEditItem(): LeftMenuItem;

  /**
   * 获取左侧菜单的入口项配置列表
   * @returns 高级装饰和清除材质按钮配置列表
   */
  private _getLeftMenuEntryItem(): LeftMenuItem[];
}

export { UI };