/**
 * VCounter 组件类型定义
 * 一个功能性的计数器组件，用于显示字符计数和最大限制
 */

import Vue, { VNode, CreateElement, RenderContext } from 'vue';

/**
 * VCounter 组件的属性接口
 */
export interface VCounterProps {
  /**
   * 当前计数值
   * @default ""
   */
  value: number | string;

  /**
   * 最大计数限制（可选）
   * 当提供时，将显示为 "value / max" 格式
   */
  max?: number | string;
}

/**
 * VCounter 组件实例类型
 * 这是一个功能性组件，用于显示计数器
 */
export interface VCounter extends Vue {
  /** 组件名称 */
  readonly name: 'v-counter';
  
  /** 标记为功能性组件 */
  readonly functional: true;
  
  /** 组件属性 */
  readonly props: VCounterProps;
}

/**
 * VCounter 组件定义
 * 功能性组件，显示当前值和可选的最大值限制
 * 当超过最大值时会应用错误样式
 */
declare const VCounter: {
  /** 组件名称 */
  name: 'v-counter';
  
  /** 功能性组件标志 */
  functional: true;
  
  /** 组件属性定义 */
  props: {
    value: {
      type: [NumberConstructor, StringConstructor];
      default: '';
    };
    max: [NumberConstructor, StringConstructor];
  };
  
  /**
   * 渲染函数
   * @param h - Vue 的 createElement 函数
   * @param context - 功能性组件的渲染上下文
   * @returns 渲染的虚拟节点
   */
  render(
    h: CreateElement,
    context: RenderContext<VCounterProps>
  ): VNode;
};

export default VCounter;