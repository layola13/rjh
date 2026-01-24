/**
 * 水平方向的附加尺寸标注类
 * 用于在图形中创建水平方向的尺寸线和标注
 */
export declare class ExtraDimHorizontal extends ExtraDimArbitrary {
  /**
   * 起点坐标
   */
  protected sPt: Point;

  /**
   * 终点坐标
   */
  protected ePt: Point;

  /**
   * 宿主对象，用于关联标注所属的图形元素
   */
  protected host: unknown;

  /**
   * 偏移向量，用于调整标注线的位置
   */
  protected offVec: Vector;

  /**
   * 标注的数值（水平距离）
   */
  value: number;

  /**
   * 标注的图形元素集合（尺寸线、箭头等）
   */
  shapes: Segment[][];

  /**
   * 创建水平尺寸标注
   * @param sPt - 起点坐标
   * @param ePt - 终点坐标
   * @param host - 宿主对象
   * @param offVec - 偏移向量，默认为零向量
   */
  constructor(sPt: Point, ePt: Point, host: unknown, offVec?: Vector);

  /**
   * 获取附加尺寸类型
   * @returns 返回水平类型枚举值
   */
  get extraDimType(): ExtraDimTypeEnum.Horizontal;

  /**
   * 创建标注图形
   * 根据起点、终点和参数生成尺寸线、端点线等图形元素
   */
  create(): void;
}

/**
 * 点对象接口
 */
interface Point {
  x: number;
  y: number;
}

/**
 * 向量对象接口
 */
interface Vector {
  x: number;
  y: number;
  normalize(): Vector;
  rotate90CW(): Vector;
  multiply(scalar: number): Vector;
  equalTo(other: Vector): boolean;
}

/**
 * 线段对象接口
 */
interface Segment {
  ps: Point;
  pe: Point;
  translate(vector: Vector): Segment;
}

/**
 * 附加尺寸的基类（任意方向）
 */
declare abstract class ExtraDimArbitrary {
  protected params: ExtraDimParams;
  value: number;
  shapes: Segment[][];
  abstract get extraDimType(): ExtraDimTypeEnum;
}

/**
 * 附加尺寸参数配置
 */
interface ExtraDimParams {
  /**
   * 尺寸线距离测量对象的偏移距离
   */
  extraDim: number;
}

/**
 * 附加尺寸类型枚举
 */
declare enum ExtraDimTypeEnum {
  /**
   * 水平方向
   */
  Horizontal = "horizontal",
  /**
   * 垂直方向
   */
  Vertical = "vertical",
  /**
   * 任意方向
   */
  Arbitrary = "arbitrary"
}