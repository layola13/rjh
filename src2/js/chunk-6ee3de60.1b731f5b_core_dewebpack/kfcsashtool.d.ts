/**
 * KfcSashTool - KFC窗扇工具类
 * 
 * 用于管理和添加KFC窗扇形状到视图的工具类
 * 继承自FenesTool基类，专门处理KFC窗扇的创建和管理
 */

import { FenesTool } from './FenesTool';
import { ShapeType } from './ShapeType';

/**
 * KFC窗扇工具类
 * @extends FenesTool
 */
export declare class KfcSashTool extends FenesTool {
  /**
   * 构造函数
   * 创建KfcSashTool实例
   */
  constructor();

  /**
   * 添加KFC窗扇到视图
   * @param element - 要添加的窗扇元素数据
   * @description 将指定的窗扇元素以KfcSash类型添加到视图的形状管理器中
   */
  addFenes(element: unknown): void;
}

/**
 * 形状管理器接口
 * 定义了添加KFC窗扇的方法
 */
export interface ShapeManager {
  /**
   * 添加KFC窗扇到形状管理器
   * @param element - 窗扇元素
   * @param shapeType - 形状类型（应为ShapeType.KfcSash）
   */
  addKfcSash(element: unknown, shapeType: ShapeType): void;
}

/**
 * 视图接口
 * 包含形状管理器
 */
export interface View {
  /**
   * 形状管理器实例
   */
  shapeManager: ShapeManager;
}