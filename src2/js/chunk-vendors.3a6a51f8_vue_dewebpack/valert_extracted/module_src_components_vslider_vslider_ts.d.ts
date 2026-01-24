/**
 * VSlider 组件类型定义
 * 滑块输入组件，支持垂直/水平方向、刻度、标签等功能
 */

import Vue, { VNode, PropType } from 'vue';
import { VInput } from '../VInput';

/**
 * 刻度验证器类型
 */
type TicksValidator = boolean | 'always';

/**
 * 缩略图标签验证器类型
 */
type ThumbLabelValidator = boolean | 'always';

/**
 * 鼠标移动解析结果
 */
interface ParseMouseMoveResult {
  /** 计算后的滑块值 */
  value: number;
  /** 是否在轨道内 */
  isInsideTrack: boolean;
}

/**
 * VSlider 组件数据
 */
interface VSliderData {
  /** 应用根元素引用 */
  app: HTMLElement | null;
  /** 旧值，用于变更检测 */
  oldValue: number | null;
  /** 按键计数器 */
  keyPressed: number;
  /** 是否获得焦点 */
  isFocused: boolean;
  /** 是否处于活动状态 */
  isActive: boolean;
  /** 是否禁用点击事件 */
  noClick: boolean;
}

/**
 * 样式对象类型
 */
interface StyleObject {
  [key: string]: string | number;
}

/**
 * VSlider 组件定义
 */
export default interface VSlider extends Vue {
  // Props
  /** 是否禁用 */
  disabled: boolean;
  /** 是否反转标签位置 */
  inverseLabel: boolean;
  /** 最大值 */
  max: number | string;
  /** 最小值 */
  min: number | string;
  /** 步进值 */
  step: number | string;
  /** 滑块颜色 */
  thumbColor?: string;
  /** 滑块标签显示模式 */
  thumbLabel?: ThumbLabelValidator;
  /** 滑块大小（像素） */
  thumbSize: number | string;
  /** 刻度标签数组 */
  tickLabels: string[];
  /** 是否显示刻度 */
  ticks: TicksValidator;
  /** 刻度大小（像素） */
  tickSize: number | string;
  /** 轨道颜色 */
  trackColor?: string;
  /** 轨道填充颜色 */
  trackFillColor?: string;
  /** 当前值 */
  value: number | string;
  /** 是否垂直方向 */
  vertical: boolean;

  // Data
  app: HTMLElement | null;
  oldValue: number | null;
  keyPressed: number;
  isFocused: boolean;
  isActive: boolean;
  noClick: boolean;

  // Computed
  /** 组件样式类 */
  readonly classes: Record<string, boolean>;
  /** 内部值（双向绑定） */
  internalValue: number;
  /** 轨道过渡效果 */
  readonly trackTransition: string;
  /** 最小值（数字类型） */
  readonly minValue: number;
  /** 最大值（数字类型） */
  readonly maxValue: number;
  /** 步进值（数字类型） */
  readonly stepNumeric: number;
  /** 输入宽度百分比 */
  readonly inputWidth: number;
  /** 轨道填充样式 */
  readonly trackFillStyles: StyleObject;
  /** 轨道样式 */
  readonly trackStyles: StyleObject;
  /** 是否显示刻度 */
  readonly showTicks: boolean;
  /** 刻度数量 */
  readonly numTicks: number;
  /** 是否显示滑块标签 */
  readonly showThumbLabel: boolean;
  /** 计算后的轨道颜色 */
  readonly computedTrackColor?: string;
  /** 计算后的轨道填充颜色 */
  readonly computedTrackFillColor?: string;
  /** 计算后的滑块颜色 */
  readonly computedThumbColor?: string;

  // Methods
  /**
   * 生成默认插槽内容
   */
  genDefaultSlot(): VNode[];

  /**
   * 生成滑块容器
   */
  genSlider(): VNode;

  /**
   * 生成子元素
   */
  genChildren(): VNode[];

  /**
   * 生成隐藏输入元素
   */
  genInput(): VNode;

  /**
   * 生成轨道容器
   */
  genTrackContainer(): VNode;

  /**
   * 生成刻度
   */
  genSteps(): VNode | null;

  /**
   * 生成滑块容器
   * @param value 当前值
   * @param position 位置百分比
   * @param isActive 是否活动
   * @param isFocused 是否聚焦
   * @param onMouseDown 鼠标按下回调
   * @param onFocus 聚焦回调
   * @param onBlur 失焦回调
   * @param refName 引用名称
   */
  genThumbContainer(
    value: number,
    position: number,
    isActive: boolean,
    isFocused: boolean,
    onMouseDown: (e: MouseEvent | TouchEvent) => void,
    onFocus: (e: FocusEvent) => void,
    onBlur: (e: FocusEvent) => void,
    refName?: string
  ): VNode;

  /**
   * 生成滑块标签内容
   * @param value 当前值
   */
  genThumbLabelContent(value: number): VNode[];

  /**
   * 生成滑块标签
   * @param content 标签内容
   */
  genThumbLabel(content: VNode[]): VNode;

  /**
   * 生成滑块元素
   */
  genThumb(): VNode;

  /**
   * 获取滑块容器样式
   * @param position 位置百分比
   */
  getThumbContainerStyles(position: number): StyleObject;

  /**
   * 滑块鼠标按下事件处理
   * @param event 鼠标/触摸事件
   */
  onThumbMouseDown(event: MouseEvent | TouchEvent): void;

  /**
   * 滑块鼠标释放事件处理
   * @param event 鼠标/触摸事件
   */
  onSliderMouseUp(event: MouseEvent | TouchEvent): void;

  /**
   * 鼠标移动事件处理
   * @param event 鼠标/触摸事件
   */
  onMouseMove(event: MouseEvent | TouchEvent): void;

  /**
   * 按键按下事件处理
   * @param event 键盘事件
   */
  onKeyDown(event: KeyboardEvent): void;

  /**
   * 按键释放事件处理
   */
  onKeyUp(): void;

  /**
   * 滑块点击事件处理
   * @param event 鼠标事件
   */
  onSliderClick(event: MouseEvent): void;

  /**
   * 失焦事件处理
   * @param event 焦点事件
   */
  onBlur(event: FocusEvent): void;

  /**
   * 聚焦事件处理
   * @param event 焦点事件
   */
  onFocus(event: FocusEvent): void;

  /**
   * 解析鼠标移动事件
   * @param event 鼠标/触摸事件
   * @returns 解析结果
   */
  parseMouseMove(event: MouseEvent | TouchEvent): ParseMouseMoveResult;

  /**
   * 解析按键事件
   * @param event 键盘事件
   * @param currentValue 当前值
   * @returns 新值或 null
   */
  parseKeyDown(event: KeyboardEvent, currentValue: number): number | null;

  /**
   * 根据步进值四舍五入
   * @param value 原始值
   * @returns 四舍五入后的值
   */
  roundValue(value: number): number;
}

/**
 * 组件事件定义
 */
export interface VSliderEvents {
  /** 值变更事件 */
  input: number;
  /** 值改变事件（拖动结束后） */
  change: number;
  /** 开始拖动事件 */
  start: number;
  /** 结束拖动事件 */
  end: number;
  /** 鼠标释放事件 */
  mouseup: MouseEvent | TouchEvent;
  /** 聚焦事件 */
  focus: FocusEvent;
  /** 失焦事件 */
  blur: FocusEvent;
}

/**
 * 作用域插槽定义
 */
export interface VSliderSlots {
  /** 滑块标签插槽 */
  'thumb-label': { value: number };
}