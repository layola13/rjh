/**
 * VSubheader 组件类型声明
 * 用于显示列表或内容区域的副标题
 */

import Vue, { VNode, VNodeData } from 'vue';
import { CombinedVueInstance } from 'vue/types/vue';

/**
 * VSubheader 组件的属性接口
 */
export interface VSubheaderProps {
  /**
   * 是否缩进显示副标题
   * @default false
   */
  inset?: boolean;
}

/**
 * 主题相关的类名接口
 */
export interface ThemeClasses {
  [className: string]: boolean;
}

/**
 * VSubheader 组件实例类型
 */
export interface VSubheader extends Vue {
  /** 是否缩进显示 */
  inset: boolean;
  
  /** 主题相关的类名 */
  themeClasses: ThemeClasses;
  
  /**
   * 渲染函数
   * @param createElement - Vue 的 createElement 函数
   * @returns 渲染的虚拟节点
   */
  render(createElement: typeof Vue.prototype.$createElement): VNode;
}

/**
 * VSubheader 组件构造函数类型
 */
export type VSubheaderConstructor = CombinedVueInstance<
  VSubheader,
  object,
  object,
  object,
  VSubheaderProps
>;

/**
 * VSubheader 组件
 * 显示列表或内容区域的副标题，支持主题化和缩进样式
 */
declare const VSubheader: VSubheaderConstructor;

export default VSubheader;