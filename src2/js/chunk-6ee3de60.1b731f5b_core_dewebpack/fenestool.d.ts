import { DragDrawTool } from './DragDrawTool';
import { Utils } from './Utils';

/**
 * 门窗工具类
 * 用于在图形视图中添加门窗元素的交互工具
 * 继承自 DragDrawTool，提供拖拽绘制门窗的功能
 */
export declare class FenesTool extends DragDrawTool {
  /**
   * 构造函数
   */
  constructor();

  /**
   * 添加门窗到指定位置
   * @param centroid - 门窗的中心点坐标
   */
  addFenes(centroid: unknown): void;

  /**
   * 完成拖拽操作的回调
   * 检测拖拽区域与可用多边形的交集，如果有交集则在多边形中心添加门窗
   * @param draggedShape - 拖拽生成的图形对象，包含多边形数据
   */
  finishDrag(draggedShape: { polygon: Polygon }): void;
}

/**
 * 多边形接口
 * 提供多边形的几何运算方法
 */
interface Polygon {
  /**
   * 计算与另一个多边形的交集
   * @param other - 另一个多边形对象
   * @returns 交集点数组
   */
  intersect(other: Polygon): unknown[];

  /**
   * 判断是否完全包含另一个多边形
   * @param other - 另一个多边形对象
   * @returns 如果包含返回 true，否则返回 false
   */
  contains(other: Polygon): boolean;
}

/**
 * 可用多边形区域接口
 * 表示可以放置门窗的多边形区域
 */
interface AvailablePolygon {
  /** 多边形几何数据 */
  polygon: Polygon;
}

/**
 * 图形对象接口
 * 包含可用的多边形区域集合
 */
interface Shape {
  /** 可用的多边形区域列表 */
  avaiablePoly: AvailablePolygon[];
}

/**
 * 图形管理器接口
 * 管理所有图形对象
 */
interface ShapeManager {
  /** 图形对象集合 */
  shapem: Shape[];
}

/**
 * 工具管理器接口
 * 管理工具的激活和释放
 */
interface ToolManager {
  /**
   * 释放当前激活的工具
   */
  releaseTool(): void;
}

/**
 * 视图接口
 * 包含图形管理器和工具管理器
 */
interface View {
  /** 图形管理器实例 */
  shapeManager: ShapeManager;
  
  /** 工具管理器实例 */
  toolManager: ToolManager;
}