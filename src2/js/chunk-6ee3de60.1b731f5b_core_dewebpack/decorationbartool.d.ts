/**
 * 装饰条工具模块
 * 用于在图形的可用多边形区域上拖拽创建装饰条
 */

import { DragDrawTool } from './DragDrawTool';
import { DecorationBarCreator, DecorationShape } from './DecorationBar';

/**
 * 装饰条绘制工具
 * 继承自拖拽绘制工具，用于在图形的有效多边形区域内创建装饰条
 */
export declare class DecorationBarTool extends DragDrawTool {
  /**
   * 是否应该释放工具
   * @returns 始终返回 false，表示工具在拖拽完成后不会自动释放
   */
  get shouldRelease(): boolean;

  /**
   * 完成拖拽操作
   * 检查拖拽区域是否与现有图形的可用多边形相交或被包含，
   * 如果满足条件则创建装饰条，否则释放工具
   * 
   * @param draggedShape - 拖拽产生的图形对象
   * @param draggedShape.polygon - 拖拽区域的多边形
   * @param draggedShape.box - 拖拽区域的边界框
   * @param draggedShape.box.center - 边界框的中心点
   */
  finishDrag(draggedShape: {
    polygon: Polygon;
    box: {
      center: Point;
    };
  }): void;
}

/**
 * 多边形接口
 * 表示二维平面上的多边形区域
 */
interface Polygon {
  /**
   * 计算与另一个多边形的相交区域
   * @param other - 另一个多边形
   * @returns 相交区域的点集合
   */
  intersect(other: Polygon): Point[];

  /**
   * 判断是否完全包含另一个多边形
   * @param other - 另一个多边形
   * @returns 如果包含返回 true，否则返回 false
   */
  contains(other: Polygon): boolean;
}

/**
 * 点接口
 * 表示二维平面上的坐标点
 */
interface Point {
  x: number;
  y: number;
}

/**
 * 可用多边形接口
 * 表示图形上可以放置装饰条的区域
 */
interface AvailablePolygon {
  /** 可用区域的多边形 */
  polygon: Polygon;
}

/**
 * 图形接口
 * 表示视图中的图形对象
 */
interface Shape {
  /** 图形上所有可用的多边形区域列表 */
  avaiablePoly: AvailablePolygon[];
}

/**
 * 图形管理器接口
 */
interface ShapeManager {
  /** 所有图形的集合 */
  shapem: Shape[];
  
  /**
   * 添加装饰条到指定位置
   * @param center - 装饰条的中心位置
   * @param decoration - 装饰条图形对象
   */
  addDecorationBar(center: Point, decoration: DecorationShape): void;
}

/**
 * 工具管理器接口
 */
interface ToolManager {
  /**
   * 释放当前工具
   */
  releaseTool(): void;
}

/**
 * 视图接口
 */
interface View {
  /** 图形管理器 */
  shapeManager: ShapeManager;
  
  /** 工具管理器 */
  toolManager: ToolManager;
}