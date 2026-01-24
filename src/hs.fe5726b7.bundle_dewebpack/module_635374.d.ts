/**
 * jQuery UI Widget 接口扩展
 */
interface JQuery {
  cbutton(options: CButtonOptions): JQuery;
  cbutton(method: "destroy"): void;
}

/**
 * CButton 配置选项
 */
interface CButtonOptions {
  /** 按钮唯一标识符 */
  id?: string;
  
  /** 按钮点击事件回调函数 */
  onclick?: (event: JQuery.ClickEvent) => void;
  
  /** 按钮显示文本 */
  label?: string;
  
  /** 按钮是否禁用 */
  disabled?: boolean;
  
  /** 主要样式类名 */
  primary?: string;
  
  /** 是否显示箭头图标 */
  isShowArrow?: boolean;
}

/**
 * jQuery UI Widget 选项接口
 */
interface CButtonWidgetOptions extends CButtonOptions {
  widgetEventPrefix: string;
}

/**
 * 自定义按钮组件类
 * 基于 jQuery UI Widget 的按钮封装
 */
declare class CButton {
  /**
   * 构造函数
   * @param element - jQuery 选择器或 DOM 元素
   * @param params - 按钮配置参数
   */
  constructor(element: string | HTMLElement | JQuery, params: CButtonOptions);

  /** jQuery UI Widget 实例 */
  instance: JQuery;

  /** 按钮容器元素 */
  container: JQuery;

  /** 按钮配置参数 */
  param: CButtonOptions;

  /**
   * 静态工厂方法，创建按钮实例
   * @param element - jQuery 选择器或 DOM 元素
   * @param params - 按钮配置参数
   * @returns 新的 CButton 实例
   */
  static create(element: string | HTMLElement | JQuery, params: CButtonOptions): CButton;

  /**
   * 更新按钮配置
   * @param options - 需要更新的配置项
   */
  update(options: Partial<CButtonOptions>): void;

  /**
   * 销毁按钮实例，清理事件绑定和 DOM
   */
  destroy(): void;
}

/**
 * jQuery UI Widget 命名空间扩展
 */
declare namespace JQueryUI {
  interface Widget {
    cbutton: CButtonWidget;
  }
}

/**
 * CButton Widget 接口定义
 */
interface CButtonWidget {
  /** Widget 事件前缀 */
  widgetEventPrefix: string;

  /** Widget 默认配置选项 */
  options: CButtonWidgetOptions;

  /**
   * Widget 创建方法
   * 初始化按钮 DOM 结构和事件绑定
   * @internal
   */
  _create(): void;

  /**
   * Widget 销毁方法
   * 清理 DOM 和解绑事件
   * @internal
   */
  _destroy(): void;
}

/**
 * 全局 Window 接口扩展
 */
interface Window {
  /** 全局 CButton 构造函数 */
  CButton: typeof CButton;
}