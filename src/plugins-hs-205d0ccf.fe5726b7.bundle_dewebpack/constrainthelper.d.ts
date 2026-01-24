/**
 * 约束辅助工具类
 * 用于处理绘图或布局中的约束关系（如吸附、对齐等）
 */
export declare class ConstraintHelper {
  /**
   * 单例实例
   * @private
   */
  private static _instance?: ConstraintHelper;

  /**
   * 获取 ConstraintHelper 的单例实例
   * @returns ConstraintHelper 实例
   */
  static getInstance(): ConstraintHelper;

  /**
   * 构造函数（私有，用于单例模式）
   */
  private constructor();

  /**
   * 获取与给定约束相关的约束
   * 从约束列表中筛选出与目标约束兼容且唯一的约束
   * 
   * @param constraint - 目标约束对象
   * @param constraintList - 待筛选的约束列表
   * @returns 相关的约束对象，如果没有找到则返回 undefined
   */
  getRelatedConstraint(
    constraint: SnapResult,
    constraintList: Iterable<SnapResult>
  ): SnapResult | undefined;

  /**
   * 执行约束合并
   * 将两个约束对象的属性合并，优先使用第一个约束的非零值
   * 
   * @param primaryConstraint - 主要约束对象
   * @param secondaryConstraint - 次要约束对象（可选）
   * @returns 合并后的约束 JSON 对象
   */
  execute(
    primaryConstraint: ConstraintData | null | undefined,
    secondaryConstraint?: ConstraintData | null
  ): ConstraintJSON | undefined;

  /**
   * 检查两个约束是否唯一（不冲突）
   * 判断两个约束的 dx、dy、drotation 是否兼容
   * 
   * @param constraint1 - 第一个约束对象
   * @param constraint2 - 第二个约束对象
   * @returns 如果约束唯一（不冲突）返回 true，否则返回 false
   * @private
   */
  private _isUnique(
    constraint1: ConstraintJSON,
    constraint2: ConstraintJSON
  ): boolean;
}

/**
 * 吸附结果类型枚举
 */
export declare enum SnapResultType {
  /** 共线约束 */
  Colline = "Colline",
  // 其他类型根据实际情况添加
}

/**
 * 吸附结果接口
 */
export interface SnapResult {
  /** 吸附类型 */
  type: SnapResultType;
  
  /** 客户端数据 */
  client: {
    /** 几何对象 */
    geo: GeometryObject;
  };
  
  /** X 轴偏移量 */
  dx?: number;
  
  /** Y 轴偏移量 */
  dy?: number;
  
  /** 旋转角度变化 */
  drotation?: number;
  
  /** 旋转中心点 */
  center?: Point;
}

/**
 * 几何对象接口
 */
export interface GeometryObject {
  /**
   * 判断是否与另一个几何对象平行
   * @param other - 另一个几何对象
   * @returns 是否平行
   */
  isParallelTo(other: GeometryObject): boolean;
  
  /**
   * 获取方向向量
   * @returns 方向向量
   */
  getDirection(): Vector;
}

/**
 * 向量接口
 */
export interface Vector {
  /**
   * 计算与另一个向量的叉积
   * @param other - 另一个向量
   * @returns 叉积结果
   */
  cross(other: Vector): number;
}

/**
 * 点坐标接口
 */
export interface Point {
  /** X 坐标 */
  x: number;
  
  /** Y 坐标 */
  y: number;
}

/**
 * 约束数据接口
 */
export interface ConstraintData {
  /**
   * 转换为 JSON 对象
   * @returns 约束的 JSON 表示
   */
  getJSON(): ConstraintJSON;
}

/**
 * 约束 JSON 对象接口
 */
export interface ConstraintJSON {
  /** X 轴偏移量 */
  dx?: number;
  
  /** Y 轴偏移量 */
  dy?: number;
  
  /** 旋转角度变化 */
  drotation?: number;
  
  /** 旋转中心点 */
  center?: Point;
}

/**
 * 容差常量
 */
export declare namespace Tolerance {
  /** 边长误差容差 */
  export const EDGE_LENGTH_EPS: number;
}