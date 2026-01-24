import React from 'react';

/**
 * 创建按钮组件的属性接口
 */
export interface CreateButtonProps {
  /**
   * 是否显示动画状态
   */
  isAnimation: boolean;

  /**
   * 是否为只读模式
   */
  isReadonly: boolean;

  /**
   * 点击创建按钮时的回调函数
   */
  onCreate: () => void;
}

/**
 * 创建按钮组件的状态接口
 */
export interface CreateButtonState {}

/**
 * 相机位置保存创建按钮组件
 * 
 * @description
 * 该组件用于在项目中创建相机位置保存点。
 * 支持动画状态显示和只读模式禁用。
 * 
 * @remarks
 * - 动画模式下显示加载动画图标
 * - 非动画模式显示添加图标
 * - 只读模式下按钮被禁用
 * - 点击时会触发事件追踪
 * 
 * @example
 *