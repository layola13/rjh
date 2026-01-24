import React from 'react';

/**
 * 位置值，可以是数字或数字数组
 */
export type PositionValue = number | number[];

/**
 * 样式对象类型
 */
export type StyleObject = React.CSSProperties;

/**
 * 滑块句柄渲染函数的参数
 */
export interface HandleRenderProps {
  /** CSS类名 */
  className: string;
  /** 组件前缀类名 */
  prefixCls: string;
  /** 是否垂直方向 */
  vertical: boolean;
  /** 偏移量（百分比） */
  offset: number;
  /** 当前值 */
  value: number;
  /** 是否正在拖拽 */
  dragging: boolean;
  /** 是否禁用 */
  disabled: boolean;
  /** 最小值 */
  min: number;
  /** 最大值 */
  max: number;
  /** 是否反向 */
  reverse: boolean;
  /** 句柄索引 */
  index: number;
  /** Tab键顺序 */
  tabIndex?: number;
  /** ARIA标签 */
  ariaLabel?: string;
  /** ARIA标签关联ID */
  ariaLabelledBy?: string;
  /** ARIA值文本格式化函数 */
  ariaValueTextFormatter?: (value: number) => string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** ref引用 */
  ref?: (node: any) => void;
}

/**
 * 滑块组件的属性接口
 */
export interface SliderProps {
  /** 组件CSS类名前缀，默认为 'rc-slider' */
  prefixCls?: string;
  /** 是否垂直方向显示 */
  vertical?: boolean;
  /** 是否包含轨道样式 */
  included?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 步长 */
  step?: number;
  /** 起始点位置 */
  startPoint?: number;
  /** 是否反向 */
  reverse?: boolean;
  /** 默认值 */
  defaultValue?: number;
  /** 受控值 */
  value?: number;
  /** Tab键顺序 */
  tabIndex?: number;
  /** 句柄的ARIA标签 */
  ariaLabelForHandle?: string;
  /** 句柄的ARIA标签关联ID */
  ariaLabelledByForHandle?: string;
  /** 句柄的ARIA值文本格式化函数 */
  ariaValueTextFormatterForHandle?: (value: number) => string;
  
  /** 轨道样式（推荐使用此属性） */
  trackStyle?: React.CSSProperties | React.CSSProperties[];
  /** 滑轨样式 */
  railStyle?: React.CSSProperties;
  /** 句柄样式 */
  handleStyle?: React.CSSProperties | React.CSSProperties[];
  
  /** @deprecated 已废弃，请使用trackStyle代替 */
  minimumTrackStyle?: React.CSSProperties;
  /** @deprecated 已废弃，请使用railStyle代替 */
  maximumTrackStyle?: React.CSSProperties;
  
  /** 自定义句柄渲染函数 */
  handle?: (props: HandleRenderProps) => React.ReactElement;
  
  /** 值变化时的回调 */
  onChange?: (value: number) => void;
  /** 拖拽开始前的回调 */
  onBeforeChange?: (value: number) => void;
  /** 拖拽结束后的回调 */
  onAfterChange?: (value: number) => void;
}

/**
 * 滑块组件的状态接口
 */
export interface SliderState {
  /** 当前值 */
  value: number;
  /** 是否正在拖拽 */
  dragging: boolean;
}

/**
 * 滑块组件渲染结果接口
 */
export interface SliderRenderResult {
  /** 轨道元素 */
  tracks: React.ReactElement;
  /** 句柄元素 */
  handles: React.ReactElement;
}

/**
 * 单值滑块组件
 * 用于在一个范围内选择单个数值
 */
export default class Slider extends React.Component<SliderProps, SliderState> {
  /**
   * 起始值（拖拽开始时的值）
   */
  startValue?: number;
  
  /**
   * 起始位置（拖拽开始时的位置）
   */
  startPosition?: number;
  
  /**
   * 上一次移动的句柄索引
   */
  prevMovedHandleIndex?: number;

  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: SliderProps);

  /**
   * 根据位置计算对应的值
   * @param position - 位置信息
   * @returns 计算得到的值
   */
  calcValueByPos(position: number): number;

  /**
   * 根据值计算偏移量
   * @param value - 数值
   * @returns 偏移量（百分比）
   */
  calcOffset(value: number): number;

  /**
   * 保存句柄引用
   * @param index - 句柄索引
   * @param handle - 句柄元素引用
   */
  saveHandle(index: number, handle: any): void;

  /**
   * 移除文档级事件监听器
   */
  removeDocumentEvents(): void;

  /**
   * 组件更新后的生命周期钩子
   * @param prevProps - 上一次的属性
   * @param prevState - 上一次的状态
   */
  componentDidUpdate(prevProps: SliderProps, prevState: SliderState): void;

  /**
   * 值变化处理函数
   * @param state - 新的状态对象
   */
  onChange(state: Partial<SliderState>): void;

  /**
   * 拖拽开始事件处理
   * @param position - 起始位置
   */
  onStart(position: number): void;

  /**
   * 拖拽移动事件处理
   * @param event - 原生事件对象
   * @param position - 当前位置
   */
  onMove(event: Event, position: number): void;

  /**
   * 拖拽结束事件处理
   * @param force - 是否强制触发
   */
  onEnd(force?: boolean): void;

  /**
   * 键盘事件处理
   * @param event - 键盘事件对象
   */
  onKeyboard(event: React.KeyboardEvent): void;

  /**
   * 获取当前值
   * @returns 当前值
   */
  getValue(): number;

  /**
   * 获取下界值
   * @returns 下界值（最小值或起始点与当前值的较小者）
   */
  getLowerBound(): number;

  /**
   * 获取上界值
   * @returns 上界值（起始点与当前值的较大者）
   */
  getUpperBound(): number;

  /**
   * 修剪并对齐值到合法范围和精度
   * @param value - 待处理的值
   * @param props - 可选的属性对象（用于获取min/max/step等配置）
   * @returns 处理后的合法值
   */
  trimAlignValue(value: number | null, props?: Partial<SliderProps>): number | null;

  /**
   * 根据位置获取值（由高阶组件注入的方法）
   * @param position - 位置信息
   * @returns 值数组
   */
  positionGetValue(position: number): number[];

  /**
   * 渲染组件
   * @returns 渲染结果对象
   */
  render(): SliderRenderResult;
}