import type { Point, Vector, Segment } from 'flatten-js';

/**
 * 额外标注参数接口
 */
export interface ExtraDimParams {
  /** 额外标注的距离偏移量 */
  extraDim: number;
}

/**
 * 额外标注类型枚举
 */
export enum ExtraDimTypeEnum {
  /** 垂直方向标注 */
  Vertical = 'Vertical',
  /** 水平方向标注 */
  Horizontal = 'Horizontal',
  /** 任意方向标注 */
  Arbitrary = 'Arbitrary',
}

/**
 * 绘图参数单例
 */
export interface DrawParams {
  /** 是否禁用标注渲染 */
  withoutDims: boolean;
}

/**
 * 额外标注抽象基类
 */
export declare abstract class ExtraDimArbitrary {
  /** 起始点 */
  protected sPt: Point;
  /** 结束点 */
  protected ePt: Point;
  /** 宿主对象 */
  protected host: any;
  /** 偏移向量 */
  protected offVec: Vector;
  /** 标注参数 */
  protected params: ExtraDimParams;
  /** 标注值（计算得出的尺寸） */
  value: number;
  /** 生成的图形元素集合（线段数组） */
  shapes: Array<Segment[]>;

  /**
   * 构造函数
   * @param sPt - 起始点
   * @param ePt - 结束点
   * @param host - 宿主对象
   * @param offVec - 偏移向量，默认为零向量
   */
  constructor(sPt: Point, ePt: Point, host: any, offVec?: Vector);

  /**
   * 获取额外标注类型
   */
  abstract get extraDimType(): ExtraDimTypeEnum;

  /**
   * 创建标注图形
   */
  abstract create(): void;
}

/**
 * 垂直方向额外标注类
 * 用于创建垂直方向的尺寸标注，包含引线和标注线
 */
export declare class ExtraDimVertical extends ExtraDimArbitrary {
  /**
   * 构造函数
   * @param sPt - 起始点
   * @param ePt - 结束点
   * @param host - 宿主对象（通常是需要标注的图形元素）
   * @param offVec - 偏移向量，用于调整标注线的位置，默认为零向量
   */
  constructor(sPt: Point, ePt: Point, host: any, offVec?: Vector);

  /**
   * 获取标注类型
   * @returns 返回垂直标注类型枚举值
   */
  get extraDimType(): ExtraDimTypeEnum.Vertical;

  /**
   * 创建垂直标注图形
   * 
   * 生成包含以下元素的标注：
   * - 两条垂直于标注线的引线（标注端点）
   * - 一条连接两个引线的主标注线
   * 
   * 标注值为起始点和结束点在Y轴方向的距离
   * 
   * 如果设置了禁用标注或Y轴距离为0，则不生成图形
   */
  create(): void;
}