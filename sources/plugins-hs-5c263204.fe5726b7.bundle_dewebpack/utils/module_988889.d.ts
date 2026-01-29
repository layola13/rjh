/**
 * React组件：城市选择器项
 * 用于展示和选择单个城市的交互组件
 */

import React from 'react';

/**
 * 城市选择器组件的属性接口
 */
export interface CityNameBlockProps {
  /**
   * 城市唯一标识符
   */
  id: string;

  /**
   * 城市显示名称
   */
  name: string;

  /**
   * 点击城市时的回调函数
   * @param event - 鼠标点击事件对象
   */
  clickHandler: (event: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * 城市选择器组件的状态接口
 */
export interface CityNameBlockState {
  /**
   * 标记该城市是否已被选中
   */
  selectedFlag: boolean;
}

/**
 * 城市名称块组件
 * 
 * @remarks
 * 该组件用于在城市选择列表中展示单个城市项，支持点击选择功能。
 * 点击时会：
 * - 关闭地址视图容器
 * - 移除其他城市的选中状态
 * - 标记当前城市为选中状态
 * - 触发父组件传入的点击回调
 * 
 * @example
 *