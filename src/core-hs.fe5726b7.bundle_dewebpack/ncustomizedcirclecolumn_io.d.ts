/**
 * 自定义圆柱体结构模块
 * @module NCustomizedCircleColumn_IO
 * @description 提供圆柱体结构的序列化/反序列化及几何计算功能
 */

import { Line2d, Coordinate3, Vector3, Vector2, Arc2d, Polygon, Loop } from './geometry';
import { alg } from './algorithm';
import { NCustomizedStructure, NCustomizedStructre_IO } from './base-structure';
import { Entity } from './entity';

/**
 * 2D变换矩阵接口
 */
interface Transform2D {
  // 变换矩阵相关方法
}

/**
 * 3D边界表示(B-Rep)实体接口
 */
interface BrepBody {
  /** 底面 */
  bottomFace: Face;
  /** 顶面 */
  topFace: Face;
  /** 侧面数组 */
  sideFaces: Face[][];
}

/**
 * 面对象接口
 */
interface Face {
  /** 面的标识标签 */
  tag?: string;
  /** 表面几何对象 */
  surfaceObj: {
    surface: Surface;
  };
  /** 面的原始路径 */
  rawPath: {
    /** 外轮廓 */
    outer: Curve3d[];
  };
}

/**
 * 曲面接口
 */
interface Surface {
  /** 判断是否为平面 */
  isPlane(): boolean;
}

/**
 * 三维曲线接口
 */
interface Curve3d {
  /** 获取起点 */
  getStartPt(): Vector3;
  /** 获取终点 */
  getEndPt(): Vector3;
  /** 获取曲线长度 */
  getLength(): number;
}

/**
 * 用户数据接口
 */
interface CurveUserData {
  /** 曲线标识 */
  curveid: string;
  /** 曲线索引 */
  index: number;
}

/**
 * 轮廓路径类型定义
 * @description 每个元素为一个闭合轮廓，包含多条2D曲线
 */
type ProfilePath = Arc2d[][];

/**
 * 自定义圆柱体IO处理器
 * @description 负责圆柱体结构的序列化和反序列化操作
 * @extends NCustomizedStructre_IO
 */
export declare class NCustomizedCircleColumn_IO extends NCustomizedStructre_IO {
  /**
   * 获取单例实例
   * @returns IO处理器实例
   */
  static instance(): NCustomizedCircleColumn_IO;

  /**
   * 序列化圆柱体对象为JSON格式
   * @param entity - 要序列化的圆柱体实体
   * @param transformer - 可选的转换回调函数
   * @param recursive - 是否递归序列化子对象，默认为true
   * @param context - 序列化上下文对象
   * @returns 序列化后的JSON对象
   */
  dump(
    entity: NCustomizedCircleColumn,
    transformer?: (json: Record<string, unknown>, entity: NCustomizedCircleColumn) => void,
    recursive?: boolean,
    context?: Record<string, unknown>
  ): Record<string, unknown>;

  /**
   * 从JSON数据反序列化为圆柱体对象
   * @param entity - 目标圆柱体实体
   * @param json - JSON数据源
   * @param context - 反序列化上下文对象
   */
  load(
    entity: NCustomizedCircleColumn,
    json: Record<string, unknown>,
    context?: Record<string, unknown>
  ): void;
}

/**
 * 自定义圆柱体结构类
 * @description 表示一个可自定义参数的圆柱体3D结构
 * @extends NCustomizedStructure
 */
export declare class NCustomizedCircleColumn extends NCustomizedStructure {
  /**
   * X方向长度(直径基准值)
   */
  XLength: number;

  /**
   * X方向缩放系数
   */
  XScale: number;

  /**
   * Z方向长度(高度基准值)
   */
  ZLength: number;

  /**
   * Z方向缩放系数
   */
  ZScale: number;

  /**
   * Z方向总尺寸(实际高度)
   */
  ZSize: number;

  /**
   * 构造函数
   * @param id - 实体唯一标识符，默认为空字符串
   */
  constructor(id?: string);

  /**
   * 通过元数据初始化圆柱体
   * @param metadata - 元数据对象
   */
  initByMeta(metadata: Record<string, unknown>): void;

  /**
   * 获取2D变换矩阵
   * @returns 2D变换矩阵
   */
  get2DTransform(): Transform2D;

  /**
   * 获取圆柱体底面轮廓路径
   * @description 返回变换后的2D路径点集
   * @returns 路径点数组，如果计算失败返回空数组
   */
  get path(): Arc2d[];

  /**
   * 获取圆柱体3D高度
   * @description 计算值 = ZLength × ZScale
   * @returns 实际3D高度
   */
  get height3d(): number;

  /**
   * 设置圆柱体3D高度
   * @description 反向计算 ZLength = height / ZScale
   * @param value - 目标3D高度
   */
  set height3d(value: number);

  /**
   * 获取圆柱体半径
   * @description 计算值 = XLength × XScale
   * @returns 圆柱体半径
   */
  get radius(): number;

  /**
   * 获取圆柱体底面中心线
   * @description 返回变换后的2D直线，表示底面直径
   * @returns 2D直线对象
   */
  get curve(): Line2d;

  /**
   * 生成圆柱体的边界表示(B-Rep)几何体
   * @param forceRecalculate - 是否强制重新计算，默认false（使用缓存）
   * @param applyTransform - 是否应用变换矩阵，默认false
   * @returns B-Rep实体对象，如果尺寸无效返回undefined
   * @description 
   * - 使用拉伸算法从底面轮廓生成3D实体
   * - 标记面类型：bottom(底面)、top(顶面)、circle(侧面)
   * - 当ZSize < 1e-6时视为无效尺寸
   */
  generateBrep(forceRecalculate?: boolean, applyTransform?: boolean): BrepBody | undefined;

  /**
   * 计算圆柱体底面轮廓
   * @param applyTransform - 是否应用2D变换，默认true
   * @returns 轮廓路径数组，包含一个由圆弧构成的闭合轮廓
   * @description 
   * - 生成完整圆弧(0到2π)作为底面轮廓
   * - 圆弧附带用户数据：curveid="circle", index=0
   */
  calcProfile(applyTransform?: boolean): ProfilePath | undefined;

  /**
   * 获取指定面的离散化点数
   * @param face - 要离散化的面对象
   * @returns 离散点数量(20-100之间)
   * @description 
   * - 平面固定返回20
   * - 曲面根据边缘长度动态计算：长度/0.012，上限100
   */
  getFaceDiscreteCount(face: Face): number;

  /**
   * 创建新的圆柱体实例
   * @returns 新的空圆柱体对象
   */
  newSelf(): NCustomizedCircleColumn;

  /**
   * 获取对应的IO处理器
   * @returns IO处理器单例
   */
  getIO(): NCustomizedCircleColumn_IO;
}

/**
 * 模型类常量声明(全局)
 */
declare const HSConstants: {
  ModelClass: {
    /** 自定义圆柱体类标识 */
    NCustomizedCircleColumn: string;
  };
};

/**
 * 实体注册声明
 * @description 在模块加载时自动注册圆柱体类到实体系统
 */
Entity.registerClass(HSConstants.ModelClass.NCustomizedCircleColumn, NCustomizedCircleColumn);