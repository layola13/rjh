/**
 * 复合线条绘制工具
 * 用于在视图中创建和添加复合线条（mullion）的拖拽绘制工具
 */

import { Vector, Point } from './vector-types';
import { DragDrawTool } from './drag-draw-tool';
import { CompoundLineCreator } from './compound-line-creator';

/**
 * 形状管理器接口
 * 负责管理视图中的形状元素
 */
interface ShapeManager {
  /**
   * 添加复合线条（mullion）到形状管理器
   * @param mullion - 要添加的复合线条对象
   */
  addMullion(mullion: unknown): void;
}

/**
 * 视图接口
 * 表示绘制工具操作的视图上下文
 */
interface View {
  /** 形状管理器实例 */
  shapeManager: ShapeManager;
}

/**
 * 复合线条对象接口
 * 表示可以在视图中平移的复合线条
 */
interface CompoundLine {
  /** 线条的起始点 */
  pt: Point;
  
  /**
   * 平移线条到新位置
   * @param vector - 平移向量
   */
  translate(vector: Vector): void;
}

/**
 * 复合线条绘制工具类
 * 继承自DragDrawTool，用于通过拖拽操作创建复合线条
 * 
 * @example
 *