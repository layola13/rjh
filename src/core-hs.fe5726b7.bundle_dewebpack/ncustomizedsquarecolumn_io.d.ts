/**
 * 自定义方柱模块
 * 提供方形柱体的创建、序列化和几何计算功能
 */

import { Line2d } from './geometry';
import { NCustomizedStructure, NCustomizedStructre_IO } from './customized-structure';
import { Entity } from './entity';

/**
 * 曲线用户数据接口
 * 用于标识轮廓曲线的位置和索引
 */
interface CurveUserData {
  /** 曲线标识符：'left' | 'right' | 'front' | 'back' */
  curveid: string;
  /** 曲线在轮廓中的索引 */
  index: number;
}

/**
 * 2D变换矩阵接口
 */
interface Transform2D {
  // 根据实际geometry模块定义补充
}

/**
 * 自定义方柱序列化IO类
 * 负责方柱对象的序列化和反序列化操作
 */
export class NCustomizedSquareColumn_IO extends NCustomizedStructre_IO {
  /**
   * 序列化方柱对象
   * @param entity - 要序列化的实体对象
   * @param callback - 序列化后的回调函数
   * @param includeChildren - 是否包含子对象，默认true
   * @param options - 序列化选项
   * @returns 序列化后的数据对象
   */
  dump(
    entity: NCustomizedSquareColumn,
    callback?: (data: unknown, entity: NCustomizedSquareColumn) => void,
    includeChildren: boolean = true,
    options: Record<string, unknown> = {}
  ): unknown {
    const data = super.dump(entity, undefined, includeChildren, options);
    if (callback) {
      callback(data, entity);
    }
    return data;
  }

  /**
   * 反序列化方柱对象
   * @param data - 序列化的数据
   * @param callback - 反序列化后的回调函数
   * @param options - 反序列化选项
   */
  load(
    data: unknown,
    callback?: (entity: NCustomizedSquareColumn) => void,
    options: Record<string, unknown> = {}
  ): void {
    super.load(data, callback, options);
  }

  /**
   * 获取单例实例
   */
  static instance(): NCustomizedSquareColumn_IO;
}

/**
 * 自定义方柱实体类
 * 表示一个具有矩形截面的柱体结构
 */
export class NCustomizedSquareColumn extends NCustomizedStructure {
  /** X方向尺寸（宽度） */
  XSize: number;
  
  /** Y方向尺寸（深度） */
  YSize: number;
  
  /** Z方向长度 */
  ZLength: number;
  
  /** Z方向缩放比例 */
  ZScale: number;

  /**
   * 构造函数
   * @param id - 实体唯一标识符，默认为空字符串
   */
  constructor(id?: string);

  /**
   * 通过元数据初始化方柱
   * @param metadata - 元数据对象
   */
  initByMeta(metadata: unknown): void;

  /**
   * 获取轮廓路径（第一个轮廓的所有曲线）
   * @returns 轮廓曲线数组
   */
  get path(): Line2d[];

  /**
   * 获取3D高度（考虑缩放后的实际高度）
   */
  get height3d(): number;

  /**
   * 设置3D高度（自动计算ZLength）
   */
  set height3d(value: number);

  /**
   * 获取中心曲线（X轴方向的中心线，已应用2D变换）
   * @returns 变换后的中心线
   */
  get curve(): Line2d;

  /**
   * 计算方柱的轮廓
   * @param applyTransform - 是否应用2D变换，默认true
   * @returns 轮廓数组，每个轮廓包含四条线段（右、前、左、后）
   */
  calcProfile(applyTransform?: boolean): Line2d[][];

  /**
   * 获取左侧路径
   * @returns 左侧曲线，如果不存在则返回undefined
   */
  get leftPath(): Line2d | undefined;

  /**
   * 获取右侧路径
   * @returns 右侧曲线，如果不存在则返回undefined
   */
  get rightPath(): Line2d | undefined;

  /**
   * 创建新的自身实例
   * @returns 新的NCustomizedSquareColumn实例
   */
  newSelf(): NCustomizedSquareColumn;

  /**
   * 获取IO序列化器实例
   * @returns IO序列化器
   */
  getIO(): NCustomizedSquareColumn_IO;

  /**
   * 获取2D变换矩阵
   * @returns 2D变换矩阵
   */
  protected get2DTransform(): Transform2D;
}

/**
 * 全局常量声明
 */
declare const HSConstants: {
  ModelClass: {
    NCustomizedSquareColumn: string;
  };
};