/**
 * EntitySelector - 实体选择器模块
 * 
 * 提供基于画布的实体选择功能，支持悬停高亮、Shift多选等交互
 */

import { EventEmitter } from './EventEmitter';

/**
 * 选择器模式枚举
 */
export enum SelectorMode {
  /** 默认模式 */
  DEFAULT = 0
}

/**
 * 画布接口 - 提供实体渲染和交互能力
 */
export interface ICanvas extends HTMLCanvasElement {
  /**
   * 获取指定坐标处的实体ID
   * @param pageX - 页面X坐标
   * @param pageY - 页面Y坐标
   * @returns 包含实体ID信息的对象
   */
  getIds(pageX: number, pageY: number): { instanceid?: string } | undefined;

  /**
   * 高亮显示指定实体
   * @param hoverIds - 悬停的实体ID数组
   * @param selectIds - 选中的实体ID数组
   */
  highlight(hoverIds: string[], selectIds: string[]): void;

  /**
   * 释放WebGL上下文资源
   */
  loseContext?(): void;
}

/**
 * 选择器内部状态
 */
export interface ISelectorState {
  /** 选择器模式 */
  mode: SelectorMode;
  /** 当前悬停操作ID（用于异步操作去重） */
  currentHoverOptId?: string;
  /** 悬停中的实体ID列表 */
  hoverIds: string[];
  /** 已选中的实体ID列表 */
  selectIds: string[];
}

/**
 * 加载配置选项
 */
export interface ILoadOptions {
  /** 图片URL */
  imageUrl: string;
  /** 是否为全景图 */
  isPano: boolean;
  /** 图片宽度 */
  width: number;
  /** 图片高度 */
  height: number;
}

/**
 * 高亮颜色配置
 */
export interface IHighlightColor {
  /** 红色通道 (0-255) */
  r: number;
  /** 绿色通道 (0-255) */
  g: number;
  /** 蓝色通道 (0-255) */
  b: number;
  /** 透明度 (0-255) */
  a: number;
  /** Gizmo类型 */
  gizmoType: 'face' | 'edge' | 'vertex';
}

/**
 * EntitySelector事件映射
 */
export interface IEntitySelectorEvents {
  /** 鼠标进入画布区域 */
  'enter': () => void;
  /** 鼠标离开画布区域 */
  'leave': () => void;
  /** 鼠标悬停在实体上 */
  'hover': (
    event: MouseEvent,
    operationId: string,
    instanceId: string | undefined,
    currentSelectIds: string[] | undefined
  ) => void;
  /** 创建选择 */
  'create': (selectIds: string[]) => void;
  /** 加载开始 */
  'load-start': () => void;
  /** 加载结束 */
  'load-end': (error?: Error) => void;
}

/**
 * 实体选择器类
 * 
 * 继承自EventEmitter，提供交互式实体选择功能
 * 
 * @example
 *