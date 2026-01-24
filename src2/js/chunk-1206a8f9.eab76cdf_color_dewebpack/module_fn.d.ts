/**
 * Vue 组件渲染函数类型定义
 * 用于颜色选择器菜单组件
 */

import type { VNode, CreateElement } from 'vue';
import type { ScopedSlotReturnValue } from 'vue/types/vnode';

/**
 * 组件实例上下文接口
 */
interface ColorPickerMenuContext {
  /** 是否显示顶部 */
  top: boolean;
  
  /** 是否显示颜色选择器菜单 */
  show_color: boolean;
  
  /** 当前选中的颜色值 */
  color: string;
  
  /** 颜色块的样式对象 */
  color_block_style: Record<string, string | number>;
  
  /** 是否显示色板 */
  showSwatches: boolean;
  
  /** 色板颜色数组 */
  swatches: string[];
  
  /**
   * 颜色选择回调函数
   * @param color - 新选择的颜色值
   */
  pickColor: (color: string) => void;
  
  /**
   * Vue 内部方法：用于处理作用域插槽
   * @param slots - 插槽配置数组
   */
  _u: (slots: ScopedSlot[]) => Record<string, Function>;
  
  /**
   * Vue 内部方法：用于绑定事件监听器
   * @param data - 数据对象
   * @param listeners - 事件监听器对象
   */
  _g: (data: Record<string, unknown>, listeners: Record<string, Function>) => Record<string, unknown>;
}

/**
 * 作用域插槽配置接口
 */
interface ScopedSlot {
  /** 插槽名称 */
  key: string;
  
  /** 插槽渲染函数 */
  fn: (slotProps: ScopedSlotProps) => VNode[];
}

/**
 * 作用域插槽属性接口
 */
interface ScopedSlotProps {
  /** 事件监听器对象 */
  on: Record<string, Function>;
  
  /** 其他属性 */
  [key: string]: unknown;
}

/**
 * 颜色选择器菜单渲染函数
 * 
 * 渲染一个带下拉菜单的颜色选择器组件
 * - 使用 v-menu 作为容器
 * - 激活器是一个带颜色背景的按钮
 * - 菜单内容是 v-color-picker 组件
 * 
 * @param this - 组件实例上下文
 * @param createElement - Vue 的 createElement 函数
 * @returns 虚拟节点数组
 */
declare function renderColorPickerMenu(
  this: ColorPickerMenuContext,
  createElement: CreateElement
): VNode[];

export type { 
  ColorPickerMenuContext, 
  ScopedSlot, 
  ScopedSlotProps 
};
export default renderColorPickerMenu;