/**
 * VHover 组件类型定义
 * 提供鼠标悬停状态管理功能
 */

import { VNode } from 'vue';
import { PropType } from 'vue';

/**
 * VHover 组件的作用域插槽参数
 */
export interface VHoverScopedSlotProps {
  /** 当前悬停状态 */
  hover: boolean;
}

/**
 * VHover 组件的 Props 接口
 */
export interface VHoverProps {
  /**
   * 是否禁用悬停效果
   * @default false
   */
  disabled?: boolean;

  /**
   * 控制悬停状态的外部绑定值
   * @default undefined
   */
  value?: boolean;
}

/**
 * VHover 组件实例接口
 */
export interface VHoverInstance {
  /**
   * 鼠标进入事件处理器
   * 触发延迟打开逻辑
   */
  onMouseEnter(): void;

  /**
   * 鼠标离开事件处理器
   * 触发延迟关闭逻辑
   */
  onMouseLeave(): void;

  /**
   * 当前激活状态（从 Toggleable mixin 继承）
   */
  isActive: boolean;

  /**
   * 执行延迟操作（从 Delayable mixin 继承）
   * @param action - 要执行的操作类型
   */
  runDelay(action: 'open' | 'close'): void;

  /**
   * 作用域插槽
   */
  $scopedSlots: {
    default?: (props: VHoverScopedSlotProps) => VNode | VNode[];
  };
}

/**
 * VHover 组件
 * 用于跟踪鼠标悬停状态并通过作用域插槽传递给子组件
 * 
 * @example
 *