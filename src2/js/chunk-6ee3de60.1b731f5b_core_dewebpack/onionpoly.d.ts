import { Point, Vector, Matrix } from './geometry';
import { WinPolygon, PolygonCreator, PolyType, DescriptivePolygonPoints } from './polygon';
import { Edge } from './edge';

/**
 * 控制点配置接口
 * 定义多边形控制点的行为属性
 */
interface ControlPointConfig {
  /** 是否为弧形控制点 */
  arc: boolean;
  /** 是否为端点 */
  endpoint: boolean;
}

/**
 * 维度信息接口
 * 描述多边形尺寸标注的显示配置
 */
interface DimensionInfo {
  /** 维度索引 */
  idx: number;
  /** 是否显示尺寸标注 */
  dimShow: boolean;
}

/**
 * JSON序列化数据接口
 * 用于OnionPoly的序列化和反序列化
 */
interface OnionPolyJSON {
  /** 多边形类型标识 */
  type: PolyType;
  /** 中心点的JSON表示 */
  cpt: object;
  /** 半径值 */
  radius: number;
  /** 继承自WinPolygon的其他属性 */
  [key: string]: unknown;
}

/**
 * 洋葱形多边形类
 * 继承自WinPolygon，实现具有特殊形状的可编辑多边形
 * 形状特点：上下对称，具有弧形边缘的洋葱形轮廓
 */
export declare class OnionPoly extends WinPolygon {
  /** 中心点坐标 */
  cpt: Point;
  
  /** 多边形的特征半径 */
  radius: number;

  /**
   * 构造函数
   * @param cpt - 洋葱形多边形的中心点
   * @param radius - 多边形的特征半径
   * @param edges - 多边形的边集合（可选，用于从已有边创建）
   */
  constructor(cpt: Point, radius: number, edges?: Edge[]);

  /**
   * 控制维度标志
   * 指示该多边形是否支持尺寸标注控制
   * @returns 始终返回true，表示支持尺寸控制
   */
  get controlDimFlag(): boolean;

  /**
   * 静态工厂方法：创建洋葱形多边形的边集合
   * @param center - 洋葱形的中心点
   * @param radius - 特征半径
   * @returns 构成洋葱形的边数组
   */
  static create(center: Point, radius: number): Edge[];

  /**
   * 初始化控制点配置
   * 设置索引1、2、3的控制点为非弧形端点
   */
  initPoly(): void;

  /**
   * 克隆当前洋葱形多边形
   * @returns 新的OnionPoly实例，具有相同的中心点和半径
   */
  protected _clone(): OnionPoly;

  /**
   * 缩放多边形
   * @param scaleFactor - 缩放因子
   * @returns 缩放后的多边形实例（this）
   */
  scale(scaleFactor: number): this;

  /**
   * 序列化为JSON对象
   * @returns 包含类型、中心点、半径等信息的JSON对象
   */
  toJSON(): OnionPolyJSON;

  /**
   * 平移多边形
   * @param vector - 平移向量
   * @returns 平移后的多边形实例（this）
   */
  translate(vector: Vector): this;

  /**
   * 旋转多边形
   * @param angle - 旋转角度（弧度）
   * @param center - 旋转中心点
   * @returns 旋转后的多边形实例（this）
   */
  rotate(angle: number, center: Point): this;

  /**
   * 拖拽边进行编辑
   * 根据边的索引执行不同的拖拽逻辑，保持洋葱形的对称性
   * @param edgeIndex - 边的索引（0-4）
   * @param dragVector - 拖拽向量
   * @param referencePoint - 参考点（默认为原点）
   * @returns 新的OnionPoly实例，反映拖拽后的形状
   */
  dragEdge(edgeIndex: number, dragVector: Vector, referencePoint?: Point): OnionPoly;

  /**
   * 拖拽顶点进行编辑
   * @param vertexIndex - 顶点索引
   * @param dragVector - 拖拽向量
   * @param snapToGrid - 是否吸附到网格
   * @param referencePoint - 参考点（默认为原点）
   * @returns 新的OnionPoly实例
   */
  dragVertex(
    vertexIndex: number,
    dragVector: Vector,
    snapToGrid: boolean,
    referencePoint?: Point
  ): OnionPoly;

  /**
   * 拖拽弧形边进行编辑
   * 调整弧形边的曲率，保持对称性
   * @param arcIndex - 弧形边索引
   * @param dragVector - 拖拽向量
   * @returns 新的OnionPoly实例
   */
  dragArc(arcIndex: number, dragVector: Vector): OnionPoly;

  /**
   * 编辑尺寸标注
   * 通过修改尺寸值来调整多边形形状
   * @param dimIndex - 尺寸标注索引
   * @param newValue - 新的尺寸值
   * @param unit - 单位信息
   * @returns 新的OnionPoly实例
   */
  editDim(dimIndex: number, newValue: number, unit: unknown): OnionPoly;

  /**
   * 初始化尺寸标注信息
   * @returns 尺寸标注配置的字典对象
   */
  initDimInfo(): Record<number, DimensionInfo>;
}