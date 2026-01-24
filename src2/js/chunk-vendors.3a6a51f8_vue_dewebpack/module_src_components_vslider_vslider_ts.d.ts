/**
 * VSlider 组件类型定义
 * 一个可自定义的滑块输入组件，支持垂直/水平布局、刻度标签、缩略图标签等功能
 */

import Vue, { VNode, PropType } from 'vue';
import { VInput } from '../VInput';
import { Loadable } from '../../mixins/loadable';

/**
 * 滑块内部数据状态
 */
interface VSliderData {
  /** 应用根元素引用 */
  app: HTMLElement | null;
  /** 上一次的值，用于变更检测 */
  oldValue: number | null;
  /** 当前按键按下次数 */
  keyPressed: number;
  /** 是否获得焦点 */
  isFocused: boolean;
  /** 是否处于激活状态（拖动中） */
  isActive: boolean;
  /** 是否禁止点击事件 */
  noClick: boolean;
}

/**
 * 鼠标移动解析结果
 */
interface MouseMoveParseResult {
  /** 计算出的滑块值 */
  value: number;
  /** 鼠标是否在轨道范围内 */
  isInsideTrack: boolean;
}

/**
 * 样式对象类型
 */
interface StyleObject {
  [key: string]: string | number | undefined;
  transition?: string;
  width?: string;
  height?: string;
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  transform?: string;
}

/**
 * VSlider 组件属性
 */
export interface VSliderProps {
  /** 是否禁用滑块 */
  disabled: boolean;
  
  /** 是否反转标签位置 */
  inverseLabel: boolean;
  
  /** 滑块最大值 */
  max: number | string;
  
  /** 滑块最小值 */
  min: number | string;
  
  /** 步进值 */
  step: number | string;
  
  /** 缩略图颜色 */
  thumbColor?: string;
  
  /** 缩略图标签显示模式：true（焦点时显示）| false（不显示）| 'always'（始终显示） */
  thumbLabel?: boolean | 'always';
  
  /** 缩略图尺寸（像素） */
  thumbSize: number | string;
  
  /** 刻度标签数组 */
  tickLabels: string[];
  
  /** 刻度显示模式：true（有步进时显示）| false（不显示）| 'always'（始终显示） */
  ticks: boolean | 'always';
  
  /** 刻度大小（像素） */
  tickSize: number | string;
  
  /** 轨道背景颜色 */
  trackColor?: string;
  
  /** 轨道填充颜色 */
  trackFillColor?: string;
  
  /** 当前值 */
  value: number | string;
  
  /** 是否垂直布局 */
  vertical: boolean;
}

/**
 * VSlider 组件计算属性
 */
export interface VSliderComputed {
  /** 组件CSS类名 */
  classes: Record<string, boolean>;
  
  /** 内部值（双向绑定） */
  internalValue: number;
  
  /** 轨道过渡动画 */
  trackTransition: string;
  
  /** 最小值（数值类型） */
  minValue: number;
  
  /** 最大值（数值类型） */
  maxValue: number;
  
  /** 步进值（数值类型） */
  stepNumeric: number;
  
  /** 输入宽度百分比 */
  inputWidth: number;
  
  /** 轨道填充样式对象 */
  trackFillStyles: StyleObject;
  
  /** 轨道背景样式对象 */
  trackStyles: StyleObject;
  
  /** 是否显示刻度 */
  showTicks: boolean;
  
  /** 刻度数量 */
  numTicks: number;
  
  /** 是否显示缩略图标签 */
  showThumbLabel: boolean;
  
  /** 计算后的轨道颜色 */
  computedTrackColor: string | undefined;
  
  /** 计算后的轨道填充颜色 */
  computedTrackFillColor: string | undefined;
  
  /** 计算后的缩略图颜色 */
  computedThumbColor: string | undefined;
}

/**
 * VSlider 组件方法
 */
export interface VSliderMethods {
  /**
   * 生成默认插槽内容
   * @returns VNode数组
   */
  genDefaultSlot(): VNode[];
  
  /**
   * 生成滑块主容器
   * @returns VNode
   */
  genSlider(): VNode;
  
  /**
   * 生成子元素
   * @returns VNode数组
   */
  genChildren(): VNode[];
  
  /**
   * 生成隐藏输入元素
   * @returns VNode
   */
  genInput(): VNode;
  
  /**
   * 生成轨道容器
   * @returns VNode
   */
  genTrackContainer(): VNode;
  
  /**
   * 生成刻度元素
   * @returns VNode | null
   */
  genSteps(): VNode | null;
  
