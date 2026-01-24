/**
 * 钉选按钮组件的类型定义
 * 提供可交互的按钮，支持悬停和激活状态
 */

import React from 'react';

/**
 * 钉选按钮配置选项
 */
export interface PinBoxOptions {
  /** 按钮位置是否在左侧 */
  left?: boolean;
  /** 按钮图标类名或标识 */
  icon: string;
  /** 按钮的DOM ID */
  id: string;
  /** 状态改变时的回调函数 */
  changed: (active: boolean) => void;
}

/**
 * 内部按钮组件的Props
 */
interface BoxButtonProps {
  /** 自定义CSS类名 */
  className?: string;
  /** 图标标识 */
  icon?: string;
  /** 状态改变回调 */
  changed?: (active: boolean) => void;
  /** 元素ID */
  id?: string;
}

/**
 * 内部按钮组件的状态
 */
interface BoxButtonState {
  /** 是否处于悬停状态 */
  hover: boolean;
  /** 是否处于激活状态 */
  active: boolean;
}

/**
 * 钉选按钮管理器
 * 负责创建、更新和销毁钉选按钮组件
 */
export default class PinBoxManager {
  /** 动态创建的容器div */
  private newDiv: HTMLDivElement;
  
  /** React元素 */
  private pinBox: React.ReactElement;
  
  /** 渲染后的组件实例 */
  private instance: React.Component<BoxButtonProps, BoxButtonState>;

  /**
   * 创建钉选按钮管理器
   * @param options - 按钮配置选项
   * @param container - 要挂载的父容器元素
   */
  constructor(options: PinBoxOptions, container: HTMLElement);

  /**
   * 更新按钮状态或配置
   * @param data - 新的配置数据
   */
  update(data: Partial<PinBoxOptions>): void;

  /**
   * 销毁按钮组件并清理DOM
   */
  destroy(): void;

  /**
   * @deprecated 使用 destroy 方法代替
   * 销毁按钮组件（拼写错误的遗留方法）
   */
  destory(): void;

  /**
   * 静态工厂方法，创建新的钉选按钮实例
   * @param options - 按钮配置选项
   * @param container - 要挂载的父容器元素
   * @returns 新的PinBoxManager实例
   */
  static create(options: PinBoxOptions, container: HTMLElement): PinBoxManager;
}