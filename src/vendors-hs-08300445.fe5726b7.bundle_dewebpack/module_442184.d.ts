/**
 * 模块：遮罩层组件
 * 用于渲染带动画的遮罩层，支持可见性切换和自定义样式
 */

import type React from 'react';

/**
 * 遮罩层组件的属性接口
 */
export interface MaskProps {
  /**
   * 样式类名前缀
   * @example 'rc-dialog'
   */
  prefixCls: string;

  /**
   * 自定义内联样式
   */
  style?: React.CSSProperties;

  /**
   * 遮罩层是否可见
   */
  visible: boolean;

  /**
   * 传递给遮罩层 div 元素的额外属性
   */
  maskProps?: React.HTMLAttributes<HTMLDivElement>;

  /**
   * 动画类名
   * @example 'fade', 'zoom'
   */
  motionName?: string;
}

/**
 * 动画包装器组件的渲染函数参数
 */
export interface MotionRenderProps {
  /**
   * 动画状态对应的类名
   */
  className?: string;

  /**
   * 动画状态对应的样式
   */
  style?: React.CSSProperties;
}

/**
 * 渲染遮罩层组件
 * 
 * 使用动画包装器实现遮罩层的显示/隐藏过渡效果
 * 
 * @param props - 遮罩层属性
 * @returns React 元素
 * 
 * @example
 *