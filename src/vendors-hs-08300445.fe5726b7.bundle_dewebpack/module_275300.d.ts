/**
 * CSSMotion 列表组件类型定义
 * 用于处理多个子元素的进入/离开动画效果
 */

import * as React from 'react';

/**
 * 动画状态枚举
 */
export enum STATUS {
  /** 添加状态 */
  STATUS_ADD = 'add',
  /** 保持状态 */
  STATUS_KEEP = 'keep',
  /** 移除中状态 */
  STATUS_REMOVE = 'remove',
  /** 已移除状态 */
  STATUS_REMOVED = 'removed'
}

/**
 * 键实体对象，表示列表中每个动画项的状态
 */
export interface KeyEntity {
  /** 唯一标识键 */
  key: React.Key;
  /** 当前动画状态 */
  status: STATUS;
  /** 其他事件属性 */
  [key: string]: any;
}

/**
 * 动画生命周期回调函数类型
 */
export type MotionPrepareCallback = (element: HTMLElement) => Promise<void> | void;
export type MotionCallback = (element: HTMLElement, event: Event) => void | boolean;

/**
 * 可见性变化回调参数
 */
export interface VisibleChangedContext {
  /** 触发变化的键 */
  key: React.Key;
}

/**
 * 子元素渲染函数参数
 */
export interface ChildrenRenderProps {
  /** 键实体属性 */
  key: React.Key;
  /** 当前索引 */
  index: number;
  /** 其他事件属性 */
  [key: string]: any;
}

/**
 * 子元素渲染函数类型
 */
export type ChildrenRenderFunction = (
  props: ChildrenRenderProps,
  ref: React.Ref<any>
) => React.ReactElement;

/**
 * CSSMotionList 组件属性接口
 */
export interface CSSMotionListProps {
  /** 容器组件类型，默认为 'div' */
  component?: string | React.ComponentType<any> | false;
  
  /** 要进行动画的键数组 */
  keys: React.Key[];
  
  /** 子元素渲染函数 */
  children: ChildrenRenderFunction;
  
  /** 动画类名前缀 */
  motionName?: string;
  
  /** 是否在首次挂载时执行动画 */
  motionAppear?: boolean;
  
  /** 是否在元素进入时执行动画 */
  motionEnter?: boolean;
  
  /** 是否在元素离开时执行动画 */
  motionLeave?: boolean;
  
  /** 是否立即执行离开动画 */
  motionLeaveImmediately?: boolean;
  
  /** 动画超时时间（毫秒） */
  motionDeadline?: number;
  
  /** 离开动画完成后是否移除元素 */
  removeOnLeave?: boolean;
  
  /** 元素离开后添加的类名 */
  leavedClassName?: string;
  
  /** appear 阶段准备回调 */
  onAppearPrepare?: MotionPrepareCallback;
  
  /** appear 阶段开始回调 */
  onAppearStart?: MotionCallback;
  
  /** appear 阶段激活回调 */
  onAppearActive?: MotionCallback;
  
  /** appear 阶段结束回调 */
  onAppearEnd?: MotionCallback;
  
  /** enter 阶段开始回调 */
  onEnterStart?: MotionCallback;
  
  /** enter 阶段激活回调 */
  onEnterActive?: MotionCallback;
  
  /** enter 阶段结束回调 */
  onEnterEnd?: MotionCallback;
  
  /** leave 阶段开始回调 */
  onLeaveStart?: MotionCallback;
  
  /** leave 阶段激活回调 */
  onLeaveActive?: MotionCallback;
  
  /** leave 阶段结束回调 */
  onLeaveEnd?: MotionCallback;
  
  /** 可见性变化回调 */
  onVisibleChanged?: (visible: boolean, context: VisibleChangedContext) => void;
  
  /** 所有元素移除完成回调 */
  onAllRemoved?: () => void;
  
  /** 其他HTML属性 */
  [key: string]: any;
}

/**
 * CSSMotionList 组件状态接口
 */
export interface CSSMotionListState {
  /** 键实体数组 */
  keyEntities: KeyEntity[];
}

/**
 * 解析键数组为键实体数组
 * @param keys - React 键数组
 * @returns 键实体数组
 */
export function parseKeys(keys: React.Key[]): KeyEntity[];

/**
 * 对比新旧键实体数组，计算差异
 * @param prevEntities - 之前的键实体数组
 * @param currentEntities - 当前的键实体数组
 * @returns 合并后的键实体数组
 */
export function diffKeys(
  prevEntities: KeyEntity[],
  currentEntities: KeyEntity[]
): KeyEntity[];

/**
 * 生成 CSSMotionList 组件的工厂函数
 * @param supportTransition - 是否支持过渡动画
 * @param CSSMotionComponent - 单个元素动画组件
 * @returns CSSMotionList 组件类
 */
export function genCSSMotionList(
  supportTransition?: boolean,
  CSSMotionComponent?: React.ComponentType<any>
): React.ComponentClass<CSSMotionListProps, CSSMotionListState>;

/**
 * 默认导出的 CSSMotionList 组件
 */
declare const CSSMotionList: React.ComponentClass<
  CSSMotionListProps,
  CSSMotionListState
>;

export default CSSMotionList;