/**
 * 历史版本空状态组件类型定义
 * Module: module_347696
 * Original ID: 347696
 */

import React from 'react';

/**
 * 资源管理器接口
 * 用于获取国际化字符串资源
 */
declare global {
  const ResourceManager: {
    /**
     * 根据键名获取本地化字符串
     * @param key - 资源键名
     * @returns 本地化后的字符串
     */
    getString(key: string): string;
  };
}

/**
 * 历史版本空状态视图组件属性
 */
export interface NoListViewProps {}

/**
 * 历史版本空状态视图组件状态
 */
export interface NoListViewState {}

/**
 * 历史版本空状态视图组件
 * 
 * 当没有历史版本数据时显示的空状态组件，
 * 包含一个图片和提示文本
 * 
 * @example
 *