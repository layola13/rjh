/**
 * AIDA组件模块
 * 提供AI助手入口的React组件
 */

import { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * AIDA组件的Props接口
 */
export interface AidaProps {
  /**
   * 控制AIDA入口的可见性
   * @default true
   */
  visible?: boolean;
}

/**
 * AIDA组件暴露的实例方法
 */
export interface AidaHandle {
  /**
   * 显示AIDA入口
   */
  show(): void;

  /**
   * 隐藏AIDA入口
   */
  hide(): void;
}

/**
 * AIDA组件
 * 
 * 根据租户类型显示不同的AI助手入口图标，点击后打开AIDA插件
 * 
 * @example
 *