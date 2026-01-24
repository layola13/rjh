/**
 * VCounter 组件类型定义
 * 一个功能性计数器组件，用于显示当前值和可选的最大值
 */

import { VNode, CreateElement, RenderContext } from 'vue';
import { Themeable } from '../../mixins/themeable';

/**
 * VCounter 组件的属性接口
 */
export interface VCounterProps {
  /**
   * 当前计数值
   * @default ""
   */
  value?: number | string;

  /**
   * 最大计数值（可选）
   * 当设置时，将显示为 "value / max" 格式
   * 当 value 超过 max 时，会应用错误样式
   */
  max?: number | string;
}

/**
 * VCounter 组件实例接口
 * 继承 Themeable mixin 提供主题支持
 */
export interface VCounter extends Themeable {
  /** 组件名称 */
  readonly name: 'v-counter';

  /** 标记为函数式组件 */
  readonly functional: true;

  /** 组件属性定义 */
  readonly props: VCounterProps;

  /**
   * 渲染函数
   * @param createElement - Vue 的 createElement 函数
   * @param context - 函数式组件的渲染上下文
   * @returns 渲染的虚拟节点
   */
  render(createElement: CreateElement, context: RenderContext<VCounterProps>): VNode;
}

/**
 * VCounter 组件默认导出
 * 一个功能性组件，显示计数器，支持以下特性：
 * - 显示单个值或 "当前值 / 最大值" 格式
 * - 当超过最大值时自动应用错误样式
 * - 支持主题定制
 */
declare const VCounter: VCounter;

export default VCounter;