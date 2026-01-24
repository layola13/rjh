/**
 * Vue 渲染函数类型定义
 * 用于产品管理按钮的视图渲染
 */

import type { CreateElement, VNode } from 'vue';
import type { Vue } from 'vue/types/vue';

/**
 * 事件总线 Payload 接口
 */
interface BeforeLeaveEventPayload {
  /** 离开类型 */
  type: 'product' | string;
}

/**
 * Vue 实例扩展接口
 * 包含事件总线和国际化方法
 */
interface VueInstanceWithBus extends Vue {
  /** 全局事件总线 */
  bus: {
    $emit(event: 'before-leave', payload: BeforeLeaveEventPayload): void;
    $emit(event: string, ...args: unknown[]): void;
  };
}

/**
 * Vue 渲染函数
 * 渲染一个包含产品管理按钮的居中容器
 * 
 * @param this - Vue 组件实例上下文
 * @param createElement - Vue 的 createElement 函数
 * @returns 虚拟 DOM 节点
 */
declare function renderProductManagementButton(
  this: VueInstanceWithBus,
  createElement: CreateElement
): VNode;

export default renderProductManagementButton;