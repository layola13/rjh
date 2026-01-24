/**
 * 几何分割模块 - 分段分割器
 * @module SplitterSegment
 */

/**
 * 表示一个点的接口
 */
interface Point {
  x: number;
  y: number;
}

/**
 * 表示一个线段的接口
 */
interface Segment {
  /** 线段起点 */
  start: Point;
  /** 线段终点 */
  end: Point;
  
  /**
   * 获取线段中点
   */
  middle(): Point;
  
  /**
   * 平移线段
   * @param vector - 平移向量
   */
  translate(vector: Vector): Segment;
  
  /**
   * 计算与另一线段的交点
   * @param other - 另一线段
   */
  intersect(other: Segment): Point[];
}

/**
 * 向量类
 */
interface Vector {
  /**
   * 向量乘法
   * @param scalar - 标量值
   */
  multiply(scalar: number): Vector;
  
  /**
   * 逆时针旋转90度
   */
  rotate90CCW(): Vector;
  
  /**
   * 向量点积
   * @param other - 另一向量
   */
  dot(other: Vector): number;
}

/**
 * 边缘元素接口
 */
interface Edge {
  /** 边缘对应的线段 */
  value: Segment;
}

/**
 * 形状元素类
 */
declare class ShapeElement {
  /**
   * 构造形状元素
   * @param segment - 构成形状的线段
   */
  constructor(segment: Segment);
}

/**
 * 点切割工具类
 */
declare class PointCut {
  /**
   * 构造点切割工具
   * @param segment - 要切割的线段
   */
  constructor(segment: Segment);
  
  /**
   * 分割边缘
   * @param points - 分割点数组
   */
  splitEdges(points: Point[]): void;
  
  /**
   * 传递数据到目标容器
   * @param splitPoly - 分割后的多边形容器
   * @param edgesOnLine - 线上的边缘容器
   */
  feedData(splitPoly: unknown, edgesOnLine: Edge[]): void;
}

/**
 * 基础分割器类（抽象基类）
 */
declare abstract class Splitter {
  /**
   * 多边形数据
   */
  protected poly: unknown;
  
  /**
   * 分割线
   */
  protected splitLine: Segment;
  
  /**
   * 分割后的多边形
   */
  protected splitPoly: unknown;
  
  /**
   * 线上的边缘集合
   */
  protected edgesOnLine: Edge[];
  
  /**
   * 构造分割器
   * @param poly - 要分割的多边形
   * @param splitLine - 用于分割的线段
   */
  constructor(poly: unknown, splitLine: Segment);
}

/**
 * 线段分割器类
 * 用于将多边形按线段进行分割
 */
export declare class SplitterSegment extends Splitter {
  /**
   * 构造线段分割器
   * @param poly - 要分割的多边形
   * @param splitLine - 用于分割的线段
   */
  constructor(poly: unknown, splitLine: Segment);
  
  /**
   * 生成隔断线（mullion line）
   * 在给定线段的法向方向上生成两条平行线
   * 
   * @param segment - 基准线段
   * @param offset - 偏移距离
   * @returns 返回两条平行于基准线段的线段数组
   */
  genMullionLine(segment: Segment, offset: number): [Segment, Segment];
  
  /**
   * 分割边缘
   * 使用给定线段与多边形边缘的交点进行分割
   * 
   * @param baseSegment - 基准线段
   * @param targetSegment - 目标线段
   */
  splitEdges(baseSegment: Segment, targetSegment: Segment): void;
  
  /**
   * 对边缘进行排序
   * 根据边缘到线段中点的距离，按逆时针法向方向排序
   * 
   * @param segment - 参考线段
   */
  sortEdges(segment: Segment): void;
  
  /**
   * 创建形状对象
   * 从两个边缘创建一个新的形状元素
   * 
   * @param startEdge - 起始边缘
   * @param endEdge - 结束边缘
   * @param context - 创建上下文（可选）
   * @returns 新创建的形状元素
   */
  createObj(startEdge: Edge, endEdge: Edge, context?: unknown): ShapeElement;
}