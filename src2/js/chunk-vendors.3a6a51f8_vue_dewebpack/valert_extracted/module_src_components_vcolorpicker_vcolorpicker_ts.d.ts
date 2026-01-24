/**
 * VColorPicker 组件类型定义
 * 颜色选择器组件，支持多种颜色模式（RGBA、HSLA、HEXA）
 */

import Vue, { VNode, PropType } from 'vue';
import { ColorObject, ColorMode } from './util';

/**
 * 颜色选择器组件的属性接口
 */
export interface VColorPickerProps {
  /**
   * 画布高度
   * @default 150
   */
  canvasHeight?: string | number;

  /**
   * 是否禁用组件
   * @default false
   */
  disabled?: boolean;

  /**
   * 颜色选择点的尺寸
   * @default 10
   */
  dotSize?: number | string;

  /**
   * 是否扁平化显示（无阴影）
   * @default false
   */
  flat?: boolean;

  /**
   * 是否隐藏画布区域
   * @default false
   */
  hideCanvas?: boolean;

  /**
   * 是否隐藏输入框
   * @default false
   */
  hideInputs?: boolean;

  /**
   * 是否隐藏模式切换按钮
   * @default false
   */
  hideModeSwitch?: boolean;

  /**
   * 颜色模式（rgba、hsla、hexa 等）
   * @default "rgba"
   */
  mode?: ColorMode;

  /**
   * 是否显示色板
   * @default false
   */
  showSwatches?: boolean;

  /**
   * 自定义色板颜色数组
   */
  swatches?: string[][];

  /**
   * 色板最大高度
   * @default 150
   */
  swatchesMaxHeight?: number | string;

  /**
   * 当前颜色值（对象或字符串）
   */
  value?: ColorObject | string;

  /**
   * 组件宽度
   * @default 300
   */
  width?: number | string;

  /**
   * 深色主题
   */
  dark?: boolean;

  /**
   * 浅色主题
   */
  light?: boolean;
}

/**
 * 颜色选择器组件的事件接口
 */
export interface VColorPickerEvents {
  /**
   * 颜色值变化事件
   * @param color - 新的颜色值
   */
  input: (color: ColorObject | string) => void;

  /**
   * 颜色对象更新事件
   * @param color - 完整的颜色对象
   */
  'update:color': (color: ColorObject) => void;

  /**
   * 模式切换事件
   * @param mode - 新的颜色模式
   */
  'update:mode': (mode: ColorMode) => void;
}

/**
 * 颜色选择器组件的数据接口
 */
export interface VColorPickerData {
  /**
   * 内部颜色状态对象
   */
  internalValue: ColorObject;
}

/**
 * 颜色选择器组件的计算属性接口
 */
export interface VColorPickerComputed {
  /**
   * 是否隐藏透明度控制
   * 根据当前值判断是否包含 alpha 通道
   */
  hideAlpha: boolean;
}

/**
 * 颜色选择器组件的方法接口
 */
export interface VColorPickerMethods {
  /**
   * 更新颜色值
   * @param color - 新的颜色对象
   */
  updateColor(color: ColorObject): void;

  /**
   * 生成画布 VNode
   */
  genCanvas(): VNode;

  /**
   * 生成控制区域 VNode
   */
  genControls(): VNode;

  /**
   * 生成编辑器 VNode
   */
  genEdit(): VNode;

  /**
   * 生成预览区域 VNode
   */
  genPreview(): VNode;

  /**
   * 生成色板 VNode
   */
  genSwatches(): VNode;
}

/**
 * VColorPicker 组件实例类型
 */
export type VColorPickerInstance = Vue & 
  VColorPickerProps & 
  VColorPickerData & 
  VColorPickerComputed & 
  VColorPickerMethods;

/**
 * VColorPicker 组件定义
 * 
 * @example
 *