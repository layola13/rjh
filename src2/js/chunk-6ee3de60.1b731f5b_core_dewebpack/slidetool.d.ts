/**
 * 滑动工具模块
 * 用于在视图中添加滑动元素的工具类
 */

import { ToolType } from './ToolType';
import { FenesTool } from './FenesTool';

/**
 * 视图管理器接口
 */
interface IViewManager {
  /** 形状管理器 */
  shapeManager: IShapeManager;
  /** 工具管理器 */
  toolManager: IToolManager;
}

/**
 * 形状管理器接口
 */
interface IShapeManager {
  /**
   * 添加滑动元素
   * @param element - 要添加的元素
   * @param type - 可选的类型标识符
   */
  addSlide(element: unknown, type?: number): void;
}

/**
 * 工具管理器接口
 */
interface IToolManager {
  /**
   * 释放当前激活的工具
   */
  releaseTool(): void;
}

/**
 * 滑动工具类
 * 继承自FenesTool，提供添加滑动元素的功能
 */
export declare class SlideTool extends FenesTool {
  /** 工具名称 */
  name: ToolType;
  
  /** 视图管理器实例 */
  view: IViewManager;

  /**
   * 添加Fenes元素到视图
   * 根据工具类型决定是否使用特定的类型标识符(26)
   * @param element - 要添加的元素
   */
  addFenes(element: unknown): void;
}