/**
 * 模型搭配查看按钮组件
 * 用于在目录中展示和触发模型搭配查看功能
 */

import React from 'react';
import { Button } from './Button';

/**
 * 组件的属性接口
 */
export interface WatchModelCollocationButtonProps {
  /**
   * 按钮关联的数据对象
   */
  data: unknown;
  
  /**
   * 点击按钮时的回调函数
   * @param data - 传递给回调的数据对象
   */
  onClick: (data: unknown) => void;
}

/**
 * 模型搭配查看按钮组件
 * 
 * 该组件渲染一个按钮，点击时会触发父组件传入的onClick回调，
 * 并传递当前组件的data属性。按钮文本从资源管理器获取。
 * 
 * @example
 *