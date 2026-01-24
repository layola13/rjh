/**
 * 面组连接模式枚举
 * 定义面组之间的连接方式
 */
export enum FaceGroupConnectModeEnum {
  /** 无连接模式 */
  None = 0,
  /** 手动连接模式 */
  Manual = 1,
  /** 自动连接模式 */
  Auto = 2
}

/**
 * 面边界信息接口
 * 描述面在2D空间中的位置和尺寸
 */
export interface IFaceBound {
  /** 左边界坐标 */
  left: number;
  /** 顶部边界坐标 */
  top: number;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
  /** 可选的变换矩阵 */
  transform?: Matrix3;
}

/**
 * 面边界映射(左下坐标系)
 * 扩展了基础边界信息,使用左下角作为原点
 */
export interface IFaceBoundLeftBottom extends IFaceBound {
  /** 底部边界坐标(替代top) */
  bottom: number;
  /** 变换矩阵 */
  matrix?: Matrix3;
}

/**
 * 序列化的面边界数据
 * 用于持久化存储
 */
export interface ISerializedFaceBound {
  left: number;
  top: number;
  width: number;
  height: number;
  /** 序列化的变换矩阵数据 */
  tf?: any;
}

/**
 * 面组序列化数据接口
 * 用于保存和加载面组数据
 */
export interface IFaceGroupData {
  /** 面组ID,多个面ID用分号分隔 */
  faceGroupId: string;
  /** 面边界映射表,键为面ID */
  faceGroupBoundMap: Record<string, ISerializedFaceBound>;
  /** 连接模式 */
  cm?: FaceGroupConnectModeEnum;
}

/**
 * 矩阵3x3类型(从依赖模块导入)
 * 用于2D变换操作
 */
export declare class Matrix3 {
  /** 从数组创建矩阵 */
  fromArray(data: number[]): Matrix3;
  /** 转换为数组 */
  toArray(): number[];
  /** 前乘另一个矩阵 */
  preMultiply(matrix: Matrix3): Matrix3;
  /** 从数据加载矩阵 */
  load(data: any): Matrix3;
  /** 序列化矩阵 */
  dump(): any;
  /** 创建平移矩阵 */
  static makeTranslate(point: { x: number; y: number }): Matrix3;
}

/**
 * 2D向量类型(从依赖模块导入)
 */
export declare class Vector2 {
  x: number;
  y: number;
  constructor(x: number, y: number);
  /** 应用变换矩阵 */
  transformed(matrix: Matrix3): Vector2;
}

/**
 * 2D包围盒类型(从依赖模块导入)
 */
export declare class Box2 {
  min: Vector2;
  max: Vector2;
  constructor(points?: Array<{ x: number; y: number }>);
  /** 合并另一个包围盒 */
  union(box: Box2): void;
}

/**
 * 面组类
 * 管理一组面的分组、边界信息和变换关系
 * 
 * @example
 *