/**
 * 复合线切割模块
 * 用于处理多边形的复合线分割操作
 */

import Turf from './turf'; // 假设索引0是turf库
import { SplitterLine, Splitter, PointCut } from './splitter'; // 假设索引10是splitter模块
import { Polygon, Line, Edge, Point, Orientation } from './geometry'; // 几何类型定义

/**
 * 交叉点信息
 */
interface CrossPoint {
  /** 交叉点对应的多边形点 */
  poly: Point;
  /** 交叉点所在的线段 */
  line: Line;
}

/**
 * 链接边缘结果
 */
interface LinkEdgesResult {
  /** 生成的多边形 */
  poly: Polygon;
  /** 外边缘索引 */
  idx: number;
}

/**
 * 分割结果片段
 */
interface SplitFragment {
  /** 是否为竖框 */
  IsMullion: boolean;
  /** 分割线信息 */
  spLine?: {
    line: Line;
  };
  /** 边缘数组 */
  edges: Edge[];
}

/**
 * 双向链表节点
 */
interface LinkedNode<T> {
  /** 节点值 */
  value: T;
  /** 前驱节点 */
  prev?: LinkedNode<T>;
  /** 后继节点 */
  next?: LinkedNode<T>;
}

/**
 * 复合线切割器
 * 用于使用复合分割线对多边形进行切割操作
 */
export declare class CompoundLineCut {
  /** 待切割的多边形 */
  private readonly polygon: Polygon;
  
  /** 分割线对象 */
  private readonly sline: SplitterLine;
  
  /** 点切割器 */
  private readonly ptCutor: PointCut;

  /**
   * 构造函数
   * @param polygon - 待切割的多边形
   * @param sline - 用于切割的分割线
   */
  constructor(polygon: Polygon, sline: SplitterLine);

  /**
   * 执行分割操作
   * @param frameWidth - 框架宽度
   * @returns 分割后的多边形片段数组
   * @throws 当交叉点未正确找到时抛出错误
   */
  split(frameWidth: number): Polygon[];

  /**
   * 链接边缘
   * 将切割点之间的边缘链接成新的多边形
   * @param currentIndex - 当前索引
   * @param crossPoints - 交叉点数组
   * @param orientation - 多边形方向
   * @returns 链接后的多边形及其索引
   */
  private linkEdges(
    currentIndex: number,
    crossPoints: CrossPoint[],
    orientation: Orientation
  ): LinkEdgesResult;
}