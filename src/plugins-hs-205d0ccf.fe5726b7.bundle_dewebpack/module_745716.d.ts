import * as React from 'react';
import { SignalHook } from 'HSCore.Util';
import { IconfontView } from './IconfontView';
import { Tooltip, SmartText } from './Components';

/**
 * 工具栏按钮的徽章配置
 */
export interface ToolbarButtonBadge {
  /** 徽章图标URL */
  icon: string;
  /** 徽章提示文本 */
  tooltip?: string;
  /** 徽章点击回调 */
  onclick?: () => void;
}

/**
 * 气泡提示配置
 */
export interface PopoverConfig {
  /** 弹出位置 */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** 触发方式 */
  trigger?: 'hover' | 'click' | 'focus' | 'move';
  /** 延迟时间(毫秒) */
  delay?: number;
  /** 打开延迟 */
  delayOpen?: number;
  /** 关闭延迟 */
  delayClose?: number;
  /** 图片URL */
  imageUrl?: string;
  /** 视频URL */
  videoUrl?: string;
  /** 文本内容 */
  text?: string;
  /** 是否显示按钮 */
  showBtn?: boolean;
  /** 按钮点击回调 */
  onBtnClick?: () => void;
  /** 按钮文本 */
  btnText?: string;
  /** 链接文本 */
  linkText?: string;
  /** 链接URL */
  linkUrl?: string;
}

/**
 * Tooltip提示配置
 */
export interface TooltipConfig {
  /** 弹出位置 */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** 触发方式 */
  trigger?: 'hover' | 'click' | 'focus';
  /** 标题内容 */
  title?: string;
  /** 延迟时间 */
  delay?: number;
  /** 打开延迟 */
  delayOpen?: number;
  /** 关闭延迟 */
  delayClose?: number;
  /** 自定义类名 */
  className?: string;
  /** 偏移量 */
  offset?: { x: number; y: number };
  /** 是否相对父元素定位 */
  isParentLocation?: boolean;
  /** 图片URL */
  imgUrl?: string;
  /** 文本资源键 */
  textKey?: string;
}

/**
 * 信息图标配置
 */
export interface InfoIconConfig {
  /** 图标类型 */
  icon: string;
  /** 悬停时的图标 */
  hoverIcon?: string;
  /** 字体大小 */
  fontSize?: string;
  /** Tooltip配置 */
  tooltip?: TooltipConfig;
}

/**
 * 信号变化数据
 */
export interface SignalChangedData {
  enable: boolean;
  isPressed: boolean;
}

/**
 * 信号对象
 */
export interface Signal<T = unknown> {
  dispatch(data: T): void;
  listen(callback: (data: T) => void): void;
}

/**
 * 工具栏按钮组件属性
 */
export interface ToolbarButtonProps {
  /** 是否为顶级按钮 */
  isTopLevel?: boolean;
  /** 是否可见 */
  visible: boolean;
  /** 是否启用 */
  enable: boolean;
  /** 是否显示图标 */
  isShowIcon?: boolean;
  /** 按钮标签文本 */
  label: string;
  /** 线条类型 */
  lineType?: string;
  /** 隐藏图标标志 */
  hiddenIcon?: boolean;
  /** 图标类型 */
  icon: string;
  /** 悬停时的图标 */
  iconhover?: string;
  /** 是否为分类 */
  isCatagory?: boolean;
  /** 提示文本或配置 */
  tooltip?: string | TooltipConfig;
  /** 点击回调 */
  onclick: () => void;
  /** 按钮宽度 */
  width?: number;
  /** 是否按下状态 */
  isPressed?: boolean;
  /** 徽章配置 */
  badge?: ToolbarButtonBadge;
  /** 数量标记 */
  count?: number;
  /** 路径标识 */
  path: string;
  /** 快捷键 */
  hotkey?: string | object;
  /** 气泡提示配置 */
  popover?: PopoverConfig;
  /** 是否显示圆点提示 */
  hasDot?: boolean;
  /** 引导提示 */
  guidetip?: boolean;
  /** 样式名称 */
  styleName?: string;
  /** 是否显示NEW标签 */
  showNew?: boolean;
  /** NEW标签显示回调 */
  showNewCallBack?: () => boolean;
  /** 信息图标配置 */
  infoIcon?: InfoIconConfig;
  /** 状态变化信号 */
  signalChanged?: Signal<{ data: SignalChangedData }>;
  /** 工具栏悬停信号 */
  signalToolbarHover?: Signal<{ isHover: boolean }>;
  /** 鼠标进入回调 */
  onButtonMouseEnter?: (event: React.MouseEvent) => void;
  /** 鼠标离开回调 */
  onButtonMouseLeave?: (event: React.MouseEvent) => void;
  /** 获取优惠金额回调 */
  getBenefitAmount?: () => number;
  /** 显示市场弹窗回调 */
  showMarketModal?: () => void;
}

