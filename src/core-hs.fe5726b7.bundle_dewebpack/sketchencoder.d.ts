import type { Line2d } from './Line2d';
import type { Circle2d } from './Circle2d';
import type { CircleArc2d } from './CircleArc2d';

/**
 * 表示二维点坐标
 */
interface Point2d {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
}

/**
 * 二维曲线类型联合
 */
type Curve2d = Line2d | Circle2d | CircleArc2d;

/**
 * 二维线框，包含多条曲线
 */
interface Wire2d {
  /** 线框中的曲线集合 */
  curves: Curve2d[];
}

/**
 * 二维面对象
 */
interface Face2d {
  /** 面的唯一标识符（大写） */
  ID: string;
  /** 面的唯一标识符（小写） */
  id: string;
  /** 获取面的所有线框 */
  getWires(): Wire2d[];
}

/**
 * 草图数据对象
 */
interface SketchData {
  /** 草图中的所有面 */
  faces: Face2d[];
  /**
   * 获取指定面ID的拉伸值
   * @param faceId 面的ID
   * @returns 拉伸值，如果不存在则返回undefined
   */
  getExtrusionValue(faceId: string): number | undefined;
}

/**
 * 编码后的草图面信息
 */
interface EncodedSketchFace {
  /** 原始二维面对象 */
  face2d: Face2d;
  /** 拉伸值 */
  value: number;
  /** 编码后的唯一标识字符串 */
  id: string;
}

/**
 * 草图编码器
 * 
 * 将草图的几何信息（面、线、圆、圆弧）编码为唯一字符串标识符。
 * 采用单例模式，通过 getInstance() 获取实例。
 */
export declare class SketchEncoder {
  /** 最小拉伸值常量 */
  private readonly _MINEXTRUSION: number;

  /** 单例实例 */
  private static _instance?: SketchEncoder;

  /**
   * 私有构造函数，防止外部直接实例化
   */
  private constructor();

  /**
   * 获取 SketchEncoder 单例实例
   * @returns SketchEncoder 实例
   */
  static getInstance(): SketchEncoder;

  /**
   * 生成草图所有面的编码信息
   * @param sketchData 草图数据对象
   * @returns 编码后的面信息数组
   */
  generateEncodedSketchFaces(sketchData: SketchData): EncodedSketchFace[];

  /**
   * 编码单个草图面
   * @param face 二维面对象
   * @param extrusionValue 拉伸值
   * @returns 编码字符串，格式：f2d-{faceId}-{extrusion}-{curveEncoding}...
   */
  encodeSketchFace(face: Face2d, extrusionValue: number): string;

  /**
   * 编码草图曲线（多态分发）
   * @param curve 二维曲线对象（Line2d | Circle2d | CircleArc2d）
   * @returns 编码字符串，根据曲线类型返回不同格式
   */
  encodeSketchCurve(curve: Curve2d): string;

  /**
   * 编码二维直线
   * @param line 二维直线对象
   * @returns 编码字符串，格式：l2d-{startX},{startY}-{endX},{endY}
   */
  encodeSketchLine2d(line: Line2d): string;

  /**
   * 编码二维圆
   * @param circle 二维圆对象
   * @returns 编码字符串，格式：c2d-{centerX},{centerY}-{radius}
   */
  encodeSketchCircle2d(circle: Circle2d): string;

  /**
   * 编码二维圆弧
   * @param circleArc 二维圆弧对象
   * @returns 编码字符串，格式：ca2d-{centerX},{centerY}-{radius}-{startX}{startY}-{endX}{endY}-{cw|ccw}
   */
  encodeSketchCircleArc2d(circleArc: CircleArc2d): string;
}