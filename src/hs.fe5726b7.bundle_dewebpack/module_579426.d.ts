/**
 * CImage组件类型定义
 * 用于管理自定义图片组件的实例
 */

/**
 * CImage组件的配置参数
 */
interface CImageOptions {
  /** 组件唯一标识符 */
  id: string;
  /** 图片资源路径 */
  src: string;
  /** 显示名称 */
  name: string;
  /** 悬浮提示文本 */
  tooltip: string;
  /** 是否隐藏组件 */
  hidden: boolean;
}

/**
 * jQuery UI Widget实例接口
 */
interface CImageWidget {
  /**
   * 调用widget方法
   * @param method - 方法名称
   * @param args - 方法参数
   */
  cimage(method: string, ...args: any[]): any;
  
  /**
   * 初始化widget
   * @param options - 配置选项
   */
  cimage(options: Partial<CImageOptions>): CImageWidget;
}

/**
 * CImage组件类
 * 封装了custom.cimage jQuery UI widget的功能
 */
declare class CImage {
  /**
   * Widget实例引用
   */
  instance: CImageWidget | undefined;
  
  /**
   * 容器DOM元素（jQuery对象）
   */
  container: JQuery | undefined;
  
  /**
   * 组件配置参数
   */
  param: Partial<CImageOptions> | undefined;
  
  /**
   * 构造函数
   * @param container - jQuery容器元素
   * @param options - 组件配置选项
   */
  constructor(container: JQuery, options: Partial<CImageOptions>);
  
  /**
   * 静态工厂方法
   * @param container - jQuery容器元素
   * @param options - 组件配置选项
   * @returns CImage实例
   */
  static create(container: JQuery, options: Partial<CImageOptions>): CImage;
  
  /**
   * 更新组件配置并重新渲染
   * @param options - 需要更新的配置选项
   */
  update(options: Partial<CImageOptions>): void;
  
  /**
   * 销毁组件实例
   */
  destroy(): void;
}

/**
 * jQuery UI Widget定义扩展
 */
interface JQuery {
  /**
   * 初始化cimage widget
   * @param options - 配置选项
   */
  cimage(options: Partial<CImageOptions>): CImageWidget;
  
  /**
   * 调用cimage widget方法
   * @param method - 方法名称
   * @param args - 方法参数
   */
  cimage(method: string, ...args: any[]): any;
}

/**
 * jQuery UI Widget静态方法扩展
 */
interface JQueryStatic {
  /**
   * 定义jQuery UI widget
   * @param name - widget名称（带命名空间）
   * @param base - 基类widget（可选）
   * @param prototype - widget原型定义
   */
  widget(
    name: string,
    base: any | undefined,
    prototype: WidgetPrototype
  ): void;
  
  /**
   * 定义jQuery UI widget（无基类）
   * @param name - widget名称（带命名空间）
   * @param prototype - widget原型定义
   */
  widget(name: string, prototype: WidgetPrototype): void;
}

/**
 * jQuery UI Widget原型定义
 */
interface WidgetPrototype {
  /** Widget事件前缀 */
  widgetEventPrefix?: string;
  
  /** 默认配置选项 */
  options?: Partial<CImageOptions>;
  
  /** Widget创建时调用 */
  _create?(): void;
  
  /** Widget销毁时调用 */
  _destroy?(): void;
  
  /**
   * 获取jQuery元素
   * @param selector - CSS选择器（可选）
   * @returns jQuery对象
   */
  _$?(selector?: string): JQuery;
  
  /** Widget绑定的DOM元素 */
  element: JQuery;
}

/**
 * 资源管理器接口
 */
interface ResourceManager {
  /**
   * 注入SVG图片到DOM元素
   * @param element - 目标DOM元素
   */
  injectSVGImage(element: HTMLElement): void;
}

/**
 * 全局对象扩展
 */
interface Window {
  /** CImage组件类 */
  CImage: typeof CImage;
  
  /** 资源管理器实例 */
  ResourceManager: ResourceManager;
}

declare const ResourceManager: ResourceManager;