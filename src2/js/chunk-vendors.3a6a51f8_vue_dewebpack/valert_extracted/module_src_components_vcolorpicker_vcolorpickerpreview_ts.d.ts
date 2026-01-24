/**
 * VColorPickerPreview 组件类型定义
 * 颜色选择器预览组件，提供色调和透明度滑块控制
 */

import Vue, { VNode, CreateElement } from 'vue';
import { VSlider } from '../VSlider/VSlider';
import { HSVA, RGBA, ColorObject } from '../../util/colorUtils';

/**
 * 颜色对象接口
 */
export interface ColorPickerColor {
  /** HSVA 颜色值 */
  hsva: HSVA;
  /** RGBA 颜色值 */
  rgba: RGBA;
  /** 色调值 (0-360) */
  hue: number;
  /** 透明度值 (0-1) */
  alpha: number;
}

/**
 * 滑块配置选项
 */
export interface TrackOptions {
  /** 静态CSS类名 */
  staticClass?: string;
  /** 组件属性 */
  props?: {
    /** 滑块颜色 */
    thumbColor?: string;
    /** 隐藏详情 */
    hideDetails?: boolean;
    /** 当前值 */
    value?: number;
    /** 步进值 */
    step?: number;
    /** 最小值 */
    min?: number;
    /** 最大值 */
    max?: number;
    /** 是否禁用 */
    disabled?: boolean;
  };
  /** 自定义样式 */
  style?: Partial<CSSStyleDeclaration> | Record<string, string | number | undefined>;
  /** 事件监听器 */
  on?: {
    /** 输入事件处理器 */
    input?: (value: number) => void;
    [key: string]: Function | undefined;
  };
  /** CSS类绑定 */
  class?: string | string[] | Record<string, boolean>;
}

/**
 * VColorPickerPreview 组件属性
 */
export interface VColorPickerPreviewProps {
  /** 当前颜色对象 */
  color: ColorPickerColor;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否隐藏透明度滑块 */
  hideAlpha?: boolean;
}

/**
 * VColorPickerPreview 组件实例
 */
export interface VColorPickerPreviewInstance extends Vue {
  /** 组件属性 */
  color: ColorPickerColor;
  disabled: boolean;
  hideAlpha: boolean;

  /**
   * 生成透明度滑块
   * @returns 透明度滑块VNode
   */
  genAlpha(): VNode;

  /**
   * 生成所有滑块容器
   * @returns 滑块容器VNode
   */
  genSliders(): VNode;

  /**
   * 生成颜色预览点
   * @returns 预览点VNode
   */
  genDot(): VNode;

  /**
   * 生成色调滑块
   * @returns 色调滑块VNode
   */
  genHue(): VNode;

  /**
   * 生成通用滑块轨道
   * @param options - 滑块配置选项
   * @returns 滑块轨道VNode
   */
  genTrack(options: TrackOptions): VNode;

  /**
   * 渲染函数
   * @param h - createElement函数
   * @returns 组件VNode
   */
  render(h: CreateElement): VNode;
}

/**
 * VColorPickerPreview 组件
 * 用于显示和调整颜色的预览组件，包含色调和透明度控制
 */
declare const VColorPickerPreview: {
  new (): VColorPickerPreviewInstance;
};

export default VColorPickerPreview;