/**
 * VResponsive 组件类型定义
 * 一个响应式容器组件，支持宽高比约束和可测量样式
 */

import Vue, { VNode, CreateElement, VNodeData } from 'vue';
import { CombinedVueInstance } from 'vue/types/vue';

/**
 * VResponsive 组件的 Props 接口
 */
interface VResponsiveProps {
  /**
   * 宽高比，可以是字符串或数字格式
   * 例如: "16:9" 或 1.777
   */
  aspectRatio?: string | number;
  
  /**
   * 来自 Measurable mixin 的属性
   */
  height?: number | string;
  maxHeight?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  minWidth?: number | string;
  width?: number | string;
}

/**
 * VResponsive 组件的计算属性接口
 */
interface VResponsiveComputed {
  /**
   * 计算后的数值型宽高比
   */
  computedAspectRatio: number;
  
  /**
   * 用于维持宽高比的样式对象
   * 使用 padding-bottom 技巧实现响应式宽高比
   */
  aspectStyle: { paddingBottom: string } | undefined;
  
  /**
   * 缓存的占位符元素（用于维持宽高比）
   */
  __cachedSizer: VNode[];
  
  /**
   * 来自 Measurable mixin 的可测量样式
   */
  measurableStyles: Partial<CSSStyleDeclaration>;
}

/**
 * VResponsive 组件的方法接口
 */
interface VResponsiveMethods {
  /**
   * 生成内容容器元素
   * @returns 包含默认插槽内容的 VNode
   */
  genContent(): VNode;
}

/**
 * VResponsive 组件实例类型
 */
type VResponsiveInstance = CombinedVueInstance<
  Vue,
  Record<string, never>,
  VResponsiveMethods,
  VResponsiveComputed,
  VResponsiveProps
>;

/**
 * VResponsive 组件构造器
 * 提供响应式容器功能，支持通过 aspectRatio 属性控制宽高比
 */
declare const VResponsive: {
  new (): VResponsiveInstance;
};

export default VResponsive;

/**
 * 组件使用示例:
 * 
 * <v-responsive :aspect-ratio="16/9">
 *   <v-img src="..."></v-img>
 * </v-responsive>
 */