/**
 * VIcon 组件类型定义
 * Vuetify 图标组件，支持 Material Icons、Font Awesome 和自定义 SVG 图标
 */

import Vue, { VNode, VNodeData, CreateElement, FunctionalComponentOptions } from 'vue';

/**
 * 图标尺寸预设值枚举
 */
export enum IconSize {
  /** 超小尺寸: 12px */
  xSmall = '12px',
  /** 小尺寸: 16px */
  small = '16px',
  /** 默认尺寸: 24px */
  default = '24px',
  /** 中等尺寸: 28px */
  medium = '28px',
  /** 大尺寸: 36px */
  large = '36px',
  /** 超大尺寸: 40px */
  xLarge = '40px'
}

/**
 * 图标组件的属性接口
 */
export interface VIconProps {
  /** 密集模式，减少内边距 */
  dense?: boolean;
  
  /** 禁用状态 */
  disabled?: boolean;
  
  /** 图标位置在左侧 */
  left?: boolean;
  
  /** 图标位置在右侧 */
  right?: boolean;
  
  /** 自定义图标尺寸（数字单位为px，也可传字符串） */
  size?: number | string;
  
  /** HTML 标签名称 */
  tag?: string;
  
  /** 超小尺寸开关 */
  xSmall?: boolean;
  
  /** 小尺寸开关 */
  small?: boolean;
  
  /** 中等尺寸开关 */
  medium?: boolean;
  
  /** 大尺寸开关 */
  large?: boolean;
  
  /** 超大尺寸开关 */
  xLarge?: boolean;
  
  /** 图标颜色（支持 Vuetify 颜色类名） */
  color?: string;
}

/**
 * SVG 图标组件配置接口
 */
export interface SvgIconComponent {
  /** Vue 组件实例 */
  component: Vue.Component;
  
  /** 传递给组件的属性 */
  props?: Record<string, unknown>;
}

/**
 * VIcon 组件计算属性接口
 */
export interface VIconComputed {
  /** 中等尺寸状态 */
  medium: boolean;
  
  /** 是否存在点击事件监听器 */
  hasClickListener: boolean;
}

/**
 * VIcon 组件方法接口
 */
export interface VIconMethods {
  /**
   * 获取图标名称或路径
   * @returns 图标标识符字符串
   */
  getIcon(): string;
  
  /**
   * 根据组件属性计算图标尺寸
   * @returns CSS 尺寸字符串或 undefined
   */
  getSize(): string | undefined;
  
  /**
   * 生成默认的 VNode 数据对象
   * @returns Vue 虚拟节点数据
   */
  getDefaultData(): VNodeData;
  
  /**
   * 生成 SVG 包装器的 VNode 数据对象
   * @returns Vue 虚拟节点数据
   */
  getSvgWrapperData(): VNodeData;
  
  /**
   * 应用颜色和主题类到 VNode 数据
   * @param data - 要修改的 VNode 数据对象
   */
  applyColors(data: VNodeData): void;
  
  /**
   * 渲染字体图标（Material Icons 或 Font Awesome）
   * @param iconName - 图标名称
   * @param h - Vue 的 createElement 函数
   * @returns 虚拟节点
   */
  renderFontIcon(iconName: string, h: CreateElement): VNode;
  
  /**
   * 渲染 SVG 路径图标
   * @param pathData - SVG path 的 d 属性数据
   * @param h - Vue 的 createElement 函数
   * @returns 虚拟节点
   */
  renderSvgIcon(pathData: string, h: CreateElement): VNode;
  
  /**
   * 渲染自定义 SVG 组件
   * @param iconConfig - SVG 组件配置对象
   * @param h - Vue 的 createElement 函数
   * @returns 虚拟节点
   */
  renderSvgIconComponent(iconConfig: SvgIconComponent, h: CreateElement): VNode;
}

/**
 * VIcon 组件类接口
 * 混合了 BindsAttrs、Colorable、Sizeable、Themeable 等 Mixins
 */
export interface VIconComponent extends Vue {
  /** 组件属性 */
  $props: VIconProps;
  
  /** 组件计算属性 */
  medium: boolean;
  hasClickListener: boolean;
  
  /** 组件方法 */
  getIcon(): string;
  getSize(): string | undefined;
  getDefaultData(): VNodeData;
  getSvgWrapperData(): VNodeData;
  applyColors(data: VNodeData): void;
  renderFontIcon(iconName: string, h: CreateElement): VNode;
  renderSvgIcon(pathData: string, h: CreateElement): VNode;
  renderSvgIconComponent(iconConfig: SvgIconComponent, h: CreateElement): VNode;
}

/**
 * 函数式组件的上下文接口
 */
export interface VIconFunctionalContext {
  /** VNode 数据对象 */
  data: VNodeData;
  
  /** 子节点数组 */
  children?: VNode[];
}

/**
 * VIcon 函数式组件包装器
 * 用于优化性能的轻量级包装
 */
export interface VIconFunctional extends Vue {
  /** 标识为函数式组件 */
  functional: true;
  
  /** 内部包装的组件引用 */
  $_wrapperFor: typeof VIconComponent;
  
  /**
   * 函数式组件渲染函数
   * @param h - Vue 的 createElement 函数
   * @param context - 函数式组件上下文
   * @returns 虚拟节点
   */
  render(h: CreateElement, context: VIconFunctionalContext): VNode;
}

/**
 * VIcon 组件声明
 * @example
 * <v-icon>home</v-icon>
 * <v-icon small color="primary">mdi-heart</v-icon>
 * <v-icon :size="32">fas fa-user</v-icon>
 */
declare const VIcon: VIconFunctional & {
  /** 组件名称 */
  name: 'v-icon';
};

export default VIcon;