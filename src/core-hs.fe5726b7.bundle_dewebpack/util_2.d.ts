/**
 * 几何工具类 - 提供3D几何体计算和墙体几何信息处理功能
 * @module Util
 */

/**
 * 2D/3D点坐标接口
 */
interface Point2D {
  x: number;
  y: number;
}

interface Point3D extends Point2D {
  z?: number;
}

/**
 * 弧形信息配置
 */
interface ArcInfo {
  /** 弧形中心点 */
  center: Point3D;
  /** 弧形半径 */
  radius: number;
  /** 是否顺时针方向 */
  clockwise: boolean;
}

/**
 * 带有弧形信息的点
 */
interface PointWithArc extends Point3D {
  arcInfo?: ArcInfo;
}

/**
 * 几何路径 - 扩展数组，包含弧形路径集合
 */
interface GeometryPath extends Array<THREE.Vector2> {
  /** 所有弧形子路径的集合 */
  readonly arcPaths: THREE.Vector2[][];
}

/**
 * 路径段信息
 */
interface PathSegment {
  /** 实际空间路径 */
  path: THREE.Vector3[];
  /** 平面投影路径 */
  planePath: THREE.Vector3[];
}

/**
 * 挤出表面几何体信息
 */
interface ExtrudeSurfaceGeometry {
  /** 完整路径（包含顶部和底部的所有顶点） */
  path: THREE.Vector3[];
  /** 平面路径 */
  planePath: THREE.Vector3[];
  /** 分段信息数组 */
  segments: PathSegment[];
}

/**
 * 墙体几何信息（扩展版）
 */
interface WallGeometryInfoExt {
  /** 边界线路径 */
  borderlinePath: Point3D[];
  /** 左侧起点 */
  leftFrom: Point3D;
  /** 左侧终点 */
  leftTo: Point3D;
  /** 右侧起点 */
  rightFrom: Point3D;
  /** 右侧终点 */
  rightTo: Point3D;
  /** 完整几何数据 */
  geometry: Point3D[];
  /** 索引数组 [左起点索引, 左终点索引, 右起点索引, 右终点索引] */
  indices: [number, number, number, number];

  /** 左侧边路径（动态计算属性） */
  readonly leftPath: GeometryPath;
  /** 右侧边路径（动态计算属性） */
  readonly rightPath: GeometryPath;
  /** 起始面路径（动态计算属性） */
  readonly fromPath: Point3D[];
  /** 结束面路径（动态计算属性） */
  readonly toPath: Point3D[];
  /** 完整墙体路径（动态计算属性） */
  readonly path: (Point3D | THREE.Vector2)[];
}

/**
 * 弧形生成选项
 */
interface ArcGenerationOptions {
  /** 弧形分段数量（可选） */
  segments?: number;
}

/**
 * 文档管理器接口（外部依赖）
 */
interface DocManager {
  /** 获取单例实例 */
  instance(): DocManager;
  /** 几何体存储映射 */
  geometries: Map<string, { geometry: Point3D[]; indices: [number, number, number, number] }>;
}

/**
 * 实体对象接口
 */
interface Entity {
  /** 实体唯一标识 */
  id: string;
}

/**
 * 几何工具类 - 提供3D几何体生成和墙体信息计算功能
 */
export declare class Util {
  /**
   * 生成挤出表面几何体
   * @param points - 底部轮廓点集合
   * @param direction - 挤出方向向量
   * @param bottomZ - 底部Z坐标
   * @param topZ - 顶部Z坐标
   * @returns 挤出表面几何体信息（包含路径、平面路径和分段信息）
   * @description
   * 根据给定的2D轮廓点集合，沿指定方向挤出生成3D表面几何体。
   * 生成的几何体包含顶部和底部的完整路径，以及每个边的分段信息。
   */
  static getExtrudeSurfaceGeometry(
    points: Point2D[],
    direction: THREE.Vector3,
    bottomZ: number,
    topZ: number
  ): ExtrudeSurfaceGeometry;

  /**
   * 获取墙体几何信息（扩展版）
   * @param entity - 墙体实体对象
   * @returns 墙体几何信息对象，如果实体无效或几何数据不存在则返回undefined
   * @description
   * 从实体中提取墙体的完整几何信息，包括左右侧边路径、起始和结束面路径。
   * 返回的对象包含动态计算属性（leftPath、rightPath、fromPath、toPath、path）。
   */
  static getWallGeometryInfoExt(entity?: Entity): WallGeometryInfoExt | undefined;

  /**
   * 根据点集合生成几何路径（处理弧形和直线段）
   * @param points - 点集合（可能包含弧形信息）
   * @param isClosed - 路径是否闭合，默认为true
   * @returns 包含弧形路径信息的几何路径，如果点集合无效则返回null
   * @description
   * 将点集合转换为几何路径，自动处理弧形段和直线段。
   * 如果点包含arcInfo属性，会生成平滑的弧形路径。
   */
  static getPoints(
    points: PointWithArc[] | null | undefined,
    isClosed?: boolean
  ): GeometryPath | null;

  /**
   * 生成弧形的离散点集合
   * @param arc - THREE.js弧形曲线对象
   * @param options - 生成选项（可指定分段数量）
   * @returns 弧形的离散点数组
   * @description
   * 将弧形曲线离散化为点集合，自动计算合理的分段数量（默认48-72段）。
   * 分段数量会根据弧形长度和半径进行调整，确保足够平滑。
   */
  static getArcPoints(
    arc: THREE.EllipseCurve,
    options?: ArcGenerationOptions
  ): THREE.Vector2[];
}