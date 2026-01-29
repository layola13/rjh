/**
 * 天花板工具模块
 * 提供天花板几何操作、分割和验证功能
 */

import { Loop } from './Loop';
import { Vertex } from './Vertex';

/**
 * 3D 点坐标信息
 */
interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 弧线信息
 */
interface ArcInfo {
  /** 弧线中心点 */
  center: Point3D;
  /** 是否顺时针方向 */
  clockwise: boolean;
}

/**
 * 边分割信息
 */
interface SplitEdgeInfo {
  /** 是否为分割边 */
  isSplitEdge: boolean;
  /** 是否为内部边 */
  isInnerEdge: boolean;
}

/**
 * 循环点信息（带额外几何属性）
 */
interface LoopPointInfo extends Point3D {
  /** 弧线信息（可选） */
  arcInfo?: ArcInfo;
  /** 边分割信息（可选） */
  splitEdgeInfo?: SplitEdgeInfo;
}

/**
 * 天花板实体接口
 */
interface CeilingEntity {
  /** 外部循环 */
  outerLoop: Loop;
  /** 分割信息（多边形点集数组） */
  divideInfo?: Point3D[][];
  /** 材质信息（内部属性） */
  __material?: unknown;
}

/**
 * 裁剪操作选项
 */
interface ClipOptions {
  /** 裁剪操作类型 */
  operation: HSCore.Util.Collision.ClipType;
}

/**
 * 天花板工具类
 * 提供天花板几何体的查询、验证和分割功能
 */
export declare const CeilingUtil: {
  /**
   * 获取天花板对应的地板实体
   * 
   * @param ceilingFace - 天花板面实体
   * @returns 对应的地板实体，如果不存在则返回 undefined
   * 
   * @description
   * 通过图层管理器查找天花板面对应的地板面。
   * 算法遍历图层中的所有地板，匹配房间信息中的天花板面引用。
   */
  getCeilingFloor(ceilingFace: unknown): unknown | undefined;

  /**
   * 验证天花板分割信息的有效性
   * 
   * @param outerLoopPoints - 外部循环的点集合
   * @param divideInfo - 待验证的分割信息（多边形点集数组）
   * @returns 如果分割有效返回 true，否则返回 false
   * 
   * @description
   * 通过执行差集裁剪操作验证分割信息：
   * - 有效分割：差集结果为空（分割完全覆盖原多边形）
   * - 无效分割：差集存在剩余区域
   */
  isValidDivideInfo(
    outerLoopPoints: Point3D[],
    divideInfo: Point3D[][]
  ): boolean;

  /**
   * 加载并处理天花板分割信息
   * 
   * @param ceiling - 天花板实体
   * @param _unusedParam - 未使用的参数（保留用于扩展）
   * @returns void
   * 
   * @description
   * 处理流程：
   * 1. 验证分割信息有效性，无效则重置
   * 2. 提取外部循环点集
   * 3. 构建顶点复用映射（避免重复顶点）
   * 4. 为每个分割多边形创建循环：
   *    - 创建顶点并复用已有顶点
   *    - 处理弧线边信息
   *    - 标记分割边和内部边
   *    - 创建分割天花板实体
   * 
   * @remarks
   * - 自动标记共享边为分割边
   * - 保留原始材质信息
   * - 设置 isSplitCeiling 标志
   */
  loadCeilingDivideInfo(
    ceiling: CeilingEntity,
    _unusedParam: unknown
  ): void;
};

/**
 * 全局 HSCore 命名空间（外部依赖）
 */
declare global {
  namespace HSCore {
    namespace Util {
      namespace Layer {
        function getEntityLayer(entity: unknown): LayerInfo | undefined;
      }

      namespace Loop {
        function getLoopPoints(loop: Loop): LoopPointInfo[];
      }

      namespace Math {
        function isSamePoint3(p1: Point3D, p2: Point3D): boolean;
      }

      namespace Collision {
        enum ClipType {
          diff = 'diff'
        }
        
        function ClipPolygon(
          polygons: Point3D[][],
          clipPolygon: Point3D[][],
          options: ClipOptions
        ): Point3D[][] | null;
      }
    }

    namespace Doc {
      function getDocManager(): DocManager;
    }

    namespace Model {
      namespace Ceiling {
        function create(
          holes: Loop[],
          outerLoop: Loop,
          material?: unknown
        ): CeilingModel;
      }
    }

    interface LayerInfo {
      forEachFloor(callback: (floor: unknown) => void): void;
    }

    interface DocManager {
      geometryManager: GeometryManager;
    }

    interface GeometryManager {
      getFaceRoomInfo(face: unknown): RoomInfo | null;
    }

    interface RoomInfo {
      ceilingFace: unknown;
    }

    interface CeilingModel {
      isSplitCeiling: boolean;
    }
  }
}