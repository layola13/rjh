/**
 * 开口样式编辑器环境类
 * 提供开口（门窗等）样式编辑的独立工作环境
 */

import type { App } from 'HSApp';
import type { CanvasMaskEnv } from 'HSApp.Environment';
import type { Entity, Opening, Content, Wall } from 'HSCore.Model';
import type { Plugin } from 'HSFPConstants';

/**
 * 开口样式编辑器环境配置接口
 */
export interface OpeningStylerEnvConfig {
  /** 应用程序实例 */
  app: App;
  /** 样式处理器 */
  handler: OpeningStylerHandler;
  /** 上下文工具插件 */
  contextualToolsPlugin: ContextualToolsPlugin;
  /** 属性栏插件 */
  propertyBarPlugin: PropertyBarPlugin;
  /** 目录插件 */
  catalogPlugin: CatalogPlugin;
  /** 左侧菜单插件 */
  leftMenuPlugin: LeftMenuPlugin;
  /** 调整大小组件插件 */
  resizeWidgetPlugin: ResizeWidgetPlugin;
  /** 视图切换插件 */
  viewSwitchPlugin: ViewSwitchPlugin;
  /** 页面头部插件 */
  pageheaderPlugin: PageHeaderPlugin;
  /** 工具栏插件 */
  toolbarPlugin: ToolbarPlugin;
}

/**
 * 样式处理器接口
 */
export interface OpeningStylerHandler {
  /** 获取模板实体 */
  getTemplateEntity(): Opening | null;
  /** 应用样式到目标实体 */
  applyStyle(entities: Opening[], options: { entire: boolean }): void;
  /** 退出样式编辑器 */
  exitStyler(): void;
}

/**
 * 上下文工具插件接口
 */
export interface ContextualToolsPlugin {
  /** 隐藏状态栏 */
  hideStatusBar(): void;
  /** 显示状态栏 */
  showStatusBar(): void;
}

/**
 * 属性栏插件接口
 */
export interface PropertyBarPlugin {
  /** 隐藏属性栏 */
  hide(): void;
  /** 显示属性栏 */
  show(): void;
}

/**
 * 目录插件接口
 */
export interface CatalogPlugin {
  /** 切换目录显示状态 */
  toggleCatalog(visible: boolean): void;
}

/**
 * 左侧菜单插件接口
 */
export interface LeftMenuPlugin {
  /** 禁用左侧菜单 */
  disableLeftMenu(): void;
  /** 启用左侧菜单 */
  enableLeftMenu(): void;
}

/**
 * 调整大小组件插件接口
 */
export interface ResizeWidgetPlugin {
  /** 动画隐藏 */
  animateHide(animate: boolean): void;
  /** 动画显示 */
  animateShow(animate: boolean): void;
}

/**
 * 视图切换插件接口
 */
export interface ViewSwitchPlugin {
  /** 隐藏视图切换 */
  hide(): void;
  /** 显示视图切换 */
  show(): void;
}

/**
 * 页面头部插件接口
 */
export interface PageHeaderPlugin {
  /** 进入环境前的准备 */
  beforeEnterEnv(button: PageHeaderButton, position: 'left' | 'right'): void;
  /** 退出环境后的清理 */
  afterOuterEnv(): void;
}

/**
 * 工具栏插件接口
 */
export interface ToolbarPlugin extends Plugin {
  // 工具栏相关方法
}

/**
 * 页面头部按钮配置接口
 */
export interface PageHeaderButton {
  /** 获取渲染项 */
  getRenderItem(): React.ReactElement;
}

/**
 * 页面头部按钮数据接口
 */
export interface PageHeaderButtonData {
  /** 环境名称 */
  envName: string;
  /** 点击处理函数 */
  handleClick(): void;
}

/**
 * 遮罩选项接口
 */
export interface MaskOptions {
  /** 类型 */
  type: 'rect';
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
  /** 填充颜色 */
  fill: string;
  /** 透明度 */
  opacity: number;
}

