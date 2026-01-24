/**
 * Steps 步骤条组件类型定义
 * 用于引导用户按照流程完成任务的导航组件
 */

import { ReactNode, CSSProperties } from 'react';

/**
 * 步骤条方向类型
 */
export type StepDirection = 'horizontal' | 'vertical';

/**
 * 步骤状态类型
 */
export type StepStatus = 'wait' | 'process' | 'finish' | 'error';

/**
 * 步骤条尺寸类型
 */
export type StepSize = 'default' | 'small';

/**
 * 单个步骤的配置接口
 */
export interface StepProps {
  /** 步骤标题 */
  title?: ReactNode;
  /** 步骤描述 */
  description?: ReactNode;
  /** 步骤图标 */
  icon?: ReactNode;
  /** 步骤状态 */
  status?: StepStatus;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

/**
 * 步骤图标渲染参数
 */
export interface StepIconRenderParams {
  /** 当前步骤索引 */
  index: number;
  /** 当前步骤状态 */
  status: StepStatus;
  /** 默认图标节点 */
  node: ReactNode;
}

/**
 * 步骤条组件属性接口
 */
export interface StepsProps {
  /** 当前步骤索引，从 0 开始 */
  current?: number;
  /** 进度百分比（0-100），用于显示进度圈 */
  percent?: number;
  /** 步骤条尺寸 */
  size?: StepSize;
  /** 自定义类名 */
  className?: string;
  /** 步骤条方向 */
  direction?: StepDirection;
  /** 是否响应式布局（小屏自动变为垂直） */
  responsive?: boolean;
  /** 自定义前缀 */
  prefixCls?: string;
  /** 图标前缀 */
  iconPrefix?: string;
  /** 自定义步骤图标渲染函数 */
  stepIcon?: (params: StepIconRenderParams) => ReactNode;
  /** 初始步骤索引 */
  initial?: number;
  /** 步骤条状态 */
  status?: StepStatus;
  /** 标签放置位置 */
  labelPlacement?: 'horizontal' | 'vertical';
  /** 自定义样式 */
  style?: CSSProperties;
  /** 点击步骤时的回调 */
  onChange?: (current: number) => void;
}

/**
 * 步骤条组件
 * 
 * @example
 *