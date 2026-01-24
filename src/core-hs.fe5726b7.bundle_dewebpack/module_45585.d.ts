/**
 * 房间信息管理模块
 * 提供房间几何信息的计算、边缘范围分析、开口信息管理等功能
 */

import { Line } from './geometry';
import { GeometryUtil } from './geometry-util';

/**
 * 表示一维范围的接口
 */
interface Range {
  /** 范围最小值 */
  min: number;
  /** 范围最大值 */
  max: number;
}

/**
 * 表示带值的范围
 */
interface RangeWithValue extends Range {
  /** 范围关联的值 */
  value?: number;
}

/**
 * 二维点坐标
 */
interface Point {
  x: number;
  y: number;
}

/**
 * 二维范围，包含最小点和最大点
 */
interface Range2D {
  min: Point;
  max: Point;
}

/**
 * 开口信息接口
 */
interface OpeningInfo {
  /** 开口范围 */
  range: Range;
  /** 开口ID */
  ID: string;
}

/**
 * 边缘信息接口，包含门、窗、洞口信息
 */
interface EdgeInfo {
  /** 门信息列表 */
  door: OpeningInfo[];
  /** 窗信息列表 */
  window: OpeningInfo[];
  /** 洞口信息列表 */
  hole: OpeningInfo[];
}

/**
 * 开口类型
 */
type OpeningType = 'door' | 'window' | 'hole';

/**
 * 主机边缘信息
 */
interface HostEdgeInfo {
  /** 边缘索引 */
  index: number;
  /** 左侧空间 */
  leftSpace: number;
  /** 右侧空间 */
  rightSpace: number;
}

/**
 * 房间信息工具类
 * 提供范围计算、几何变换、边缘分析等静态方法
 */
export const RoomInfo: {
  /**
   * 计算两个范围的重叠长度
   * @param range1 - 第一个范围
   * @param range2 - 第二个范围
   * @returns 重叠长度，无重叠返回0
   */
  getRangeOverLap(range1: Range, range2: Range): number;

  /**
   * 获取两个范围的交集
   * @param range1 - 第一个范围
   * @param range2 - 第二个范围
   * @returns 交集范围，无交集返回null
   */
  getUnionRange(range1: Range, range2: Range): Range | null;

  /**
   * 对范围数组按最小值升序排序
   * @param ranges - 范围数组
   * @returns 排序后的范围数组
   */
  sortRanges<T extends Range>(ranges: T[]): T[];

  /**
   * 合并重叠的范围
   * @param ranges - 范围数组
   * @returns 合并后的范围数组
   */
  combineRanges(ranges: Range[]): Range[];

  /**
   * 从范围中减去另一个范围
   * @param sourceRange - 源范围
   * @param subtractRange - 要减去的范围
   * @returns 剩余的范围数组
   */
  subRange(sourceRange: Range, subtractRange: Range): Range[];

  /**
   * 从范围数组中减去另一个范围数组
   * @param sourceRanges - 源范围数组
   * @param subtractRanges - 要减去的范围数组
   * @returns 剩余的范围数组
   */
  subRanges(sourceRanges: Range[], subtractRanges: Range[]): Range[];

  /**
   * 将线段或点转换到以指定线段为X轴的坐标系
   * @param elements - 线段或点的数组
   * @param axisLine - 作为坐标轴的线段
   * @returns 转换后的元素数组
   */
  transformLineToAix(
    elements: Array<Line | Point>,
    axisLine: Line
  ): Array<Line | Point>;

  /**
   * 计算边缘范围信息
   * @param edges - 边缘线段数组
   * @param edgeIndex - 目标边缘索引
   * @param obstacles - 障碍物数组（可选）
   * @returns 边缘范围信息数组
   */
  calculateEdgeRangeInformation(
    edges: Line[],
    edgeIndex: number,
    obstacles?: Point[][]
  ): RangeWithValue[];

  /**
   * 从顶点提取边缘线段
   * @param vertex - 当前顶点
   * @param index - 顶点索引
   * @param vertices - 所有顶点数组
   * @returns 从当前顶点到下一顶点的线段
   */
  extractToEdges(vertex: Point, index: number, vertices: Point[]): Line;

  /**
   * 从顶点数组计算各边的角度
   * @param vertices - 顶点数组
   * @returns 各边角度数组
   */
  getEdgeAnglesFromVertexs(vertices: Point[]): number[];

  /**
   * 简化房间几何，移除共线点和距离过近的点
   * @param vertices - 原始顶点数组
   * @returns 简化后的顶点数组
   */
  simplifyRoomGeo(vertices: Point[]): Point[];

  /**
   * 获取线段的角度
   * @param line - 线段对象
   * @returns 线段角度（弧度）
   */
  getLineAngle(line: Line): number;

  /**
   * 判断两个角度是否平行
   * @param angle1 - 第一个角度
   * @param angle2 - 第二个角度
   * @param tolerance - 容差值，默认0.01
   * @returns 是否平行
   */
  isAngleParall(angle1: number, angle2: number, tolerance?: number): boolean;

  /**
   * 计算点到线段的最短距离
   * @param line - 线段对象
   * @param point - 点坐标
   * @returns 最短距离
   */
  closestSegmentDistance(line: Line, point: Point): number;

  /**
   * 获取开口的主机边缘信息
   * @param edges - 边缘数组
   * @param opening - 开口对象
   * @returns 主机边缘信息，未找到返回null
   */
  getOpeningHostEdgeInfo(edges: Line[], opening: any): HostEdgeInfo | null;
};

/**
 * 房间信息管理器
 * 管理房间的多边形、边缘及开口信息
 */
export class RoomInfoManager {
  /** 房间多边形顶点数组 */
  Polygon: Point[];
  
  /** 房间边缘线段数组 */
  Edges: Line[];
  
  /** 各边缘的开口信息 */
  EdgesInfo: EdgeInfo[];

  /**
   * 创建房间信息管理器实例
   * @param room - 房间对象（可选）
   */
  constructor(room?: any);

  /**
   * 设置开口信息
   * @param openingType - 开口类型（door/window/hole）
   * @param openingId - 开口ID
   * @param edgeIndex - 边缘索引
   * @param range - 开口范围
   */
  setOpening(
    openingType: OpeningType,
    openingId: string,
    edgeIndex: number,
    range: Range
  ): void;
}