/**
 * 样式编辑器接口
 */
export interface Styler {
  /** 进入样式编辑器 */
  enterStyler(): void;
  /** 退出样式编辑器 */
  exitStyler(): void;
  /** 判断是否为开口样式编辑内容 */
  isOpeningStylerContent(opening: Opening): boolean;
  /** 获取目标实体列表 */
  getTargetEntities(): Opening[];
}

/**
 * 显示对象接口
 */
export interface DisplayObject {
  /** 初始化 */
  init(): void;
  /** 绘制 */
  draw(): void;
  /** 清除 */
  clear(): void;
}

/**
 * 开口样式编辑器环境类
 * 继承自画布遮罩环境，提供专门的开口样式编辑功能
 */
export declare class OpeningStylerEnv extends CanvasMaskEnv {
  /** 样式处理器 */
  private _handler: OpeningStylerHandler;
  
  /** 上下文工具插件 */
  private _contextualToolsPlugin: ContextualToolsPlugin;
  
  /** 属性栏插件 */
  private _propertyBarPlugin: PropertyBarPlugin;
  
  /** 目录插件 */
  private _catalogPlugin: CatalogPlugin;
  
  /** 菜单插件 */
  private _menuPlugin: LeftMenuPlugin;
  
  /** 调整大小组件插件 */
  private _resizeWidgetPlugin: ResizeWidgetPlugin;
  
  /** 视图切换插件 */
  private _viewSwitchPlugin: ViewSwitchPlugin;
  
  /** 页面头部插件 */
  private _pageheaderPlugin: PageHeaderPlugin;
  
  /** 冻结的实体集合 */
  private _freezeEntities: Set<Entity>;
  
  /** 隐藏的开口集合 */
  private _hiddenOpenings: Set<Opening>;
  
  /** 目标开口集合 */
  private _targetOpenings: Set<Opening>;
  
  /** 不可选择的开口集合 */
  private _unselectableOpenings: Set<Opening>;
  
  /** 隐藏的内容集合 */
  private _hiddenContents: Set<Content>;
  
  /** 显示对象列表映射表 */
  private _displayList: Map<string, DisplayObject>;
  
  /** 样式编辑器实例 */
  private _styler: Styler;
  
  /** 遮罩选项配置 */
  private _maskOptions: MaskOptions;

  /**
   * 构造函数
   * @param config - 环境配置对象
   */
  constructor(config: OpeningStylerEnvConfig);

  /**
   * 激活环境时的回调
   * 隐藏相关UI组件，准备样式编辑环境
   */
  onActivate(): void;

  /**
   * 停用环境时的回调
   * 恢复UI组件和内容状态
   */
  onDeactivate(): void;

  /**
   * 获取页面头部完成按钮配置
   * @returns 页面头部按钮配置对象
   */
  getPageHeaderCompleteBtn(): PageHeaderButton;

  /**
   * 隐藏属性栏相关UI
   * @private
   */
  private _hidePropertyBar(): void;

  /**
   * 显示属性栏相关UI
   * @private
   */
  private _showPropertyBar(): void;

  /**
   * 隐藏图层编辑器
   * @private
   */
  private _hideLayerEditor(): void;

  /**
   * 显示图层编辑器
   * @private
   */
  private _showLayerEditor(): void;

  /**
   * 准备编辑内容
   * 冻结墙体、处理开口和内容的显示状态
   * @private
   */
  private _prepareContents(): void;

  /**
   * 恢复内容状态
   * 取消冻结、恢复显示状态、清理显示对象
   * @private
   */
  private _restoreContents(): void;

  /**
   * 替换显示对象
   * @param entity - 要替换的实体
   * @param isTemplate - 是否为模板实体
   * @private
   */
  private _replaceDisplayObject(entity: Opening, isTemplate?: boolean): void;
}