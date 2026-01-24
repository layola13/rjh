/**
 * LinkButton 组件配置选项
 */
interface ILinkButtonOptions {
  /** 按钮唯一标识符 */
  id: string;
  /** 按钮显示文本 */
  text: string;
  /** 鼠标悬停提示文本 */
  tooltip: string;
  /** 点击事件回调函数 */
  onclick?: (event: JQuery.ClickEvent) => void;
  /** 是否禁用按钮 */
  disabled: boolean;
}

/**
 * jQuery UI Widget 配置接口
 */
interface ILinkButtonWidget extends JQuery.Widget {
  /** Widget 事件前缀 */
  widgetEventPrefix: string;
  /** 组件配置选项 */
  options: ILinkButtonOptions;
  /** 创建组件时调用 */
  _create(): void;
  /** 销毁组件时调用 */
  _destroy(): void;
}

/**
 * CLinkButton 类声明
 * 封装 jQuery UI linkButton 组件的包装器类
 */
declare class CLinkButton {
  /**
   * 构造函数
   * @param element - jQuery 选择器或 DOM 元素
   * @param options - 按钮配置参数
   */
  constructor(element: string | HTMLElement | JQuery, options: Partial<ILinkButtonOptions>);

  /** jQuery UI linkButton 实例 */
  instance: JQuery;

  /** jQuery 容器元素 */
  container: JQuery;

  /** 组件配置参数 */
  param: Partial<ILinkButtonOptions>;

  /**
   * 静态工厂方法，创建 CLinkButton 实例
   * @param element - jQuery 选择器或 DOM 元素
   * @param options - 按钮配置参数
   * @returns CLinkButton 实例
   */
  static create(
    element: string | HTMLElement | JQuery,
    options: Partial<ILinkButtonOptions>
  ): CLinkButton;

  /**
   * 更新按钮配置
   * @param options - 需要更新的配置项
   */
  update(options: Partial<ILinkButtonOptions>): void;

  /**
   * 销毁按钮实例
   */
  destroy(): void;
}

/**
 * jQuery 插件扩展声明
 */
interface JQuery {
  /**
   * linkButton 插件方法
   * @param options - 配置选项或方法名
   * @returns jQuery 对象（链式调用）或方法返回值
   */
  linkButton(options?: Partial<ILinkButtonOptions> | string): JQuery;
}

/**
 * 全局 Window 接口扩展
 */
declare global {
  interface Window {
    /** CLinkButton 全局构造函数 */
    CLinkButton: typeof CLinkButton;
  }
}

/**
 * jQuery UI Widget Factory 扩展声明
 */
interface JQueryStatic {
  widget(
    name: "custom.linkButton",
    widget: ILinkButtonWidget
  ): void;
}