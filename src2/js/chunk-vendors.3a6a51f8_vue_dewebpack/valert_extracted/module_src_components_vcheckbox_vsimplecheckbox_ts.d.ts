/**
 * VSimpleCheckbox - 一个简单的复选框组件
 * 这是一个函数式组件，用于渲染基础的复选框UI元素
 */

import { VNode, VNodeData, CreateElement, FunctionalComponentOptions } from 'vue';
import { VIcon } from '../VIcon';
import Colorable from '../../mixins/colorable';
import Themeable from '../../mixins/themeable';

/**
 * VSimpleCheckbox 组件的 props 接口
 */
interface VSimpleCheckboxProps {
  /** 是否禁用复选框 */
  disabled?: boolean;
  
  /** 是否启用涟漪效果，默认为 true */
  ripple?: boolean;
  
  /** 复选框的选中状态 */
  value?: boolean;
  
  /** 是否处于不确定状态（半选状态） */
  indeterminate?: boolean;
  
  /** 不确定状态的图标，默认为 "$checkboxIndeterminate" */
  indeterminateIcon?: string;
  
  /** 选中状态的图标，默认为 "$checkboxOn" */
  onIcon?: string;
  
  /** 未选中状态的图标，默认为 "$checkboxOff" */
  offIcon?: string;
  
  /** 颜色主题（继承自 Colorable） */
  color?: string;
  
  /** 深色主题（继承自 Themeable） */
  dark?: boolean;
  
  /** 浅色主题（继承自 Themeable） */
  light?: boolean;
}

/**
 * 函数式组件上下文接口
 */
interface FunctionalContext {
  /** 组件 props */
  props: VSimpleCheckboxProps;
  
  /** VNode 数据对象 */
  data: VNodeData;
  
  /** 事件监听器 */
  listeners: Record<string, Function | Function[]>;
}

/**
 * 涟漪指令值类型
 */
interface RippleDirectiveValue {
  /** 是否从中心扩散 */
  center: boolean;
}

/**
 * VSimpleCheckbox 函数式组件定义
 */
declare const VSimpleCheckbox: FunctionalComponentOptions<VSimpleCheckboxProps>;

export default VSimpleCheckbox;

/**
 * 组件渲染函数
 * @param createElement - Vue 的 createElement 函数
 * @param context - 函数式组件上下文
 * @returns 渲染的 VNode
 */
export function render(
  createElement: CreateElement,
  context: FunctionalContext
): VNode;

/**
 * CSS 类名映射接口
 */
interface VSimpleCheckboxClasses {
  'v-simple-checkbox': boolean;
  'v-simple-checkbox--disabled': boolean;
}

/**
 * 输入事件回调类型
 */
type InputCallback = (value: boolean) => void;