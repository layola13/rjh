import React from 'react';

/**
 * 弹出框触发方式
 */
export type PopoverTriggerType = 'click' | 'hover' | 'manual' | 'new';

/**
 * 弹出框位置
 */
export type PopoverPlacement = 'top' | 'right' | 'bottom' | 'left';

/**
 * PopoverTrigger 组件属性接口
 */
export interface PopoverTriggerProps {
  /**
   * 触发方式
   * @default 'manual'
   */
  trigger?: PopoverTriggerType;

  /**
   * 延迟时间（毫秒）
   * @default 200
   */
  delay?: number;

  /**
   * 打开延迟时间（毫秒），优先级高于 delay
   * @default null
   */
  delayOpen?: number | null;

  /**
   * 关闭延迟时间（毫秒），优先级高于 delay
   * @default null
   */
  delayClose?: number | null;

  /**
   * 自定义样式类名
   * @default ''
   */
  className?: string;

  /**
   * 弹出框位置
   * @default 'top'
   */
  placement?: PopoverPlacement;

  /**
   * 图片 URL
   * @default null
   */
  imageUrl?: string | null;

  /**
   * 视频 URL
   * @default null
   */
  videoUrl?: string | null;

  /**
   * 文本内容
   * @default null
   */
  text?: string | null;

  /**
   * 是否显示按钮
   * @default false
   */
  showBtn?: boolean;

  /**
   * 按钮点击回调
   */
  onBtnClick?: () => void;

  /**
   * 按钮文本
   * @default ResourceManager.getString("toolBar_tip_I_know")
   */
  btnText?: string;

  /**
   * 链接文本
   * @default '视频教程'
   */
  linkText?: string;

  /**
   * 链接 URL
   * @default null
   */
  linkUrl?: string | null;

  /**
   * 打开时的回调
   */
  onOpen?: () => void;

  /**
   * 关闭时的回调
   */
  onClose?: () => void;

  /**
   * 是否显示确认对话框
   * @default false
   */
  showConfirm?: boolean;

  /**
   * 取消按钮文本
   * @default ResourceManager.getString("cancel")
   */
  cancelText?: string;

  /**
   * 确认按钮文本
   * @default ResourceManager.getString("confirm")
   */
  okText?: string;

  /**
   * 确认回调
   */
  onOk?: (event: React.MouseEvent) => void;

  /**
   * 取消回调
   */
  onCancel?: (event: React.MouseEvent) => void;

  /**
   * 点击时是否关闭
   * @default false
   */
  dismissOnClick?: boolean;

  /**
   * 鼠标进入回调
   */
  onMouseEnter?: () => void;

  /**
   * 鼠标离开回调
   */
  onMouseLeave?: () => void;

  /**
   * 子元素
   */
  children?: React.ReactNode;
}

/**
 * PopoverTrigger 组件状态接口
 */
export interface PopoverTriggerState {}

/**
 * Trigger 实例接口
 */
export interface TriggerInstance {
  /**
   * 打开弹出框
   */
  open(): void;

  /**
   * 关闭弹出框
   */
  close(): void;

  /**
   * 切换弹出框显示状态
   */
  toggle(): void;

  /**
   * 检查弹出框是否打开
   */
  isOpened(): boolean;
}

/**
 * PopoverTrigger 组件
 * 用于触发和控制弹出框的显示与隐藏
 */
export default class PopoverTrigger extends React.Component<PopoverTriggerProps, PopoverTriggerState> {
  /**
   * 默认属性
   */
  static defaultProps: Partial<PopoverTriggerProps>;

  /**
   * Trigger 实例引用
   */
  private triggerInst: TriggerInstance | null;

  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: PopoverTriggerProps);

  /**
   * 组件挂载后的生命周期
   */
  componentDidMount(): void;

  /**
   * 组件卸载前的生命周期
   */
  componentWillUnmount(): void;

  /**
   * 文档点击事件处理，用于隐藏弹出框
   * @param event - 鼠标事件
   */
  private documentClickedHidePopup(event: MouseEvent): void;

  /**
   * 按钮点击处理
   */
  private handleBtnClick(): void;

  /**
   * 确认按钮点击处理
   * @param event - React 鼠标事件
   */
  private onOk(event: React.MouseEvent): void;

  /**
   * 取消按钮点击处理
   * @param event - React 鼠标事件
   */
  private onCancel(event: React.MouseEvent): void;

  /**
   * 检查弹出框是否打开
   * @returns 是否打开
   */
  isOpened(): boolean;

  /**
   * 打开弹出框
   */
  open(): void;

  /**
   * 关闭弹出框
   */
  close(): void;

  /**
   * 切换弹出框显示状态
   */
  toggle(): void;

  /**
   * 渲染组件
   */
  render(): React.ReactElement;
}