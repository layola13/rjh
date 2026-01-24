/**
 * VTimePickerClock - 时间选择器时钟表盘组件
 * 用于在圆形表盘上选择时间值（小时/分钟）
 */

import Vue, { VNode, CreateElement } from 'vue';

/**
 * 坐标点接口
 */
export interface Position {
  /** X 坐标（-1 到 1 之间的标准化值） */
  x: number;
  /** Y 坐标（-1 到 1 之间的标准化值） */
  y: number;
}

/**
 * 样式变换对象
 */
export interface Transform {
  /** 左偏移百分比 */
  left: string;
  /** 上偏移百分比 */
  top: string;
}

/**
 * VTimePickerClock 组件属性接口
 */
export interface VTimePickerClockProps {
  /**
   * 允许值的验证函数
   * @param value - 要验证的值
   * @returns 如果值允许则返回 true
   */
  allowedValues?: (value: number) => boolean;

  /** 是否使用 AM/PM 格式 */
  ampm?: boolean;

  /** 是否禁用 */
  disabled?: boolean;

  /** 是否为双圈模式（内外两圈，用于24小时制） */
  double?: boolean;

  /**
   * 值格式化函数
   * @param value - 要格式化的值
   * @returns 格式化后的字符串
   * @default (value) => value
   */
  format?: (value: number) => string | number;

  /** 最大值（必填） */
  max: number;

  /** 最小值（必填） */
  min: number;

  /** 是否支持滚轮滚动 */
  scrollable?: boolean;

  /** 是否只读 */
  readonly?: boolean;

  /**
   * 旋转角度偏移量（度数）
   * @default 0
   */
  rotate?: number;

  /**
   * 步进值
   * @default 1
   */
  step?: number;

  /** 当前选中的值 */
  value?: number;

  /** 颜色主题 */
  color?: string;
}

/**
 * VTimePickerClock 组件数据接口
 */
export interface VTimePickerClockData {
  /** 内部输入值 */
  inputValue: number | undefined;

  /** 是否正在拖拽 */
  isDragging: boolean;

  /** 鼠标按下时的值 */
  valueOnMouseDown: number | null;

  /** 鼠标释放时的值 */
  valueOnMouseUp: number | null;
}

/**
 * VTimePickerClock 组件计算属性接口
 */
export interface VTimePickerClockComputed {
  /** 总数量（max - min + 1） */
  count: number;

  /** 每个单位对应的角度 */
  degreesPerUnit: number;

  /** 每个单位对应的弧度 */
  degrees: number;

  /** 当前显示的值（如果 value 为 null 则显示 min） */
  displayedValue: number;

  /** 内圈半径缩放比例 */
  innerRadiusScale: number;

  /** 圆圈上的项目数量 */
  roundCount: number;

  /** 主题类名 */
  themeClasses: Record<string, boolean>;
}

/**
 * VTimePickerClock 组件方法接口
 */
export interface VTimePickerClockMethods {
  /**
   * 鼠标滚轮事件处理
   * @param event - 滚轮事件
   */
  wheel(event: WheelEvent): void;

  /**
   * 判断值是否在内圈
   * @param value - 要判断的值
   * @returns 如果值在内圈则返回 true
   */
  isInner(value: number): boolean;

  /**
   * 获取指针的缩放比例
   * @param value - 值
   * @returns 缩放比例（内圈为 innerRadiusScale，外圈为 1）
   */
  handScale(value: number): number;

  /**
   * 检查值是否被允许
   * @param value - 要检查的值
   * @returns 如果值被允许则返回 true
   */
  isAllowed(value: number): boolean;

  /**
   * 生成时钟刻度值的 VNode 数组
   * @returns VNode 数组
   */
  genValues(): VNode[];

  /**
   * 生成时钟指针的 VNode
   * @returns 指针 VNode
   */
  genHand(): VNode;

  /**
   * 获取指定值对应的 CSS 变换样式
   * @param value - 值
   * @returns 包含 left 和 top 的样式对象
   */
  getTransform(value: number): Transform;

  /**
   * 获取指定值在表盘上的位置坐标
   * @param value - 值
   * @returns 标准化的坐标点
   */
  getPosition(value: number): Position;

  /**
   * 鼠标按下事件处理
   * @param event - 鼠标事件
   */
  onMouseDown(event: MouseEvent | TouchEvent): void;

  /**
   * 鼠标释放事件处理
   * @param event - 鼠标事件
   */
  onMouseUp(event: MouseEvent | TouchEvent): void;

  /**
   * 拖拽移动事件处理
   * @param event - 鼠标或触摸事件
   */
  onDragMove(event: MouseEvent | TouchEvent): void;

  /**
   * 将角度转换为对应的值
   * @param degrees - 角度
   * @param isInner - 是否在内圈
   * @returns 对应的值
   */
  angleToValue(degrees: number, isInner: boolean): number;

  /**
   * 设置鼠标按下时的值
   * @param value - 值
   */
  setMouseDownValue(value: number): void;

  /**
   * 更新当前值并触发 input 事件
   * @param value - 新值
   */
  update(value: number): void;

  /**
   * 计算两点之间的欧几里得距离
   * @param point1 - 第一个点
   * @param point2 - 第二个点
   * @returns 距离
   */
  euclidean(point1: Position, point2: Position): number;

  /**
   * 计算两点之间的角度
   * @param center - 中心点
   * @param point - 目标点
   * @returns 角度（度数）
   */
  angle(center: Position, point: Position): number;
}

/**
 * VTimePickerClock 组件类型定义
 */
declare const VTimePickerClock: Vue.Component<
  VTimePickerClockProps,
  VTimePickerClockData,
  VTimePickerClockMethods,
  VTimePickerClockComputed
> & {
  /** 组件名称 */
  name: 'v-time-picker-clock';

  /**
   * 渲染函数
   * @param h - createElement 函数
   * @returns VNode
   */
  render(h: CreateElement): VNode;
};

export default VTimePickerClock;

/**
 * 组件事件接口
 */
export interface VTimePickerClockEvents {
  /**
   * 输入值变化事件
   * @param value - 新值
   */
  input: (value: number) => void;

  /**
   * 值确认变化事件（鼠标释放时触发）
   * @param value - 确认的值
   */
  change: (value: number) => void;
}