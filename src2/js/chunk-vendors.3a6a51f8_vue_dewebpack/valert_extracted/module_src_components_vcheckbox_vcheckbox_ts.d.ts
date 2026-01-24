/**
 * VCheckbox 组件类型定义
 * 提供复选框功能，支持选中、未选中和不确定三种状态
 */

import Vue, { VNode, VueConstructor } from 'vue';
import { VIcon } from '../VIcon';
import { VInput } from '../VInput';

/**
 * VCheckbox 组件的属性接口
 */
interface VCheckboxProps {
  /**
   * 是否为不确定状态（半选状态）
   * @default false
   */
  indeterminate?: boolean;

  /**
   * 不确定状态的图标名称
   * @default "$checkboxIndeterminate"
   */
  indeterminateIcon?: string;

  /**
   * 未选中状态的图标名称
   * @default "$checkboxOff"
   */
  offIcon?: string;

  /**
   * 选中状态的图标名称
   * @default "$checkboxOn"
   */
  onIcon?: string;
}

/**
 * VCheckbox 组件的数据接口
 */
interface VCheckboxData {
  /**
   * 内部不确定状态
   */
  inputIndeterminate: boolean;
}

/**
 * VCheckbox 组件的计算属性接口
 */
interface VCheckboxComputed {
  /**
   * 组件的CSS类名对象
   */
  classes: Record<string, boolean>;

  /**
   * 根据当前状态计算出的图标名称
   */
  computedIcon: string;

  /**
   * 验证状态：'error' | 'success' | null | 颜色值
   */
  validationState: string | null | undefined;
}

/**
 * VCheckbox 组件的方法接口
 */
interface VCheckboxMethods {
  /**
   * 生成复选框的DOM结构
   * @returns 复选框的VNode节点
   */
  genCheckbox(): VNode;

  /**
   * 生成默认插槽内容
   * @returns VNode节点数组
   */
  genDefaultSlot(): VNode[];
}

/**
 * VCheckbox 组件实例类型
 */
export type VCheckbox = Vue & VCheckboxProps & VCheckboxData & VCheckboxComputed & VCheckboxMethods;

/**
 * VCheckbox 组件构造函数
 */
declare const VCheckbox: VueConstructor<VCheckbox>;

export default VCheckbox;