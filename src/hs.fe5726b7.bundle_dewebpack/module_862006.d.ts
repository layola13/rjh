/**
 * 图片按钮组件的配置参数接口
 */
interface ImageButtonOptions {
  /** 按钮唯一标识符 */
  id?: string;
  /** 图片资源路径 */
  src?: string;
  /** 按钮标签文本 */
  label?: string;
  /** 按钮颜色（数字格式，将转换为十六进制） */
  color?: number;
  /** 工具提示文本 */
  tooltip?: string;
  /** 提示位置 */
  tipposition?: string;
  /** 按钮上显示的文本 */
  text?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否隐藏 */
  hidden?: boolean;
  /** 点击事件回调 */
  onclick?: (event: JQuery.ClickEvent) => void;
  /** 鼠标按下事件回调 */
  onmousedown?: (event: JQuery.MouseDownEvent) => void;
  /** 鼠标释放事件回调 */
  onmouseup?: (event: JQuery.MouseUpEvent) => void;
  /** 鼠标进入事件回调 */
  onmouseenter?: (event: JQuery.MouseEnterEvent) => void;
  /** 鼠标离开事件回调 */
  onmouseleave?: (event: JQuery.MouseLeaveEvent) => void;
  /** 创建时回调 */
  oncreate?: (element: JQuery, widget: JQuery) => void;
  /** 销毁时回调 */
  ondestroy?: (element: JQuery, widget: JQuery) => void;
  /** 异步参数（可以是字符串或Promise） */
  asyncParam?: string | Promise<AsyncImageButtonData>;
  /** 是否处于激活状态 */
  isActive?: boolean;
  /** 图片CSS类名 */
  imgClassName?: string;
  /** 标题DOM元素 */
  captionDom?: string | JQuery;
  /** 是否被选中 */
  isSelected?: boolean;
  /** Popover配置选项 */
  popoverOptions?: PopoverOptions;
  /** 图片加载错误回调 */
  onerror?: (event: JQuery.ErrorEvent) => void;
}

/**
 * Popover弹出框配置接口
 */
interface PopoverOptions {
  /** 显示延迟时间（毫秒） */
  time?: number;
}

/**
 * 异步加载的图片按钮数据
 */
interface AsyncImageButtonData {
  /** 图片源路径 */
  imgSrc?: string;
  /** 显示文本 */
  text?: string;
}

/**
 * 图片按钮组件类
 * 封装了jQuery UI widget的图片按钮功能
 */
declare class CImageButton {
  /**
   * jQuery容器元素
   */
  container: JQuery;

  /**
   * 按钮配置参数
   */
  param: ImageButtonOptions;

  /**
   * jQuery UI widget实例
   */
  instance: JQuery;

  /**
   * 构造函数
   * @param container - jQuery容器元素
   * @param options - 按钮配置选项
   */
  constructor(container: JQuery, options?: ImageButtonOptions);

  /**
   * 静态工厂方法：创建图片按钮实例
   * @param container - jQuery容器元素
   * @param options - 按钮配置选项
   * @returns 新的CImageButton实例
   */
  static create(container: JQuery, options?: ImageButtonOptions): CImageButton;

  /**
   * 更新按钮配置
   * 如果配置有深层变化，将重新创建widget；否则仅更新
   * @param options - 新的配置选项
   */
  update(options: Partial<ImageButtonOptions>): void;
}

/**
 * jQuery UI ImageButton Widget声明
 */
interface JQuery {
  /**
   * 初始化或调用imagebutton widget方法
   * @param options - 配置选项或方法名
   * @param args - 方法参数
   */
  imagebutton(options?: ImageButtonOptions | string, ...args: unknown[]): JQuery;
}

/**
 * jQuery UI Widget工厂命名空间扩展
 */
interface JQueryUI {
  custom: {
    imagebutton: ImageButtonWidget;
  };
}

/**
 * ImageButton Widget接口定义
 */
interface ImageButtonWidget {
  /** Widget事件前缀 */
  widgetEventPrefix: string;

  /** 默认配置选项 */
  options: ImageButtonOptions;

  /** Widget创建时调用（内部方法） */
  _create(): void;

  /** Widget销毁时调用（内部方法） */
  _destroy(): void;

  /**
   * 更新widget配置
   * @param options - 新的配置选项
   */
  update(options: Partial<ImageButtonOptions>): void;

  /** 渲染widget DOM结构（内部方法） */
  render(): void;

  /**
   * 获取widget内部元素
   * @param selector - 可选的jQuery选择器
   * @returns jQuery元素
   */
  _$(selector?: string): JQuery;

  /** 应用颜色样式（内部方法） */
  _applyColor(): void;

  /** 应用图片纹理（内部方法） */
  _applyTexture(): void;

  /**
   * 应用文本样式（内部方法）
   * @param text - 要显示的文本
   */
  _applyText(text: string): void;

  /** 设置按钮为激活状态 */
  setActiveStatus(): void;

  /** 重置按钮状态 */
  resetStatus(): void;
}

/**
 * 全局ResourceManager声明（外部依赖）
 */
declare const ResourceManager: {
  /**
   * 注入SVG图片到指定元素
   * @param element - 目标DOM元素
   */
  injectSVGImage(element: HTMLElement): void;
};

/**
 * 全局Window接口扩展
 */
declare global {
  interface Window {
    /** 全局CImageButton构造函数 */
    CImageButton: typeof CImageButton;
  }
}

export { CImageButton, ImageButtonOptions, AsyncImageButtonData, PopoverOptions };