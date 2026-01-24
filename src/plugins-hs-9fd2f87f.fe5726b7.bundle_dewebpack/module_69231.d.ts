/**
 * 边界提示控制器模块
 * 用于管理自定义工具栏提示组件的创建和销毁
 */

/**
 * 热键配置接口
 */
export interface HotkeyConfig {
  /** Windows 平台快捷键 */
  win: string;
  /** macOS 平台快捷键 */
  mac: string;
}

/**
 * 提示数据接口
 */
export interface TooltipData {
  /** 提示标题文本 */
  tooltipTitle: string;
  /** 提示正文内容 */
  tooltipBody: string;
  /** 是否不再显示 */
  nomoreShow?: boolean;
  /** 容器 DOM 元素 */
  containerElement: HTMLElement;
}

/**
 * 提示组件的 Props 接口
 */
export interface BoundaryTipProps {
  /** 提示数据 */
  data: TooltipData;
}

/**
 * 提示组件的 State 接口
 */
export interface BoundaryTipState {
  /** 提示标题 */
  tooltipTitle: string;
  /** 提示正文 */
  tooltipBody: string;
  /** 是否不再显示 */
  nomoreShow?: boolean;
  /** 容器元素 */
  containerElement: HTMLElement;
}

/**
 * 边界提示 React 组件
 * 用于显示工具栏按钮的提示信息
 */
declare class BoundaryTipComponent extends React.Component<BoundaryTipProps, BoundaryTipState> {
  /**
   * 销毁组件的回调函数
   */
  private _destroyComponent(): void;

  /**
   * 渲染提示标题
   * @returns 标题元素或 null
   */
  private _renderTooltipTitle(): React.ReactElement | null;

  /**
   * 渲染提示正文
   * @returns 正文元素或 null
   */
  private _renderTooltipBody(): React.ReactElement | null;

  /**
   * 组件挂载时的生命周期钩子
   */
  componentDidMount(): void;

  /**
   * 渲染组件
   */
  render(): React.ReactElement;
}

/**
 * 边界提示控制器类
 * 负责创建和销毁提示组件实例
 */
export default class BoundaryTipController {
  /** 编辑按钮元素选择器 */
  private _editButoonElement: string;
  
  /** 提示文本资源键 */
  private _toolTip: string;
  
  /** 热键配置 */
  private _hotkey: HotkeyConfig;
  
  /** 提示正文资源键 */
  private _toolTipBody: string;

  /**
   * 构造函数
   * @param editButtonElement - 编辑按钮元素选择器
   * @param toolTip - 提示文本的资源键
   * @param hotkey - 热键配置对象
   * @param toolTipBody - 提示正文的资源键
   */
  constructor(
    editButtonElement: string,
    toolTip: string,
    hotkey: HotkeyConfig,
    toolTipBody: string
  );

  /**
   * 创建提示组件
   * @param editButtonElement - 编辑按钮元素选择器（可选，使用实例默认值）
   * @param toolTip - 提示文本资源键（可选，使用实例默认值）
   * @param hotkey - 热键配置（可选，使用实例默认值）
   * @param toolTipBody - 提示正文资源键（可选，使用实例默认值）
   */
  create(
    editButtonElement?: string,
    toolTip?: string,
    hotkey?: HotkeyConfig,
    toolTipBody?: string
  ): void;

  /**
   * 销毁提示组件
   * 从 DOM 中卸载并移除组件
   */
  destroy(): void;
}