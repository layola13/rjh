/**
 * VContent 组件类型定义
 * @deprecated 此组件已弃用，请使用 v-main 代替
 * @module VContent
 */

import type { VueConstructor, VNode, CreateElement } from 'vue';
import type VMain from '../VMain/VMain';

/**
 * VContent 组件选项接口
 * @deprecated 使用 v-main 组件替代
 */
export interface VContentOptions {
  /** 组件名称 */
  name: string;
  
  /**
   * 组件创建时的生命周期钩子
   * 在创建时会显示弃用警告
   */
  created(): void;
  
  /**
   * 渲染函数
   * @param createElement - Vue 的 createElement 函数
   * @returns 渲染的虚拟节点
   */
  render(createElement: CreateElement): VNode;
}

/**
 * VContent 组件实例类型
 * @deprecated 此组件已弃用，使用 VMain 组件替代
 * @remarks
 * VContent 是 VMain 组件的别名，用于向后兼容
 * 在创建实例时会自动显示弃用警告
 */
export interface VContent extends VMain {
  /** 组件名称，固定为 "v-main" */
  readonly $options: VContentOptions;
}

/**
 * VContent 组件构造函数
 * @deprecated 请使用 VMain 组件
 * @remarks
 * 此组件继承自 VMain，添加了 "v-content" 和 "v-content__wrap" 样式类
 * 在组件创建时会调用 deprecate 工具函数显示迁移提示
 */
declare const VContent: VueConstructor<VContent>;

export default VContent;