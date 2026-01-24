/**
 * 面组材质分割模块
 * 处理楼层结构面的材质混贴分组操作
 */

import type { HSCore } from './hscore';
import type { Face } from './hscore/model/face';
import type { Material } from './hscore/model/material';
import type { MixPaint } from './hscore/model/mixpaint';
import type { Vector2, Matrix3 } from './math';
import type { TransactionManager } from './transaction-manager';
import type { TransactionRequest } from './transaction-request';

/**
 * 混贴配置选项
 */
interface MixPaintOptions {
  /** 关联的面组 */
  faceGroup?: FaceGroup;
  /** 关联的面实体 */
  faceEntity?: Face;
  /** 混铺配置 */
  mixPave?: MixPaveConfig;
}

/**
 * 混铺配置
 */
interface MixPaveConfig {
  /** 边界框 */
  BBox?: BoundingBox;
}

/**
 * 边界框定义
 */
interface BoundingBox {
  /** 最小坐标点 */
  min: Vector2;
  /** 最大坐标点 */
  max: Vector2;
}

/**
 * 背景多边形更新选项
 */
interface BackgroundPolygonOptions {
  /** 基准点坐标 */
  basePoint: Vector2;
}

/**
 * 面组接口
 */
interface FaceGroup {
  /** 清空面组 */
  clear(): void;
}

/**
 * 曲线路径类型
 */
type CurvePath = unknown;

/**
 * 请求类型枚举
 */
declare enum RequestType {
  /** 分割面组混贴材质 */
  SplitFaceGroupMixPaint = 'SplitFaceGroupMixPaint'
}

/**
 * 处理楼层面材质分组
 * 
 * @description
 * 遍历楼层的所有结构面（包括天花板），对每个面组应用材质混贴变换。
 * 支持面组变换矩阵处理，自动更新背景多边形，并通过事务管理器提交变更。
 * 
 * @param floor - 要处理的楼层对象
 * 
 * @example
 *