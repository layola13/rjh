import Vue, { VNode, VNodeData } from 'vue';
import { PropType } from 'vue';

/**
 * VOverlay 组件的属性接口
 */
export interface VOverlayProps {
  /** 是否使用绝对定位 */
  absolute?: boolean;
  /** 遮罩层颜色 */
  color?: string;
  /** 是否使用深色主题 */
  dark?: boolean;
  /** 遮罩层透明度 (0-1) */
  opacity?: number | string;
  /** 控制遮罩层显示/隐藏状态 */
  value?: boolean;
  /** z-index 层级 */
  zIndex?: number | string;
}

/**
 * VOverlay 组件的计算属性接口
 */
export interface VOverlayComputed {
  /** 遮罩层背景元素 */
  __scrim: VNode;
  /** 组件 CSS 类名对象 */
  classes: Record<string, boolean>;
  /** 计算后的透明度值 */
  computedOpacity: number;
  /** 组件样式对象 */
  styles: Record<string, number | string>;
  /** 主题相关的 CSS 类名 */
  themeClasses: Record<string, boolean>;
  /** 组件激活状态 */
  isActive: boolean;
}

/**
 * VOverlay 组件的方法接口
 */
export interface VOverlayMethods {
  /**
   * 生成内容容器元素
   * @returns 包含默认插槽内容的 VNode
   */
  genContent(): VNode;
  
  /**
   * 设置背景颜色
   * @param color - 颜色值
   * @param data - VNode 数据对象
   * @returns 合并后的 VNode 数据
   */
  setBackgroundColor(color: string, data?: VNodeData): VNodeData;
}

/**
 * VOverlay 遮罩层组件
 * 
 * 提供全屏或绝对定位的遮罩层效果，支持自定义颜色、透明度和层级
 * 
 * @example
 *