/**
 * CSS 动画/过渡包装组件的类型定义
 * 用于为 React 元素添加进入/离开动画效果
 */

import type { Ref, ReactElement, CSSProperties, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 动画状态枚举
 */
export enum MotionStatus {
  /** 无动画状态 */
  NONE = 'none',
  /** 准备阶段 */
  PREPARE = 'prepare',
  /** 开始阶段 */
  START = 'start',
  /** 激活阶段 */
  ACTIVE = 'active',
  /** 出现动画 */
  APPEAR = 'appear',
  /** 进入动画 */
  ENTER = 'enter',
  /** 离开动画 */
  LEAVE = 'leave'
}

/**
 * 动画步骤类型
 */
export type MotionStep = 'prepare' | 'start' | 'active' | 'end';

/**
 * 动画事件回调函数
 */
export interface MotionEventHandlers {
  /** 动画准备开始时触发 */
  onAppearPrepare?: (element: HTMLElement) => void | Promise<void>;
  /** 动画开始时触发 */
  onAppearStart?: (element: HTMLElement) => void;
  /** 动画激活时触发 */
  onAppearActive?: (element: HTMLElement) => void;
  /** 动画结束时触发 */
  onAppearEnd?: (element: HTMLElement, cancelled: boolean) => void;
  
  /** 进入动画准备开始时触发 */
  onEnterPrepare?: (element: HTMLElement) => void | Promise<void>;
  /** 进入动画开始时触发 */
  onEnterStart?: (element: HTMLElement) => void;
  /** 进入动画激活时触发 */
  onEnterActive?: (element: HTMLElement) => void;
  /** 进入动画结束时触发 */
  onEnterEnd?: (element: HTMLElement, cancelled: boolean) => void;
  
  /** 离开动画准备开始时触发 */
  onLeavePrepare?: (element: HTMLElement) => void | Promise<void>;
  /** 离开动画开始时触发 */
  onLeaveStart?: (element: HTMLElement) => void;
  /** 离开动画激活时触发 */
  onLeaveActive?: (element: HTMLElement) => void;
  /** 离开动画结束时触发 */
  onLeaveEnd?: (element: HTMLElement, cancelled: boolean) => void;
}

/**
 * 子元素渲染函数参数
 */
export interface MotionRenderProps {
  /** 元素是否可见 */
  visible?: boolean;
  /** 动画类名 */
  className?: string;
  /** 动画样式 */
  style?: CSSProperties;
  /** 其他自定义事件属性 */
  [key: string]: unknown;
}

/**
 * CSS Motion 组件属性
 */
export interface CSSMotionProps extends MotionEventHandlers {
  /** 
   * 动画名称前缀，可以是字符串或对象配置
   * 字符串时会自动生成 ${motionName}-appear/enter/leave 类名
   */
  motionName?: string | {
    appear?: string;
    enter?: string;
    leave?: string;
    appearActive?: string;
    enterActive?: string;
    leaveActive?: string;
  };
  
  /** 元素是否可见，控制进入/离开动画 */
  visible?: boolean;
  
  /** 离开后是否移除 DOM 元素，默认 true */
  removeOnLeave?: boolean;
  
  /** 是否强制渲染（即使不可见），默认 false */
  forceRender?: boolean;
  
  /** 离开后应用的类名（当 removeOnLeave 为 false 时） */
  leavedClassName?: string;
  
  /** 
   * 子元素，可以是 ReactElement 或渲染函数
   * 渲染函数会接收到动画属性和 ref
   */
  children?: ReactElement | ((props: MotionRenderProps, ref: Ref<HTMLElement>) => ReactElement);
  
  /** 
   * 传递给子元素的自定义事件属性
   * 会与动画属性合并后传递给 children
   */
  eventProps?: Record<string, unknown>;
  
  /** 
   * 首次挂载时是否触发出现动画
   * 默认根据 visible 自动判断
   */
  motionAppear?: boolean;
  
  /** 
   * 是否触发进入动画
   * 默认根据 visible 变化自动判断
   */
  motionEnter?: boolean;
  
  /** 
   * 是否触发离开动画
   * 默认根据 visible 变化自动判断
   */
  motionLeave?: boolean;
  
  /** 
   * 动画持续时间配置（毫秒）
   * 用于确保动画完整播放
   */
  motionDeadline?: number;
  
  /** 组件的 ref */
  ref?: Ref<HTMLElement>;
}

/**
 * CSS Motion 组件类型
 */
export type CSSMotionComponent = ForwardRefExoticComponent<CSSMotionProps & RefAttributes<HTMLElement>>;

/**
 * 动画配置选项
 */
export interface MotionConfig {
  /** 是否支持 CSS transition */
  transitionSupport?: boolean;
}

/**
 * 生成 CSS Motion 组件的工厂函数
 * @param config - 动画配置，可以是布尔值或配置对象
 * @returns CSS Motion 组件
 * 
 * @example
 *