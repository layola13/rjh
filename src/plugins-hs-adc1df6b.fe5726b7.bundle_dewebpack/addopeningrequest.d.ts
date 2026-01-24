/**
 * 添加开口请求事务类
 * 用于在墙体或楼板上添加门窗、壁龛等开口内容
 */

import { HSCore } from '../core';
import { HSCatalog } from '../catalog';
import { HSConstants } from '../constants';
import { Vector2 } from '../math/vector2';

/**
 * 三维位置坐标
 */
export interface Position3D {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标（高度） */
  z: number;
}

/**
 * 三维旋转角度
 */
export interface Rotation3D {
  /** X轴旋转角度 */
  x: number;
  /** Y轴旋转角度 */
  y: number;
  /** Z轴旋转角度 */
  z: number;
}

/**
 * 三维缩放比例
 */
export interface Scale3D {
  /** X轴缩放比例 */
  XScale: number;
  /** Y轴缩放比例 */
  YScale: number;
  /** Z轴缩放比例 */
  ZScale: number;
}

/**
 * 添加开口的可选配置参数
 */
export interface AddOpeningOptions {
  /** 旧的开口对象（用于替换场景） */
  oldOpening?: HSCore.Model.Opening | HSCore.Model.ParametricOpening;
  /** 是否自动构建几何体，默认为true */
  autoBuild?: boolean;
}

/**
 * 添加内容的参数
 */
interface AddContentParams {
  /** 要添加的内容对象 */
  content: HSCore.Model.NgContent;
  /** 宿主对象（墙体或楼板） */
  host: HSCore.Model.Wall | HSCore.Model.Slab;
  /** 父级图层 */
  parent: HSCore.Model.Layer;
}

/**
 * 添加开口请求类
 * 继承自状态请求基类，用于在场景中添加开口类内容（门、窗、壁龛等）
 */
export declare class AddOpeningRequest extends HSCore.Transaction.Common.StateRequest {
  /** 开口元数据 */
  private _meta: HSCatalog.Meta;
  
  /** 目标图层 */
  private _layer: HSCore.Model.Layer;
  
  /** 宿主对象（墙体或楼板） */
  private _host: HSCore.Model.Wall | HSCore.Model.Slab;
  
  /** 开口位置 */
  private _position: Position3D;
  
  /** 开口旋转角度 */
  private _rotation: number | Rotation3D;
  
  /** 开口缩放比例 */
  private _scale?: Scale3D;
  
  /** 被替换的旧开口 */
  private _oldOpening?: HSCore.Model.Opening | HSCore.Model.ParametricOpening;
  
  /** 是否自动构建几何体 */
  private _autoBuild: boolean;
  
  /** 执行结果 */
  result?: HSCore.Model.NgContent;

  /**
   * 构造函数
   * @param meta - 开口元数据
   * @param position - 开口位置坐标，默认为原点
   * @param rotation - 开口旋转角度，支持单个数值或三轴旋转对象
   * @param scale - 开口缩放比例
   * @param host - 宿主对象（墙体或楼板）
   * @param layer - 目标图层，如果为空则使用当前活动图层
   * @param options - 可选配置参数
   */
  constructor(
    meta: HSCatalog.Meta,
    position?: Position3D,
    rotation?: number | Rotation3D,
    scale?: Scale3D,
    host?: HSCore.Model.Wall | HSCore.Model.Slab,
    layer?: HSCore.Model.Layer,
    options?: AddOpeningOptions
  );

  /**
   * 提交事务，执行添加开口操作
   * @returns 创建的开口对象
   */
  onCommit(): HSCore.Model.NgContent | undefined;

  /**
   * 判断字段是否可以参与事务
   * @returns 始终返回true
   */
  canTransactField(): boolean;

  /**
   * 根据元数据获取内容类的构造函数
   * @param meta - 内容元数据
   * @returns 对应的内容类构造函数
   * @private
   */
  private _getContentClass(meta: HSCatalog.Meta): typeof HSCore.Model.NgContent | undefined;
}