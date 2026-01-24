/**
 * 复合线条创建器模块
 * 用于创建各种几何形状的复合线条（正方形、菱形、圆形、六边形等）
 */

import type { Point, Line, Vector } from './geometry-types';
import type { ToolType } from './tool-types';
import type { 
  RegularPoly, 
  DiamondPoly, 
  WinPolygon, 
  PolygonCreator 
} from './polygon-types';
import type { 
  CompoundLine, 
  CompoundLineCircle, 
  CompoundDoubleOctagon, 
  CompoundLongOctagon 
} from './compound-line-types';

/**
 * 几何工具库接口
 */
interface GeometryLib {
  /** 创建点 */
  point(x?: number, y?: number): Point;
  /** 创建线段 */
  line(origin: Point, direction: Vector): Line;
  /** 创建向量 */
  vector(x: number, y: number): Vector;
}

/**
 * 复合线条创建函数类型
 */
type CompoundLineFactory = () => CompoundLine;

/**
 * 复合线条创建器映射表
 */
type CompoundLineFactoryMap = {
  [key in ToolType]?: CompoundLineFactory;
};

/**
 * 复合线条创建器类
 * 单例模式，用于根据工具类型创建对应的复合几何形状
 */
export declare class CompoundLineCreator {
  /**
   * 获取单例实例
   * @readonly
   */
  static readonly Instance: CompoundLineCreator;

  /**
   * 单例实例（内部使用）
   * @private
   */
  private static instance?: CompoundLineCreator;

  /**
   * 默认尺寸常量（基准尺寸）
   * @default 800
   */
  readonly sizeConst: number;

  /**
   * 复合线条创建函数映射表
   * 将工具类型映射到对应的创建函数
   * @private
   */
  private readonly slines: CompoundLineFactoryMap;

  /**
   * 私有构造函数（单例模式）
   * @private
   */
  private constructor();

  /**
   * 根据工具类型创建复合线条
   * @param toolType - 工具类型枚举值
   * @returns 对应的复合线条实例
   * @throws 如果工具类型不支持则可能返回 undefined
   */
  create(toolType: ToolType): CompoundLine;

  /**
   * 创建正方形复合线条
   * - 边长基于 sizeConst/2
   * - 包含4条边界线和正多边形包围盒
   * @returns 正方形复合线条实例
   */
  createSqure(): CompoundLine;

  /**
   * 创建菱形复合线条
   * - 水平宽度为 sizeConst
   * - 垂直高度为 1.5 * sizeConst
   * @returns 菱形复合线条实例
   */
  createDiamond(): CompoundLine;

  /**
   * 创建圆形复合线条
   * - 半径为 sizeConst/2
   * - 使用4段近似表示
   * @returns 圆形复合线条实例
   */
  createCircle(): CompoundLine;

  /**
   * 创建正六边形复合线条
   * - 外接圆半径为 sizeConst/2
   * - 包含6条边界线
   * @returns 正六边形复合线条实例
   */
  createHexagon(): CompoundLine;

  /**
   * 创建旋转45度的正方形（X形正方形）
   * - 对角线长度基于 sizeConst/2
   * - 边界线沿对角线方向
   * @returns 旋转正方形复合线条实例
   */
  createXSqure(): CompoundLine;

  /**
   * 创建单层矩形复合线条
   * - 宽度为 sizeConst/2
   * - 高度为 sizeConst
   * - 单层边界线
   * @returns 单层矩形复合线条实例
   */
  createRectangleSingle(): CompoundLine;

  /**
   * 创建双层矩形复合线条
   * - 宽度为 2*sizeConst/3
   * - 高度为 sizeConst
   * - 每条边包含两条平行线
   * @returns 双层矩形复合线条实例
   */
  createRectangleDouble(): CompoundLine;

  /**
   * 创建双层八边形复合线条
   * - 基础尺寸为 sizeConst/4
   * @returns 双层八边形复合线条实例
   */
  createDoubleOctagon(): CompoundLine;

  /**
   * 创建长八边形复合线条
   * - 基础尺寸为 2*sizeConst/5
   * @returns 长八边形复合线条实例
   */
  createLongOctagon(): CompoundLine;
}