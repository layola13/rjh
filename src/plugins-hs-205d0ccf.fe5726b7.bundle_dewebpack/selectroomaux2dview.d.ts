/**
 * SelectRoomAux2DView 模块类型定义
 * 用于房间选择辅助2D视图组件
 */

import { RefObject } from 'react';

/**
 * 房间选择处理器接口
 * 负责管理2D视图容器的生命周期和交互
 */
export interface SelectRoomHandler {
  /**
   * 设置选择房间辅助2D视图的容器元素
   * @param container - DOM容器元素，可为null
   */
  setSelectRoomAux2DContainer(container: HTMLElement | null): void;

  /**
   * 销毁选择房间辅助2D视图
   * 清理资源和事件监听器
   */
  destroySelectRoomAux2DView(): void;

  /**
   * 调整选择房间辅助2D视图的尺寸
   * 通常在容器尺寸变化时调用
   */
  resizeSelectRoomAux2DView(): void;
}

/**
 * SelectRoomAux2DView 组件的属性接口
 */
export interface SelectRoomAux2DViewProps {
  /**
   * 房间选择处理器实例
   * 用于控制2D视图的渲染和交互
   */
  handler: SelectRoomHandler;
}

/**
 * 选择房间辅助2D视图组件
 * 
 * 功能：
 * - 提供一个可调整大小的2D视图容器
 * - 自动监听容器尺寸变化并调整视图
 * - 在组件卸载时自动清理资源
 * 
 * @param props - 组件属性
 * @returns React函数组件
 * 
 * @example
 *