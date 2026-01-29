/**
 * 开口尺寸标注模块
 * 提供墙体开口（门窗等）的三维尺寸标注功能
 */

import type { Vector3, Line3 } from 'GeometryLib';
import type { LinearDimensionType } from 'HSApp/View/T3d';
import type { Opening, Wall } from 'HSCore/Model';
import type { ContentDimensionController } from './ContentDimensionController';

/**
 * 碰撞类型
 */
type CollisionType = 'wall' | 'opening';

/**
 * 碰撞检测结果
 */
interface CollisionResult {
  /** 交点坐标 */
  intersect: Vector3;
  /** 第一条线的参数（0-1之间） */
  param1: number;
  /** 碰撞线段 */
  line: Line3;
  /** 第二条线的参数（0-1之间） */
  param2: number;
  /** 碰撞对象类型 */
  type: CollisionType;
  /** 碰撞的内容对象（可选） */
  content?: Opening;
}

/**
 * 线性尺寸标注数据
 */
interface LinearDimensionData {
  /** 标注起点 */
  start?: Vector3;
  /** 标注终点 */
  end?: Vector3;
  /** 碰撞交点 */
  intersect?: Vector3;
  /** 碰撞线段 */
  line?: Line3;
  /** 线段参数 */
  param2?: number;
  /** 碰撞类型 */
  collisionType?: CollisionType;
  /** 碰撞内容对象 */
  content?: Opening;
}

/**
 * 二维坐标点
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * 开口尺寸标注控制器
 * 负责计算和管理墙体开口（门、窗等）的三维尺寸标注
 * 
 * @extends ContentDimensionController
 */
export declare class OpeningDimension extends ContentDimensionController {
  /**
   * 构造函数
   * @param content - 开口内容对象
   * @param layer - 图层对象
   * @param scene - 场景对象
   */
  constructor(content: Opening, layer: unknown, scene: unknown);

  /**
   * 获取房间高度
   * @returns 开口所在墙体的3D高度
   * @protected
   */
  protected _getRoomHeight(): number;

  /**
   * 获取与结构的碰撞点
   * 检测给定线段与场景中所有结构面（墙面）的交点
   * 
   * @param line - 待检测的三维线段
   * @returns 最近的碰撞结果，如果没有碰撞则返回 undefined
   */
  getCollisionPointToStructure(line: Line3): CollisionResult | undefined;

  /**
   * 遍历所有碰撞内容对象
   * 对于墙体上的开口，遍历同一墙体上的所有其他开口
   * 
   * @param callback - 对每个碰撞内容执行的回调函数
   */
  forEachCollisionContent(callback: (content: Opening) => void): void;

  /**
   * 根据类型获取线性尺寸标注数据
   * 计算顶部、底部、左侧或右侧方向的尺寸标注信息
   * 
   * @param dimensionType - 尺寸标注类型（top/bottom/left/right）
   * @returns 包含起点、终点和碰撞信息的标注数据
   */
  getLinearDimensionDataByType(dimensionType: LinearDimensionType): LinearDimensionData;

  /**
   * 获取碰撞内容集合
   * @param polygon - 多边形区域的顶点坐标数组
   * @returns 碰撞的开口对象数组
   * @private
   */
  private _getCollisionContents(polygon: Point2D[]): Opening[];

  /**
   * 获取最近的碰撞线段
   * @param contents - 碰撞内容对象数组
   * @param referenceLine - 参考线段
   * @returns 最近的碰撞结果
   * @private
   */
  private _getClosestCollisionLine(
    contents: Opening[],
    referenceLine: Line3
  ): CollisionResult | undefined;
}

/**
 * 内容尺寸控制器（内部类）
 * OpeningDimension 的辅助控制器
 * @internal
 */
declare class InternalDimensionController extends ContentDimensionController {
  /**
   * 获取房间高度
   * @returns 内容对象所在宿主的3D高度
   * @protected
   */
  protected _getRoomHeight(): number;
}