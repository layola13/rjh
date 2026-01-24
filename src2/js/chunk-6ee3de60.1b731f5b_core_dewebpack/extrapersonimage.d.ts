/**
 * ExtraPersonImage 模块
 * 用于在画布上绘制和管理额外的人物图像（如人物剪影）
 */

import { Point, Vector, Box } from './geometry';
import { Shape, ShapeType, Text, TextAlign, Polygon } from './shapes';
import { FillPatternType } from './fill-pattern';

/**
 * 人物图像序列化数据接口
 */
interface ExtraPersonImageJSON {
  /** 位置点 */
  pt: { x: number; y: number };
  /** 填充图案类型 */
  fpt: FillPatternType;
}

/**
 * 图像信息元组类型
 * [图像宽度, 图像高度, 尺寸值, 尺寸比例, 高度向量, 尺寸名称向量]
 */
type ImageInfo = [number, number, number, number, Vector, Vector];

/**
 * 额外的人物图像类
 * 继承自 Shape，用于在场景中绘制可交互的人物剪影
 * 支持拖拽、选中、序列化等功能
 */
export declare class ExtraPersonImage extends Shape {
  /** 填充图案类型（如男性、女性） */
  fillerPatternType: FillPatternType;
  
  /** 图像宽度（原始尺寸） */
  imageWidth: number;
  
  /** 图像高度（原始尺寸） */
  imageHeight: number;
  
  /** 尺寸比例（用于缩放计算） */
  dimPortion: number;
  
  /** 实际尺寸值（厘米） */
  dimValue: number;
  
  /** 图像位置点 */
  pt: Point;
  
  /** 高度标注向量 */
  heightVec: Vector;
  
  /** 尺寸名称标注向量 */
  dimNameVec: Vector;
  
  /** 是否被选中 */
  selected: boolean;
  
  /** 可视化形状数组（用于渲染） */
  vshapes: any[];
  
  /** 组成图像的形状集合（多边形 + 文本） */
  shapes: (Polygon | Text)[];

  /**
   * 构造函数
   * @param fillerPatternType - 填充图案类型，默认为 Man
   * @param imageWidth - 图像宽度，默认为 0
   * @param imageHeight - 图像高度，默认为 0
   * @param dimPortion - 尺寸比例，默认为 1
   * @param dimValue - 尺寸值，默认为 0
   * @param pt - 位置点，默认为原点
   * @param heightVec - 高度向量，默认为零向量
   * @param dimNameVec - 尺寸名称向量，默认为零向量
   */
  constructor(
    fillerPatternType?: FillPatternType,
    imageWidth?: number,
    imageHeight?: number,
    dimPortion?: number,
    dimValue?: number,
    pt?: Point,
    heightVec?: Vector,
    dimNameVec?: Vector
  );

  /**
   * 获取包围盒
   * 合并所有子形状的包围盒
   */
  get box(): Box;

  /**
   * 缩放因子
   * 根据实际尺寸值和图像尺寸计算缩放比例
   */
  get scaleFactor(): number;

  /**
   * 命中测试
   * @param point - 测试点坐标
   * @param context - 绘图上下文
   * @returns 是否命中并选中
   */
  hitBar(point: Point, context: any): boolean;

  /**
   * 更新多边形
   * 重新创建所有组成形状
   * @returns 返回当前实例（支持链式调用）
   */
  updatePoly(): this;

  /**
   * 回收资源
   * @param force - 是否强制回收，默认为 false
   */
  recycle(force?: boolean): void;

  /**
   * 平移图像
   * @param offset - 平移向量
   */
  translate(offset: Vector): void;

  /**
   * 序列化为JSON
   * @returns 序列化后的数据对象
   */
  toJSON(): ExtraPersonImageJSON;

  /**
   * 从JSON数据反序列化
   * @param data - 序列化的数据对象
   * @param context - 绘图上下文
   */
  deserialize(data: ExtraPersonImageJSON, context: any): void;

  /**
   * 绘制图像
   * @param context - 绘图上下文
   */
  draw(context: any): void;

  /**
   * 删除图像
   * @param context - 绘图上下文
   * @returns 是否成功删除
   */
  delete(context: any): boolean;

  /**
   * 创建组成图像的形状
   * 包括主体多边形和标注文本
   * @private
   */
  private createShapes(): void;

  /**
   * 从组中回收形状
   * @param shapes - 要回收的形状数组
   * @private
   */
  private recycleFromGroup(shapes: any[]): void;

  /**
   * 添加形状到组
   * @param shapes - 要添加的形状数组
   * @private
   */
  private addToGroup(shapes: any[]): void;

  /**
   * 隐藏辅助元素
   * @private
   */
  private hideAssist(): void;

  /**
   * 移除图像
   * @private
   */
  private remove(): void;
}