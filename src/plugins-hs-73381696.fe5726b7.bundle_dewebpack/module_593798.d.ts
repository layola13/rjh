/**
 * LayerListContainer Component Module
 * 
 * 提供一个可拖拽排序的图层列表容器组件，支持图层的重命名、删除、重新排列等操作
 * 主要用于图形编辑器或设计工具中的图层管理功能
 */

import React from 'react';

/**
 * 图层对象接口
 * 表示单个图层的数据结构
 */
export interface Layer {
  /** 图层唯一标识符 */
  id: string;
  /** 其他图层属性 */
  [key: string]: unknown;
}

/**
 * 图层列表项接口
 * 表示图层列表中每一项的完整数据结构
 */
export interface LayerItem {
  /** 图层实例 */
  layer: Layer;
  /** 图层名称 */
  name?: string;
  /** 显示的文本（如楼层编号） */
  text?: string;
  /** 图层索引位置 */
  index: number;
  /** 图层激活状态 */
  status: boolean;
}

/**
 * 图层位置关系接口
 * 用于描述图层重新排列时的相邻图层关系
 */
export interface LayerNeighbors {
  /** 上一个（前一个）图层 */
  prev?: Layer;
  /** 下一个（后一个）图层 */
  next?: Layer;
}

/**
 * 图层列表容器组件的属性接口
 */
export interface LayerListContainerProps {
  /** 图层项数组 */
  items: LayerItem[];
  
  /** 当前激活的图层 */
  activeLayer: Layer;
  
  /** 组件是否可见 */
  isVisible: boolean;
  
  /** 是否为只读模式 */
  isReadOnlyMode?: boolean;
  
  /** 是否为深色模式 */
  isDarkMode?: boolean;
  
  /** 是否为编辑模式 */
  isEditMode?: boolean;
  
  /**
   * 重命名图层回调函数
   * @param layer - 要重命名的图层
   * @param newName - 新的图层名称
   */
  renameLayer: (layer: Layer, newName: string) => void;
  
  /**
   * 删除图层回调函数
   * @param layer - 要删除的图层
   */
  removeLayer: (layer: Layer) => void;
  
  /**
   * 重新设置图层索引（排序）回调函数
   * @param layer - 要移动的图层
   * @param neighbors - 移动后的相邻图层信息
   */
  resetLayerIndex: (layer: Layer, neighbors: LayerNeighbors) => void;
  
  /**
   * 选择图层回调函数
   * @param layer - 要选择的图层
   */
  chooseLayer: (layer: Layer) => void;
}

/**
 * 可拖拽配置选项接口
 * 定义拖拽行为的配置参数
 */
export interface DraggableOptions {
  /** 滚动速度（像素/秒） */
  scrollSpeed: number;
  
  /** 可拖拽节点的CSS选择器 */
  nodeSelector: string;
  
  /** 拖拽手柄的CSS选择器 */
  handleSelector: string;
  
  /** 是否启用滚动功能 */
  enableScroll: boolean;
  
  /**
   * 拖拽结束回调函数
   * @param fromIndex - 起始索引位置
   * @param toIndex - 目标索引位置
   */
  onDragEnd?: (fromIndex: number, toIndex: number) => void;
}

/**
 * 图层列表容器组件
 * 
 * 一个功能完整的可拖拽图层列表组件，提供以下特性：
 * - 图层的拖拽排序
 * - 图层的增删改操作
 * - 自动滚动到激活图层
 * - 深色模式支持
 * - 只读模式支持
 * 
 * @example
 *