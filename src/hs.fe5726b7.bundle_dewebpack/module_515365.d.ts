/**
 * 图像按钮小部件工厂模块
 * 用于创建带可选弹出提示的图像按钮组件
 * @module ImageButtonWidgetFactory
 */

/**
 * 图像按钮配置选项
 */
export interface ImageButtonOptions {
  /** 按钮图标类名或URL */
  icon?: string;
  /** 按钮标题文本 */
  title?: string;
  /** 点击事件处理函数 */
  onClick?: (event: MouseEvent) => void;
  /** 是否禁用按钮 */
  disabled?: boolean;
  /** 自定义CSS类名 */
  className?: string;
  /** 弹出提示内容 */
  popoverContent?: React.ReactNode;
  /** 弹出提示配置 */
  popoverOptions?: PopoverOptions;
}

/**
 * 弹出提示配置选项
 */
export interface PopoverOptions {
  /** 弹出位置 */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** 触发方式 */
  trigger?: 'hover' | 'click' | 'focus';
  /** 延迟显示时间(ms) */
  delay?: number;
}

/**
 * 图像按钮小部件基类
 */
export interface BaseWidget {
  /**
   * 获取弹出提示小部件
   * @param options - 按钮配置选项
   * @param content - 弹出内容
   * @returns React元素或null
   */
  _getPopoverWidget(options: ImageButtonOptions, content: React.ReactElement): React.ReactElement | null;
}

/**
 * 图像按钮实例接口
 */
export interface CImageButton {
  /** 启用按钮 */
  enable(): void;
  /** 禁用按钮 */
  disable(): void;
  /** 销毁按钮实例 */
  destroy(): void;
  /** 获取按钮DOM元素 */
  getElement(): HTMLElement;
}

/**
 * 图像按钮工厂类
 * 继承自基础小部件类，提供创建和管理图像按钮的功能
 */
export default class ImageButtonWidgetFactory extends BaseWidget {
  /**
   * 构造函数
   * @param container - 容器元素选择器或jQuery对象
   * @param options - 按钮配置选项
   */
  constructor(container: string | JQuery, options: ImageButtonOptions);

  /**
   * 创建主要小部件
   * 在指定容器中渲染图像按钮，可选地包含弹出提示
   * @param container - 容器元素选择器
   * @param options - 按钮配置选项
   * @returns 创建的图像按钮实例
   */
  createMainWidget(container: string, options: ImageButtonOptions): CImageButton;

  /**
   * 创建帮助小部件
   * 当前实现返回null，可由子类覆写提供帮助功能
   * @returns 始终返回null
   */
  createHelpWidget(): null;

  /**
   * 静态工厂方法
   * 创建图像按钮小部件工厂实例
   * @param container - 容器元素选择器或jQuery对象
   * @param options - 按钮配置选项
   * @returns 新的工厂实例
   */
  static create(container: string | JQuery, options: ImageButtonOptions): ImageButtonWidgetFactory;
}

/**
 * jQuery类型扩展
 */
declare global {
  interface JQuery {
    append(content: string | HTMLElement | JQuery): JQuery;
    find(selector: string): JQuery;
    get(index: number): HTMLElement | undefined;
  }
}

/**
 * React全局命名空间扩展
 */
declare global {
  const React: typeof import('react');
  const ReactDOM: typeof import('react-dom');
}

/**
 * CImageButton全局构造函数
 */
declare global {
  namespace CImageButton {
    /**
     * 创建图像按钮实例
     * @param element - jQuery包装的按钮元素
     * @param options - 按钮配置选项
     * @returns 图像按钮实例
     */
    function create(element: JQuery, options: ImageButtonOptions): CImageButton;
  }
}