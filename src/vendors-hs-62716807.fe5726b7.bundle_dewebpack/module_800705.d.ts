/**
 * 对齐触发器组件类型声明
 * 提供一个带有可见性控制的对齐触发器，当visible为true时会持续触发对齐更新
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 对齐触发器组件的属性接口
 */
export interface AlignTriggerProps {
  /**
   * 控制触发器是否可见
   * 当为true时，会启动递归的对齐检查
   */
  visible?: boolean;
  
  /**
   * 其他从基础触发器组件继承的属性
   * 这些属性会直接传递给底层的触发器组件
   */
  [key: string]: any;
}

/**
 * 带有ref转发能力的对齐触发器组件
 * 
 * @remarks
 * 此组件会在visible为true时：
 * - 使用raf（requestAnimationFrame）持续触发弹出层对齐
 * - 调用底层Trigger组件的forcePopupAlign方法
 * - 在visible变为false时取消所有待处理的对齐任务
 * 
 * @example
 *