/**
 * 内容筛选与几何计算工具模块
 * 提供用于筛选目标内容、验证实体、处理几何遮罩和楼层曲线的实用函数
 */

import type * as HSCore from 'HSCore';
import type * as HSCatalog from 'HSCatalog';
import type { Line2d, Loop } from 'Geometry';

// ==================== 类型定义 ====================

/**
 * 曲线分组索引信息
 */
export interface CurveGroupInfo {
  /** 曲线在边界框中的索引 (0-3) */
  index: number;
  /** 分组标识 (x1, y1, x2, y2) */
  group: 'x1' | 'y1' | 'x2' | 'y2';
  /** 边界框边线 */
  line: Line2d;
}

/**
 * SVG路径样式配置
 */
export interface PathStyle {
  /** 填充颜色 */
  fill?: string;
  /** 描边颜色 */
  stroke?: string;
  /** 虚线样式 */
  'stroke-dasharray'?: number | string;
  /** 描边宽度 */
  'stroke-width'?: number;
  /** 描边透明度 (0-1) */
  'stroke-opacity'?: number;
  /** 填充透明度 (0-1) */
  'fill-opacity'?: number;
  /** 整体透明度 (0-1) */
  opacity?: number;
}

/**
 * 几何遮罩数据
 */
export interface GeometryMask {
  /** 几何回路 */
  loop: Loop;
  /** 样式配置 */
  style: PathStyle;
}

/**
 * 主机定位信息
 */
export interface HostInfo {
  /** 主机曲线索引 */
  hostCurveIndex: number;
  /** 位置参数 */
  posParam: {
    /** 起始参数 (0-1) */
    startParam: number;
    /** 结束参数 (0-1) */
    endParam: number;
  };
}

/**
 * 多边形切割信息
 */
export interface PolygonCut {
  /** 来源多边形 */
  fromPolygon: unknown;
  /** 自身多边形 */
  selfPolygon: {
    /** 外部回路 */
    outerLoop: Loop;
  };
  /** 目标多边形 */
  toPolygon: unknown;
  /** 颜色标识 */
  color: string;
}

/**
 * 特征楼层曲线信息
 */
export interface FeatureFloorCurve {
  /** 开口与楼层重叠曲线 */
  openingFloorOverlapCurve: Line2d;
  /** 类型标识 */
  type?: 'mergedIncision' | string;
}

/**
 * 楼层实体
 */
export interface Floor {
  // 实际项目中的楼层类型定义
  [key: string]: unknown;
}

// ==================== 内容筛选函数 ====================

/**
 * 递归获取符合条件的目标内容
 * 支持数组、分组和单个实体的遍历
 * 
 * @param target - 要检查的目标(实体、分组或数组)
 * @param resultArray - 收集符合条件的内容的数组
 * @param roomPolygon - 房间多边形用于范围判断
 */
export function getTargetContent(
  target: HSCore.Model.NgContent | HSCore.Model.Group | Array<HSCore.Model.NgContent | HSCore.Model.Group>,
  resultArray: HSCore.Model.NgContent[],
  roomPolygon: Loop
): void;

/**
 * 判断内容是否为目标内容
 * 检查实体可见性、类型白名单和房间归属
 * 
 * @param content - 要检查的内容实体
 * @param roomPolygon - 房间多边形
 * @returns 是否为有效的目标内容
 */
export function isTargetContent(
  content: HSCore.Model.NgContent,
  roomPolygon: Loop
): boolean;

/**
 * 验证实体是否有效(未被删除)
 * 
 * @param entity - 要验证的实体
 * @returns 实体是否有效
 */
export function isItemValid(
  entity: HSCore.Model.NgContent
): boolean;

/**
 * 检查内容是否在类型白名单中且位于指定房间内
 * 
 * @param content - 要检查的内容
 * @param roomPolygon - 房间多边形
 * @returns 是否通过白名单和房间检查
 */
export function isInContentTypeWhiteList(
  content: HSCore.Model.NgContent,
  roomPolygon: Loop
): boolean;

/**
 * 判断内容是否为参数化内容
 * 包括自定义结构、装配体、挤出/成型模型等
 * 
 * @param content - 要检查的内容
 * @returns 是否为参数化内容
 */
export function isParametricContent(
  content: HSCore.Model.NgContent
): boolean;

// ==================== 几何计算函数 ====================

/**
 * 在曲线集合中查找与给定线段最匹配的边界线组
 * 根据方向角度差判断最佳匹配
 * 
 * @param line - 目标线段(Line2d或具有起止点的曲线)
 * @param curves - 参考曲线数组
 * @returns 最匹配的曲线分组信息,未找到返回undefined
 */
export function findLineGroupInCurves(
  line: Line2d | { getStartPt(): unknown; getEndPt(): unknown },
  curves: unknown[]
): CurveGroupInfo | undefined;

/**
 * 根据主机信息和曲线集合生成楼层曲线
 * 按主机索引找到对应边界线,根据位置参数裁剪范围
 * 
 * @param hostInfo - 主机定位信息
 * @param curves - 边界曲线数组
 * @returns 裁剪后的楼层曲线
 */
export function hostInfoToBoxCurve(
  hostInfo: HostInfo,
  curves: unknown[]
): Line2d;

// ==================== 遮罩生成函数 ====================

/**
 * 生成骨架多边形遮罩数组
 * 用于可视化调试,使用红色虚线描边
 * 
 * @param polygons - 多边形回路数组
 * @returns 几何遮罩数组
 */
export function getSkeletonPolygonMasks(
  polygons: Loop[]
): GeometryMask[];

/**
 * 生成特征楼层曲线遮罩
 * 用青色线条标识,合并切口使用虚线
 * 
 * @param features - 特征楼层曲线数组
 * @returns 几何遮罩数组
 */
export function getFeatureFloorCurveMasks(
  features: FeatureFloorCurve[]
): GeometryMask[];

/**
 * 生成合并后的特征楼层曲线遮罩
 * 使用半透明青色虚线显示
 * 
 * @param features - 合并的特征楼层曲线数组
 * @returns 几何遮罩数组
 */
export function getMergedFeatureFloorCurveMasks(
  features: FeatureFloorCurve[]
): GeometryMask[];

/**
 * 生成门楼层曲线遮罩
 * 使用蓝色实线标识
 * 
 * @param doorHosts - 门主机信息数组
 * @param curves - 边界曲线数组
 * @returns 几何遮罩数组
 */
export function getDoorFloorCurveMasks(
  doorHosts: HostInfo[],
  curves: unknown[]
): GeometryMask[];

/**
 * 生成窗楼层曲线遮罩
 * 使用洋红色实线标识
 * 
 * @param windowHosts - 窗主机信息数组
 * @param curves - 边界曲线数组
 * @returns 几何遮罩数组
 */
export function getWindowFloorCurveMasks(
  windowHosts: HostInfo[],
  curves: unknown[]
): GeometryMask[];

/**
 * 生成多边形切割遮罩
 * 用于可视化多边形之间的切割关系
 * 
 * @param polygonCuts - 多边形切割信息数组
 * @returns 几何遮罩数组
 */
export function getPolygonCutsMasks(
  polygonCuts: PolygonCut[]
): GeometryMask[];

// ==================== 应用交互函数 ====================

/**
 * 向HSApp插件系统派发更新楼层遮罩SVG的事件
 * 通过约束布局插件的信号系统传递楼层路径数据
 * 
 * @param floor - 楼层实体
 * @param paths - SVG路径数据数组
 */
export function dispatchHSAppUpdateFloorMaskSVGs(
  floor: Floor,
  paths: GeometryMask[]
): void;