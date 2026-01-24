/**
 * VListItemAction 组件类型定义
 * 一个函数式组件，用于渲染列表项的操作区域
 */

import { VNode, VNodeData, RenderContext, FunctionalComponentOptions } from 'vue';

/**
 * VListItemAction 组件的 props 类型
 * 由于是函数式组件且无显式 props，使用空对象类型
 */
export interface VListItemActionProps {}

/**
 * VListItemAction 组件选项
 */
export interface VListItemActionComponent extends FunctionalComponentOptions<VListItemActionProps> {
  /**
   * 组件名称
   */
  name: 'v-list-item-action';
  
  /**
   * 标识为函数式组件
   */
  functional: true;
  
  /**
   * 渲染函数
   * @param createElement - Vue 的 createElement 函数
   * @param context - 函数式组件的渲染上下文
   * @returns 渲染的虚拟节点
   */
  render(
    createElement: typeof import('vue').default.prototype.$createElement,
    context: RenderContext<VListItemActionProps>
  ): VNode;
}

/**
 * VListItemAction 函数式组件
 * 
 * 功能说明：
 * - 为列表项操作区域添加基础样式类 'v-list-item__action'
 * - 当包含多个子元素（非注释且非空白文本）时，自动添加堆叠样式类 'v-list-item__action--stack'
 * - 保留并合并原有的静态类名
 */
declare const VListItemAction: VListItemActionComponent;

export default VListItemAction;