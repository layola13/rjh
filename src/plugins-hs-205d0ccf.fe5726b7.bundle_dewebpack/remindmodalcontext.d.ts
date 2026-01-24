import { Context } from 'react';
import { AwakeTypeEnum } from './AwakeTypeEnum';
import { ImageModal } from './ImageModal';
import { CardTips } from './CardTips';
import { BallonTips } from './BallonTips';

/**
 * 目标矩形区域
 */
export interface TargetRect {
  top: number;
  left: number;
  width: number;
  height: number;
  bottom?: number;
  right?: number;
}

/**
 * 主题配置
 */
export interface Theme {
  primaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  [key: string]: unknown;
}

/**
 * 关闭回调参数
 */
export interface CloseCallbackParams {
  /** 主题配置 */
  theme?: Theme;
  /** 目标元素矩形区域 */
  targetRect?: TargetRect;
}

/**
 * 提醒模态框内容配置项
 */
export interface RemindContentConfig {
  /** 配置名称 */
  name: string;
  /** 渲染组件 */
  Component: React.ComponentType<any>;
  /** 关闭回调 */
  closed?: (params: CloseCallbackParams) => void;
  /** 不再提醒回调 */
  noRemind?: (params: CloseCallbackParams) => void;
  /** 箭头样式类名 */
  arrowClassName?: string;
  /** 箭头大小（像素） */
  arrowSize?: number;
  /** 过渡动画时长（毫秒） */
  transitionDuration?: number;
  /** 层级（z-index） */
  zIndex?: number;
  /** 是否检查教程状态 */
  checkTeaching?: boolean;
}

/**
 * 提醒模态框内容配置映射
 * 根据唤醒类型映射对应的模态框配置
 */
export const contentConfig: Record<AwakeTypeEnum, RemindContentConfig>;

/**
 * 提醒模态框上下文数据
 */
export interface RemindModalContextValue {
  /** 当前激活的唤醒类型 */
  activeAwakeType?: AwakeTypeEnum;
  /** 显示提醒模态框 */
  show?: (awakeType: AwakeTypeEnum, options?: any) => void;
  /** 隐藏提醒模态框 */
  hide?: () => void;
  /** 是否可见 */
  visible?: boolean;
  /** 额外数据 */
  [key: string]: unknown;
}

/**
 * 提醒模态框 React Context
 * 用于在组件树中共享提醒模态框状态和操作方法
 */
export const RemindModalContext: Context<RemindModalContextValue>;

/**
 * 使用提醒模态框上下文的 Hook
 * @returns 提醒模态框上下文值
 * @example
 * const { show, hide, visible } = useRemindModalContext();
 * show(AwakeTypeEnum.ImageModal, { imageUrl: 'xxx' });
 */
export function useRemindModalContext(): RemindModalContextValue;

/**
 * 唤醒类型枚举（re-export）
 */
export { AwakeTypeEnum } from './AwakeTypeEnum';