  /**
   * 生成缩略图容器
   * @param value - 当前值
   * @param inputWidth - 输入宽度百分比
   * @param isActive - 是否激活
   * @param isFocused - 是否获得焦点
   * @param onMouseDown - 鼠标按下事件处理器
   * @param onFocus - 获得焦点事件处理器
   * @param onBlur - 失去焦点事件处理器
   * @param refKey - 引用键名（默认 'thumb'）
   * @returns VNode
   */
  genThumbContainer(
    value: number,
    inputWidth: number,
    isActive: boolean,
    isFocused: boolean,
    onMouseDown: (e: MouseEvent | TouchEvent) => void,
    onFocus: (e: FocusEvent) => void,
    onBlur: (e: FocusEvent) => void,
    refKey?: string
  ): VNode;
  
  /**
   * 生成缩略图标签内容
   * @param value - 当前值
   * @returns VNode数组
   */
  genThumbLabelContent(value: number): VNode[];
  
  /**
   * 生成缩略图标签
   * @param content - 标签内容VNode数组
   * @returns VNode
   */
  genThumbLabel(content: VNode[]): VNode;
  
  /**
   * 生成缩略图元素
   * @returns VNode
   */
  genThumb(): VNode;
  
  /**
   * 获取缩略图容器样式
   * @param inputWidth - 输入宽度百分比
   * @returns 样式对象
   */
  getThumbContainerStyles(inputWidth: number): StyleObject;
  
  /**
   * 缩略图鼠标按下事件处理器
   * @param e - 鼠标或触摸事件
   */
  onThumbMouseDown(e: MouseEvent | TouchEvent): void;
  
  /**
   * 滑块鼠标释放事件处理器
   * @param e - 鼠标或触摸事件
   */
  onSliderMouseUp(e: MouseEvent | TouchEvent): void;
  
  /**
   * 鼠标移动事件处理器
   * @param e - 鼠标或触摸事件
   */
  onMouseMove(e: MouseEvent | TouchEvent): void;
  
  /**
   * 键盘按下事件处理器
   * @param e - 键盘事件
   */
  onKeyDown(e: KeyboardEvent): void;
  
  /**
   * 键盘释放事件处理器
   */
  onKeyUp(): void;
  
  /**
   * 滑块点击事件处理器
   * @param e - 鼠标事件
   */
  onSliderClick(e: MouseEvent): void;
  
  /**
   * 失去焦点事件处理器
   * @param e - 焦点事件
   */
  onBlur(e: FocusEvent): void;
  
  /**
   * 获得焦点事件处理器
   * @param e - 焦点事件
   */
  onFocus(e: FocusEvent): void;
  
  /**
   * 解析鼠标移动事件，计算滑块值
   * @param e - 鼠标或触摸事件
   * @returns 解析结果
   */
  parseMouseMove(e: MouseEvent | TouchEvent): MouseMoveParseResult;
  
  /**
   * 解析键盘按下事件，计算新值
   * @param e - 键盘事件
   * @param currentValue - 当前值
   * @returns 新值或 undefined
   */
  parseKeyDown(e: KeyboardEvent, currentValue: number): number | undefined;
  
  /**
   * 根据步进值对值进行四舍五入
   * @param value - 原始值
   * @returns 四舍五入后的值
   */
  roundValue(value: number): number;
}

/**
 * VSlider 组件事件
 */
export interface VSliderEvents {
  /** 值变更事件（实时） */
  'input': (value: number) => void;
  
  /** 值变更事件（拖动结束后） */
  'change': (value: number) => void;
  
  /** 开始拖动事件 */
  'start': (value: number) => void;
  
  /** 结束拖动事件 */
  'end': (value: number) => void;
  
  /** 鼠标释放事件 */
  'mouseup': (e: MouseEvent | TouchEvent) => void;
  
  /** 获得焦点事件 */
  'focus': (e: FocusEvent) => void;
  
  /** 失去焦点事件 */
  'blur': (e: FocusEvent) => void;
}

/**
 * VSlider 组件作用域插槽
 */
export interface VSliderScopedSlots {
  /**
   * 缩略图标签插槽
   * @param props - 插槽属性
   * @param props.value - 当前值
   */
  'thumb-label'?: (props: { value: number }) => VNode[];
}

/**
 * VSlider 组件定义
 */
declare const VSlider: Vue.ExtendedVue<
  VInput & Loadable,
  VSliderData,
  VSliderMethods,
  VSliderComputed,
  VSliderProps
>;

export default VSlider;