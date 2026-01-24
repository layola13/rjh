import React from 'react';

/**
 * 滑块组件的值范围配置
 */
export interface SliderRange {
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
}

/**
 * 滑块组件的规则配置
 */
export interface SliderRules {
  /** 值的范围限制 */
  range: SliderRange;
}

/**
 * 滑块组件的选项配置
 */
export interface SliderOptions {
  /** 是否只读 */
  readOnly: boolean;
  /** 验证规则 */
  rules: SliderRules;
}

/**
 * 滑块组件的数据属性
 */
export interface SliderData {
  /** 自定义 CSS 类名 */
  className?: string;
  /** 标签文本 */
  label?: string;
  /** 当前值 */
  value: number;
  /** 是否延迟触发事件 */
  delay?: boolean;
  /** 组件配置选项 */
  options: SliderOptions;
}

/**
 * 滑块组件的 Props
 */
export interface SliderProps {
  /** 滑块数据配置 */
  data: SliderData;
}

/**
 * 滑块组件的 State
 */
export interface SliderState {
  /** 当前值 */
  value: number;
  /** 是否只读 */
  readOnly: boolean;
}

/**
 * 值变化接口（从 IValueChange mixin 继承）
 */
export interface IValueChange {
  /** 值开始变化时触发 */
  changeStart(value: number): void;
  /** 值变化过程中触发 */
  changed(value: number): void;
  /** 值变化结束时触发 */
  changeEnd(value: number): void;
  /** 组件失活时触发 */
  onDeactive(): void;
}

/**
 * 双向滑块组件
 * 支持负值和正值的滑动选择，适用于需要在零点两侧选择数值的场景
 */
export default class DoubleSlider extends React.Component<SliderProps, SliderState> implements IValueChange {
  /** 是否正在拖动 */
  private startMove: boolean;
  /** 拖动起始 X 坐标 */
  private startX: number;
  /** 拖动起始值 */
  private startValue: number;
  /** 滑块左侧像素位置 */
  private leftPixel: number;
  /** 滑块右侧像素位置 */
  private rightPixel: number;
  /** 滑块总长度（像素） */
  private sliderLength: number;
  
  /** 滑块容器 DOM 引用 */
  private slider: HTMLDivElement | null;
  /** 滑块手柄 DOM 引用 */
  private sliderHandle: HTMLDivElement | null;
  /** 左侧轨道区域1引用 */
  private leftOne: HTMLDivElement | null;
  /** 左侧轨道区域2引用 */
  private leftTwo: HTMLDivElement | null;
  /** 右侧轨道区域1引用 */
  private rightOne: HTMLDivElement | null;
  /** 右侧轨道区域2引用 */
  private rightTwo: HTMLDivElement | null;

  /**
   * 鼠标抬起事件处理
   */
  onmouseup(): void;

  /**
   * 鼠标移动事件处理
   * @param event - 鼠标事件对象
   */
  onmousemove(event: MouseEvent): void;

  /**
   * 鼠标按下事件处理
   * @param event - 鼠标事件对象
   */
  onmousedown(event: React.MouseEvent): void;

  /**
   * 延迟模式下的鼠标移动处理
   * @param event - 鼠标事件对象
   */
  delayMousemoveFun(event: MouseEvent): void;

  /**
   * 延迟模式下的鼠标抬起处理
   */
  delayMouseupFun(): void;

  /**
   * 根据鼠标移动距离计算新的值
   * @param event - 鼠标事件对象
   * @returns 计算后的新值
   */
  calMouseMoveValue(event: MouseEvent): number;

  /**
   * 添加鼠标事件监听器
   */
  addEventListener(): void;

  /**
   * 移除鼠标事件监听器
   */
  removeEventListener(): void;

  /**
   * 处理窗口大小变化，重新计算滑块尺寸
   */
  handleResize(): void;

  /**
   * 禁用鼠标交互时的视觉反馈
   */
  mouseDisabled(): void;

  /**
   * 启用鼠标交互时的视觉反馈
   */
  mouseEnabled(): void;

  /**
   * 阻止事件冒泡和默认行为
   * @param event - 事件对象
   * @returns false
   */
  pauseEvent(event: Event): boolean;

  // React 生命周期方法
  componentDidMount(): void;
  componentWillUnmount(): void;
  UNSAFE_componentWillReceiveProps(nextProps: SliderProps): void;
  componentDidUpdate(): void;

  // IValueChange 接口实现
  changeStart(value: number): void;
  changed(value: number): void;
  changeEnd(value: number): void;
  onDeactive(): void;

  render(): React.ReactElement | null;
}