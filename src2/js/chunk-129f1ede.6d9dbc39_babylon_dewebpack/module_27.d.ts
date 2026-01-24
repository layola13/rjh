import { Vector2, Vector3 } from 'babylonjs'; // 假设模块3是babylonjs
import Point from 'paper'; // 假设模块19导出Point类
import { IsCW as IsCWUtil } from 'some-geometry-util'; // 假设模块16提供几何工具

/**
 * 表示二维坐标点的对象结构
 */
export interface IPoint2D {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
}

/**
 * 表示三维向量的对象结构
 */
export interface IVector3Like {
  /** X分量 */
  x: number;
  /** Y分量 */
  y: number;
  /** Z分量 */
  z: number;
}

/**
 * 几何工具类
 * 提供2D/3D向量转换、点位计算等静态方法
 */
export default class GeometryUtil {
  /**
   * 根据三个点计算外接圆圆心坐标
   * @param point1 第一个点
   * @param point2 第二个点
   * @param point3 第三个点
   * @returns 圆心的Vector2坐标
   */
  static GetCenterPosVector2(
    point1: Vector2,
    point2: Vector2,
    point3: Vector2
  ): Vector2;

  /**
   * 将Vector2转换为字符串表示形式
   * @param vector 要转换的向量
   * @returns 格式为 "(x, y)" 的字符串
   */
  static ToStringInfo(vector: Vector2): string;

  /**
   * 将Vector2转换为Vector3（Z轴设为0）
   * @param vector 二维向量
   * @returns 三维向量，Z=0
   */
  static ToVector3(vector: Vector2): Vector3;

  /**
   * 将对象转换为Vector3（Z轴设为0）
   * @param obj 包含x, y属性的对象
   * @returns 三维向量，Z=0
   */
  static ToVector3FromObject(obj: IPoint2D): Vector3;

  /**
   * 将对象转换为Vector2
   * @param obj 包含x, y属性的对象
   * @returns 二维向量
   */
  static ToVector2FromObject(obj: IPoint2D): Vector2;

  /**
   * 将Point转换为Vector2
   * @param point Point对象
   * @returns 二维向量
   */
  static ToVector2FromPoint(point: Point): Vector2;

  /**
   * 从向量对象创建Vector2
   * @param vector 包含x, y属性的向量对象
   * @returns 二维向量
   */
  static ToVector2FromVector(vector: IPoint2D): Vector2;

  /**
   * 将Vector3转换为Vector2（丢弃Z轴）
   * @param vector 三维向量
   * @returns 二维向量
   */
  static ToV2FromV3(vector: Vector3): Vector2;

  /**
   * 将Vector2转换为Point对象
   * @param vector 二维向量
   * @returns Point对象
   */
  static ToPoint(vector: Vector2): Point;

  /**
   * 判断点集是否按逆时针(CCW)方向排列
   * @param points 点集数组
   * @returns true表示逆时针，false表示顺时针
   */
  static GetVector2sCCW(points: IPoint2D[]): boolean;

  /**
   * 判断点集是否按顺时针(CW)方向排列
   * @param points 点集数组
   * @returns true表示顺时针，false表示逆时针
   */
  static IsCW(points: IPoint2D[]): boolean;

  /**
   * 标准化点集的顺时针状态
   * @param points 点集数组（会被原地修改）
   * @param shouldBeCW 是否应该为顺时针，默认true
   */
  static NormalCWStatus(points: IPoint2D[], shouldBeCW?: boolean): void;

  /**
   * 设置点集的闭合状态
   * @param points 点集数组（会被原地修改）
   * @param shouldClose 是否应该闭合（首尾相连），默认true
   * @description 闭合时会在末尾添加首点；取消闭合时会移除末尾的重复首点
   */
  static SetClosed(points: Vector2[], shouldClose?: boolean): void;
}