/**
 * 帮助按钮数据接口
 */
interface HelpButtonData {
  /** 帮助按钮的唯一标识符 */
  id: string;
  /** 帮助图标的图片路径 */
  src: string;
}

/**
 * Popover配置接口
 */
interface PopoverConfig {
  /** Popover显示位置，默认为"top" */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** 触发方式，默认为"hover" */
  trigger?: 'hover' | 'click' | 'focus';
  /** 延迟显示时间(毫秒)，默认为200 */
  delay?: number;
  /** 图片URL */
  imageUrl?: string;
  /** 视频URL */
  videoUrl?: string;
  /** 显示文本内容 */
  text?: string;
  /** 是否显示按钮 */
  showBtn?: boolean;
  /** 按钮点击事件处理器 */
  onBtnClick?: () => void;
  /** 按钮文本 */
  btnText?: string;
  /** 链接文本 */
  linkText?: string;
  /** 链接URL */
  linkUrl?: string;
}

/**
 * Tooltip配置接口
 */
interface TooltipConfig {
  /** Tooltip显示位置，默认为"top" */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** 触发方式，默认为"hover" */
  trigger?: 'hover' | 'click' | 'focus';
  /** 显示标题 */
  title: string;
  /** 延迟显示时间(毫秒)，默认为200 */
  delay?: number;
}

/**
 * 组件配置接口
 */
interface WidgetConfig {
  /** Popover配置 */
  popover?: PopoverConfig;
  /** Tooltip配置(字符串或对象) */
  tooltip?: string | TooltipConfig;
  /** 帮助提示(已弃用，使用tooltip替代) */
  helptips?: string;
}

/**
 * 图片按钮Widget接口
 */
interface ImageButtonWidget {
  /** 更新按钮数据 */
  update(data: HelpButtonData): void;
}

/**
 * 带帮助按钮的Widget组件
 * 
 * 该组件提供主Widget和可选的帮助按钮Widget,
 * 帮助按钮支持Popover和Tooltip两种展示方式
 */
declare class WidgetWithHelp {
  /** 组件的DOM元素 */
  readonly element: HTMLElement;
  
  /** 主Widget实例 */
  readonly mainWidget: unknown;
  
  /** 帮助按钮Widget实例(可选) */
  readonly helpWidget?: ImageButtonWidget;

  /**
   * 构造函数
   * @param element - 挂载的DOM元素
   * @param config - 组件配置对象
   */
  constructor(element: HTMLElement, config: WidgetConfig);

  /**
   * 更新组件数据
   * @param config - 新的配置对象
   */
  update(config?: WidgetConfig): void;

  /**
   * 创建主Widget
   * @param element - 挂载的DOM元素
   * @param config - 组件配置对象
   * @returns 主Widget实例
   * @protected
   */
  protected createMainWidget(element: HTMLElement, config: WidgetConfig): unknown;

  /**
   * 创建帮助按钮Widget
   * @param element - 挂载的DOM元素
   * @param config - 组件配置对象
   * @returns 帮助按钮Widget实例或undefined
   * @protected
   */
  protected createHelpWidget(element: HTMLElement, config: WidgetConfig): ImageButtonWidget | undefined;

  /**
   * 获取帮助按钮的数据配置
   * @returns 帮助按钮数据对象
   * @private
   */
  private _getHelpData(): HelpButtonData;

  /**
   * 根据配置创建Popover或Tooltip包装的Widget
   * @param config - 组件配置对象
   * @param content - React子元素内容
   * @returns React元素或null
   * @private
   */
  private _getPopoverWidget(config: WidgetConfig, content: React.ReactElement): React.ReactElement | null;
}

export default WidgetWithHelp;