/**
 * 工具栏按钮组件状态
 */
export interface ToolbarButtonState {
  /** 是否悬停 */
  hover: boolean;
  /** 信息图标是否悬停 */
  infoIconhover: boolean;
  /** 显示样式 */
  showDisplay: 'inline' | 'none';
  /** 是否启用 */
  enable: boolean;
  /** 是否按下 */
  isPressed: boolean;
}

/**
 * 工具栏按钮组件
 * 支持多种交互状态、气泡提示、徽章、快捷键等功能
 */
export default class ToolbarButton extends React.Component<ToolbarButtonProps, ToolbarButtonState> {
  static propTypes: {
    isTopLevel: PropTypes.Requireable<boolean>;
    visible: PropTypes.Validator<boolean>;
    enable: PropTypes.Validator<boolean>;
    label: PropTypes.Validator<string>;
    icon: PropTypes.Validator<string>;
    tooltip: PropTypes.Validator<string>;
    onclick: PropTypes.Validator<(...args: any[]) => any>;
    width: PropTypes.Requireable<number>;
    isPressed: PropTypes.Requireable<boolean>;
    badge: PropTypes.Requireable<object>;
    path: PropTypes.Validator<string>;
    hotkey: PropTypes.Requireable<string | object>;
    signalChanged: PropTypes.Requireable<object>;
    onButtonMouseEnter: PropTypes.Requireable<(...args: any[]) => any>;
    onButtonMouseLeave: PropTypes.Requireable<(...args: any[]) => any>;
  };

  static defaultProps: {
    isTopLevel: false;
    isPressed: false;
    badge: undefined;
    hotkey: undefined;
    onButtonMouseEnter: () => null;
    onButtonMouseLeave: () => null;
  };

  /** 信号钩子实例 */
  private _signalHook: SignalHook;
  /** 是否显示引导提示 */
  private _showGuideTip: boolean;
  /** 图标容器引用 */
  private _refIconContainer?: HTMLDivElement;
  /** 徽章图片引用 */
  private _refBadgeImage?: HTMLImageElement;
  /** 引导提示引用 */
  private _guideTipRef?: any;

  constructor(props: ToolbarButtonProps);

  componentDidMount(): void;

  UNSAFE_componentWillReceiveProps(nextProps: ToolbarButtonProps): void;

  componentDidUpdate(prevProps: ToolbarButtonProps): void;

  componentWillUnmount(): void;

  /**
   * 检查属性是否发生变化
   * @param prevProps 之前的属性
   * @param propName 属性名称
   */
  private _isPropChanged(prevProps: ToolbarButtonProps, propName: keyof ToolbarButtonProps): boolean;

  /**
   * 检查按钮是否启用
   */
  private _isEnabled(): boolean;

  /**
   * 鼠标进入事件处理
   */
  private _onMouseEnter(event: React.MouseEvent): void;

  /**
   * 鼠标离开事件处理
   */
  private _onMouseLeave(event: React.MouseEvent): void;

  /**
   * 信息图标鼠标进入事件
   */
  private _infoIconOnMouseEnter(): void;

  /**
   * 信息图标鼠标离开事件
   */
  private _infoIconOnMouseLeave(): void;

  /**
   * 点击事件处理
   */
  private _onClick(event: React.MouseEvent): void;

  /**
   * 关闭引导提示
   */
  private _closeGuideTip(): void;

  /**
   * 显示市场弹窗
   */
  private _showMarketModal(event: React.MouseEvent): void;

  /**
   * 渲染标签内容
   * @param iconElement 图标元素
   */
  private renderLabel(iconElement: React.ReactElement): React.ReactElement;

  render(): React.ReactElement;
}